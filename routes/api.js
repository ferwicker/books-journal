//const router = require("express").Router();
//const db = require("../models");
const passport = require("../config/passport");

const bcrypt = require('bcrypt');
const User = require('../models/User');
const Shelf = require('../models/Shelf')

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
      //console.log('received')
      User.create({
        email: req.body.email,
        username: req.body.username,
        password: await bcrypt.hash(req.body.password, 10)
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
    console.log('test')
    res.json({username:req.user.username, id:req.user._id});
  });

};