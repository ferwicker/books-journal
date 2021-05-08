import React from "react";

function LogIn() {

    //add api routes here?

  return (
    <div>
        <form>
            <h3>Log In</h3>
            <label for="email">Email:</label>
            <input type="text" id="email" name="email" defaultValue=""></input>
            <br></br><br></br>
            <label for="password">Password:</label>
            <input type="text" id="password" name="password" defaultValue=""></input>
        </form>
    </div>
  )
}

export default LogIn;