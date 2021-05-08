import axios from "axios";

export default {
  // User sign up
  userSignup: function() {
    return axios.post("/api/signup");
  }
};
