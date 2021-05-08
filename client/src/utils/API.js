import axios from "axios";

export default {
  // User sign up
  userSignup: function(userData) {
    return axios.post("/api/signup", userData);
  }
};
