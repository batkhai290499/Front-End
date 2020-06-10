import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import login from '../Login/login.js';
import RouterReact from '../router/router.js';


require('dotenv').config();

function App() {
  return (
      <Router>
        <Switch>
          <Route exact path="/login" component={login} />
          <RouterReact />
        </Switch>
      </Router>
  );
}

export default App;
