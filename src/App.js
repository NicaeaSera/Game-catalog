import React from "react";
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

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Button color="primary">Hello World</Button>
              <Link to="/">Home</Link>  
            </li>
            <li>
              <Link to="/catalog">Catalog</Link>
            </li>
            <li>
              <Link to="/sign">Sign in/ Sign up</Link>
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
            <Route path="/sign">
              <Sign />
            </Route>
            <Route path="/admin">
              <Admin />
            </Route>
            <Route path="/">
              <Home />
            </Route> 
        </Switch>
      </div>
    </Router>
  );
}
