import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Button } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';

import Home from "./views/Home/Home.js";
import Profile from "./views/Profile/Profile.js";
import Sign from "./views/Sign/Sign.js";
import Admin from "./views/Admin/Admin.js";
import Registration from "./views/Registration/Registration.js";
import Catalog from "./views/Catalog/Catalog.js";
import Games from "./views/Games/Games.js";


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
          <AppBar position="relative">
            <Toolbar>
              <Link to="/" style={{color: 'white', textDecoration: 'none'}}>
                <Button color="inherit">Main page</Button>
              </Link>    
              <Link to="/catalog" style={{color: 'white', textDecoration: 'none'}}>
                <Button color="inherit">Catalog</Button> 
              </Link> 
              <Link to={this.state.logLink} style={{color: 'white', textDecoration: 'none'}}>
                <Button color="inherit">{this.state.logMsg}</Button>
              </Link> 
              <Link to="/profile" style={{color: 'white', textDecoration: 'none'}}>
                <Button color="inherit">Profile</Button>
              </Link> 
              <Link to="/admin" style={{color: 'white', textDecoration: 'none'}}>
                <Button color="inherit">Admin panel</Button>
              </Link>           
              
              {/*<Button color="inherit" href={this.state.logLink}>{this.state.logMsg}" "{this.state.logInStatus}" "{this.state.logLink}</Button> */} 
              
            </Toolbar>
          </AppBar>                     
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
            <Route path="/catalog/game/">
              <Games />
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