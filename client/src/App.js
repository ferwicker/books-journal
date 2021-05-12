import React, { useState, useEffect, useContext } from "react";
import { userContext } from "./utils/Context.js";
import { BrowserRouter, Route, Switch } from "react-router-dom";

//import pages
import About from './pages/About';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Discover from './pages/Discover';

//import logo from "./logo.svg";

//components
import Nav from './components/Nav'
import Wrapper from './components/Wrapper';

function App(){

  const [currentUser, setCurrentUser] = useState("");

  return (
      <BrowserRouter>
          <userContext.Provider value={[currentUser, setCurrentUser]}>
              <Wrapper>
                <Nav />
                <Switch>
                  <Route exact path={['/', '/about']}>
                    <About />
                  </Route>
                  <Route exact path='/signup'>
                    <SignUp />
                  </Route>
                  <Route exact path='/login'>
                    <Login />
                  </Route>
                  <Route exact path='/discover'>
                    <Discover />
                  </Route>
                </Switch>
              </Wrapper>
              {/* Footer component here */}
          </userContext.Provider>
      </BrowserRouter>
  )
}

export default App;
// nav and router switch inside wrapper, footer outside
