import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Button } from '@material-ui/core';

import Home from "./views/Home/Home.js";
import Profile from "./views/Profile/Profile.js";
import Sign from "./views/Sign/Sign.js";
import Admin from "./views/Admin/Admin.js";
import Registration from "./views/Registration/Registration.js";
import Catalog from "./views/Catalog/Catalog.js";


if(localStorage.isAuthorised != "NOT_LOGGED_IN" && localStorage.isAuthorised !="LOGGED_IN"){
  localStorage.isAuthorised = "NOT_LOGGED_IN";
  localStorage.login = "";
  localStorage.password = "";
  localStorage.logLink = "/log_in";
  localStorage.logMsg = "Log in";
}
if(localStorage.login === undefined && localStorage.login ===""){
  localStorage.isAuthorised = "NOT_LOGGED_IN";
  localStorage.login = "";
  localStorage.password = "";
  localStorage.logLink = "/log_in";
  localStorage.logMsg = "Log in";
}

function LogOut(){
  localStorage.isAuthorised = "NOT_LOGGED_IN";
  localStorage.login = "";
  localStorage.password = "";
  localStorage.logLink = "/log_in";
  localStorage.logMsg = "Log in";
  window.location.href = "/"
}

export default class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
      logInStatus: localStorage.isAuthorised,
      user: localStorage.user,
      logLink: localStorage.logLink,
      logMsg: localStorage.logMsg
    };
  } 

  logOut = () => {
    this.setState({
      logInStatus: "NOT_LOGGED_IN",
      user: {},
      logLink: "/sdd",
      logMsg: "Log out"
    })
  }

  UpdateLogStatus = () =>{
    if(localStorage.isAuthorised === "LOGGED_IN"){
      this.setState({
        logInStatus: "LOGGED_IN",
        user: {login: localStorage.login},
        logLink: "log_out",
        logMsg: "Log out"
      })
    }
  }
  render(){
    
    return (
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Button color="primary" href="/">Main page</Button>
              </li>
              <li>
                <Button color="primary" href="/catalog">Catalog</Button>
              </li>
              <li>
                <Button color="primary" href={this.state.logLink}>{this.state.logMsg}" "{this.state.logInStatus}" "{this.state.logLink}</Button>
              </li>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <Link to="/admin">Admin panel</Link>
              </li>
            </ul>
          </nav>

          <Switch>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/log_in">
              <Sign />
            </Route>
            <Route path="/registration">
              <Registration />
            </Route>
            <Route path="/catalog">
              <Catalog />
            </Route>
            <Route path="/admin">
              <Admin />
            </Route>
            <Route path="/log_out">
              <LogOut />
            </Route>
            <Route path="/">
              <Home />
            </Route> 
          </Switch>
        </div>
      </Router>
    );
  }
}