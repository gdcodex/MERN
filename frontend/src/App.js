import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Users from "./user/pages/users";
import Newplace from "./places/pages/newplace";
import Mainnavigation from './shared/components/Navigation/mainnavigation'

function App() {
  return (
    <Router>
    <Mainnavigation/>
    <main>
      <Switch>
        <Route path="/" exact component={Users} />
        <Route path="/places/new" exact component={Newplace} />
        <Redirect to="/" />
      </Switch>
      </main>
    </Router>
  );
}

export default App;
