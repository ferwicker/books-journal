import axios from "axios";

export default {
  // User sign up
  userSignup: function(userData) {
    return (
    axios.post("/api/signup", userData)
      )
  },

  // User log in
  userLogin: function(userData) {
    return axios.post("/api/login", userData);
  },

  // Create default shelves
  createDefaultShelves: function(userId) {
    return axios.post("/api/createdefaultshelves", userId);
  },

  // Find one by email
  findEmail: function(userData){
    return axios.get("/api/findemail", userData);
  },

  // Check if user is logged in
  userLoggedIn: function() {
    return axios.get("/api/logged-in")
  }

};
