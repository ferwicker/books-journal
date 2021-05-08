import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";
//import logo from "./logo.svg";

//components
import Wrapper from './components/Wrapper';

function App(){
  return (
      <BrowserRouter>
          <div>
              <Wrapper>
                <div>
                  <h1>Book journal</h1>
                  <SignUp />
                  <LogIn />
                </div>
              </Wrapper>
          </div>
      </BrowserRouter>
  )
}

export default App;
// nav and router switch inside wrapper, footer outside