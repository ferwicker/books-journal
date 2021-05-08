import React, { useEffect, useState } from "react";
import API from "../../utils/API";

function SignUpForm() {
    const emailRef = React.createRef();
    const passwordRef = React.createRef();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    console.log(email + password);
    //add api routes call here?
    function HandleSubmit(e){
        e.preventDefault();
        
        
        // fetch call to /api/signup
        API.userSignup(email, password)
            .then(res => 
                console.log('res from signup handler'+res)
            )
            .catch(err => console.log(err));

    }

  return (
    <div>
        <form onSubmit={HandleSubmit}>
            <h3>Sign up</h3>
            <label>Email:</label>
            <input type="text" id="email" name="email" defaultValue="" ref={emailRef}></input>
            <br></br><br></br>
            <label>Password:</label>
            <input type="text" id="password" name="password" defautlValue="" ref={passwordRef}></input>
            <button type='submit' id='submit' onClick={HandleSubmit}>Submit</button>
        </form>
    </div>
  )
}

export default SignUpForm;