const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const session = require("express-session");
const passport = require("./config/passport");

const PORT = process.env.PORT || 3001;
const db = require("./models");
const routes = require("./routes");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// We need to use sessions to keep track of our user's login status
app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
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
app.use(routes);

// Send every request to the React app
// Define any API routes before this runs
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, function() {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
