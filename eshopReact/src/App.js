
import './App.css';

import React, { } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  
} from "react-router-dom";
import Manage from './components/Manage';
import Home from './components/Home';
import Login from './components/Login';
import Status from './components/Status';
import PrivateRoute from './components/PrivateRoute';
import Cookies from 'js-cookie';


function App() {
  const isAuthenticated = (Cookies.get('token')!='null');



  return (
    <div className="container">
      <Router>
        <Switch>
              <Route path="/home">
               <Home />
              </Route>
              <PrivateRoute path="/manage" isAuthenticated={isAuthenticated}>
                <Manage />
              </PrivateRoute>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/status">
               <Status />
              </Route>
        </Switch>
      </Router>

      {/* {
        popUpShown && <Popup />
      } */}
    </div>
  );
}

export default App;
