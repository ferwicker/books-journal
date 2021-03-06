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

  userLogout: function() {
    return axios.get("/logout")
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
    return axios.get("/api/logged-in");
  },

  userShelves: function(userId) {
    return axios.post("/api/user/shelves", userId);
  },

  saveBook: function(data) {
    return axios.post("/api/shelf/addbook", data);
  },

  saveShelfToBook: function(data) {
    return axios.post("/api/book/addshelf", data);
  },

  createShelf: function(data) {
    return axios.post("/api/addshelf", data);
  },

  getShelfInfo: function(id) {
    return axios.post("/api/shelf/getbooks", id);
  },

  removeBook: function(data) {
    return axios.post("/api/shelf/removebook", data);
  }
};
