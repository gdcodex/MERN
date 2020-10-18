import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Users from "./user/pages/users";
import Newplace from "./places/pages/newplace";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Users} />
        <Route path="/places/new" exact component={Newplace} />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;
