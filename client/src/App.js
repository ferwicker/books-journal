import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
//import logo from "./logo.svg";

//components
import Wrapper from './components/Wrapper';

function App(){
  return (
      <BrowserRouter>
          <div>
              <Wrapper>
                <h1>Book Journal</h1>
              </Wrapper>
          </div>
      </BrowserRouter>
  )
}

export default App;
// nav and router switch inside wrapper, footer outside