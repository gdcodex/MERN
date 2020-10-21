import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Users from "./user/pages/users";
import Newplace from "./places/pages/newplace";
import Userplaces from './places/pages/userplaces'
import Mainnavigation from './shared/components/Navigation/mainnavigation'
import Updateplace from "./places/pages/updateplace";

function App() {
  return (
    <Router>
    <Mainnavigation/>
    <main>
      <Switch>
        <Route path="/" exact component={Users} />
        <Route path='/:userId/places' component={Userplaces}/>
        <Route path="/places/new" exact component={Newplace} />
        <Route path="/places/:placeId" exact component={Updateplace} />
        <Redirect to="/" />
      </Switch>
      </main>
    </Router>
  );
}

export default App;
