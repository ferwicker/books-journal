import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

//import pages
import About from './pages/About';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Discover from './pages/Discover';

//import logo from "./logo.svg";

//components
import Wrapper from './components/Wrapper';

function App(){
  return (
      <BrowserRouter>
          <div>
              <Wrapper>
                {/* Nav component here */}
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
          </div>
      </BrowserRouter>
  )
}

export default App;
// nav and router switch inside wrapper, footer outside
