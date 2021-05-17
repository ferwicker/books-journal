require('dotenv').config();
const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3002;
const app = express();

const session = require("express-session");
const cors = require("cors");
const passport = require("./config/passport");

const MongoStore = require('connect-mongo');
const mongoose = require("mongoose");

app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/public"));
}

// We need to use sessions to keep track of our user's login status
app.use(
  session({ 
    secret: "keyboard cat", 
    resave: true, 
    saveUninitialized: false,
    // Custom store to allow us to store the session in a database so if page is refreshed or backend crashes we can still retrieve the user session. This only works for mongo. For sequelize, you would use this https://www.npmjs.com/package/connect-session-sequelize
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI || "mongodb://localhost/user" })
   })
);
// Initialize middleware, intialize passport
app.use(passport.initialize());
// Initialize middleware to alter the request object and deserialize "user" session ID from the request into a proper user object
app.use(passport.session());


mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/user", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

// routes
//app.use(require("./routes/api.js"));
require("./routes/api.js")(app);

// Send every request to the React app
// Define any API routes before this runs
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/public/index.html"));
});

app.listen(PORT, function() {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
