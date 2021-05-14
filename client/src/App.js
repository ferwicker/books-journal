import React, { useState, useEffect, useContext } from "react";
import { userContext } from "./utils/Context.js";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import API from "./utils/API.js";

//import pages
import About from './pages/About';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Discover from './pages/Discover';

//import logo from "./logo.svg";

//components
import Nav from './components/Nav'
import Footer from './components/Footer'
import Wrapper from './components/Wrapper';

function App(){

  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    API.userLoggedIn().then(response => {
      //the current user will go here
      if(response !== undefined){
        setCurrentUser(response.data);
      }
      
    })
  }, []);

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
              <Footer></Footer>
          </userContext.Provider>
      </BrowserRouter>
  )
}

export default App;
// nav and router switch inside wrapper, footer outside
