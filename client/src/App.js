import React, { useState, useEffect, useContext } from "react";
import { userContext } from "./utils/Context.js";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import API from "./utils/API.js";

//import pages
import About from './pages/About';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Discover from './pages/Discover';
import AddShelf from './pages/AddShelf';
import Shelf from './pages/Shelf';

//import logo from "./logo.svg";

//components
import Nav from './components/Nav'
import Footer from './components/Footer'
import Wrapper from './components/Wrapper';

function App(){

  const [currentUser, setCurrentUser] = useState("");
  const [userShelves, setUserShelves] = useState("");

  useEffect(() => {
    API.userLoggedIn().then(response => {
      //the current user will go here
      console.log(response)
      if(response.data !== 'no user'){
        const reqId = response.data.id //this returns the right object
        const currentuser=response.data;
        API.userShelves({id:reqId}).then((resshelves)=> {
          //console.log('front end shelves: ' + resshelves.data)
          setUserShelves(resshelves.data);
          currentuser.shelves=resshelves.data
        }).then(()=>{
          setCurrentUser(currentuser);
        })
      }  
    })
  }, []);

  function handleLogout(e){
    e.preventDefault();
    API.userLogout().then((res)=>{
      setCurrentUser('');
    });
  }

  return (
      <BrowserRouter>
          <userContext.Provider value={[currentUser, setCurrentUser]}>
              <Wrapper>
                <Nav 
                  logout = {handleLogout}
                  shelves={userShelves || 'no shelves'}/>
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
                  <Route exact path='/addshelf'>
                        <AddShelf />
                    </Route>
                  <Route exact path='/shelves/:id'>
                        <Shelf />
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
