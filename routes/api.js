//const router = require("express").Router();
//const db = require("../models");
const passport = require("../config/passport");

const bcrypt = require('bcrypt');
const User = require('../models/User');
const Shelf = require('../models/Shelf');
const Book = require('../models/Book');

module.exports = function(app) {
    // Using the passport.authenticate middleware with our local strategy.
    // If the user has valid login credentials, send them to the members page.
    // Otherwise the user will be sent an error
    app.post("/api/login", passport.authenticate("local"), (req, res) => {
      // Sending back a password, even a hashed password, isn't a good idea
      // would like to send back the username as well
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to bcrypt
  // If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", async (req, res) => {
      const password = await bcrypt.hash(req.body.password, 10)
      //with checks
      User.find({email: req.body.email}).then((user) => {
        if(user.length>0){
          res.send('email already in use');
        } else {
          User.find({username: req.body.username}).then((username) => {
            if(username.length>0){
              res.send('username already in use');
            } else {
              console.log('create user')
              User.create({
                email: req.body.email,
                username: req.body.username,
                password: password
              })
                .then((newuser) => {
                  const createduser ={
                    id: newuser._id,
                    email: newuser.email,
                    username: newuser.username,
                  }
                  //send new user to front end
                  res.json(createduser);
                  console.log('signup success');
                })
                  .catch(err => {
                    res.status(401).json(err);
                  });
            }
          })
        }
      });
      
  });

  //route to create default shelves after the user is created
  app.post("/api/createdefaultshelves", (req, res) => {
    const userid=req.body.id
    Shelf.create([
      {
      name: 'Books I own',
      userid: userid,
      books: []
    },
    {
      name: 'Wishlist',
      userid: userid,
      books: []
    },
    {
      name: 'TBR',
      userid: userid,
      books: []
    }
  ])
    .then((shelves) => {
      res.json(shelves);
    })
  })

  //route for seeing all users in database, logs to server console
  app.get('/api/usersinfo', (req, res) => {
    User.find({}).then((res) => {
      console.log(res);
    })
  })

  // route to find one user before signup
  app.get("/api/findemail", (req, res)=> {
    User.find({email: req.body.email}).then((res) => {
      console.log('found ' + res);
    })
  })

  // Route for logging user out - how to manage? where does req.logout come from?
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });

  // We use this endpoint to verify a user was previously logged in, by checking the session object. isAuthenticated() is a property provided by passport.
  app.get("/api/logged-in", (req, res) => {
    //console.log('test')
    if (req.user){
      res.json({username:req.user.username, id:req.user._id});
    } else {
      res.send('no user');
    } 
  });

  //get the logged in user's shelved -- works!
  app.post("/api/user/shelves", (req, res) => {
    const userid=req.body.id
    //console.log('submitted user id: '+ userid)
    Shelf.find({userid:userid}).then((shelves)=>{
      //console.log(shelves);
      res.json(shelves);
    })
  });

  //push a book into a shelf's array
  app.post("/api/shelf/addbook", (req, res) => {
    const shelfid = req.body.shelf;
    const bookid = req.body.book;
    Shelf.find({_id: shelfid, books: bookid}).then((shelf) => {
      if(shelf.length>0){
        res.send('already in shelf')
      } else {
        Shelf.updateOne(
          { _id: shelfid },
          { $push: { books: bookid } }
          ).then((response)=>{
            res.json(response);
          })
      }
    }
    )
  });

  //push a shelf into a book's array
  app.post("/api/book/addshelf", (req, res) => {
    const shelfid = req.body.shelf;
    const bookid = req.body.book;
    const booktitle = req.body.title;
    const bookauthor = req.body.author;
    const bookcover = req.body.thumbnail;
    const snippet = req.body.snippet;
    
    Book.find({googleId:bookid}).then((book)=>{
      if (book.length>0) {
        console.log('book found')
        Book.updateOne(
          { googleId: bookid },
          { $push: { shelves: shelfid } }
          ).then((response)=>{
            console.log('book updated')
            res.json(response);
          })
      } else {
        Book.create({
          title: booktitle,
          author: bookauthor,
          googleId: bookid,
          thumbnail: bookcover,
          snippet: snippet,
          shelves:[shelfid]
        }).then((newbook)=>{
          console.log('book created');
          res.json(newbook);
        }).catch(err => {
          res.status(401).json(err);
        });
      }
    })
  });

  //create a new shelf
  app.post("/api/addshelf", (req,res) => {
    const shelfname = req.body.name;
    const userid = req.body.user;
    Shelf.create({
      name: shelfname,
      userid: userid,
      books: []
    }).then((newshelf)=>{
      res.json(newshelf);
    })
  });

  //retrieve books information in a shelf
  app.post("/api/shelf/getbooks", (req, res) => {
    const shelfid = req.body.id;
    Book.find({ shelves: { $in: [shelfid] } }).then((books) => {
      console.log(books);
      res.json(books);
    })
  });

  //remove book from shelf
  app.post("/api/shelf/removebook", (req, res) => {
    const bookid = req.body.bookid;
    const shelfid = req.body.shelfid;

    Book.updateOne({googleId: bookid}, {$pull: {shelves: shelfid}}).then((modified) => {
      console.log(modified);
      //remove book from shelf
      Shelf.updateOne({_id:shelfid}, {$pull: {books: bookid}}).then((shelf)=>{
        console.log(shelf);
        res.json(shelf);
      })
    })
  })
};