import React, {useCallback, useState} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Users from "./user/pages/users";
import Newplace from "./places/pages/newplace";
import Userplaces from "./places/pages/userplaces";
import Mainnavigation from "./shared/components/Navigation/mainnavigation";
import Updateplace from "./places/pages/updateplace";
import Auth from "./user/pages/auth";
import { AuthContext } from "./shared/context/auth-context";

function App() {
  const [isLoggedIn, setisLoggedIn] = useState(false);

  const login =useCallback(()=>{
    setisLoggedIn(true)
  },[])

  const logout =useCallback(()=>{
    setisLoggedIn(false)
  },[])
  if(isLoggedIn){
    const routes=(
      <>
          <Route path="/" exact component={Users} />
      </>
    )
  }
  else{
    routes=(
      <>
        <Route path="/" exact component={Users} />
        <Route path="/:userId/places" component={Userplaces} />
      </>
    )
  }

  return (
    <AuthContext.Provider value={{isLoggedIn,login,logout}}>
      <Router>
        <Mainnavigation />
        <main>
          <Switch>
          
            <Route path="/auth" exact component={Auth} />
          
            <Route path="/places/new" exact component={Newplace} />
            <Route path="/places/:placeId" exact component={Updateplace} />
            <Redirect to="/" />
          </Switch>
        </main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
