import React, {useCallback, useEffect, useState} from "react";
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
import Auth from "./user/pages/authh";
import { AuthContext } from "./shared/context/auth-context";

function App() {
  const [isLoggedIn, setisLoggedIn] = useState(false);

  const login =useCallback(()=>{
    setisLoggedIn(true)
  },[])

  const logout =useCallback(()=>{
    setisLoggedIn(false)
  },[])
//so that login state is not lost on refresh
useEffect(()=>{
    const reslocal =localStorage.getItem("mysong");
    if(reslocal){
        setisLoggedIn(JSON.parse(reslocal));
    }
},[]);
useEffect(()=>{
    localStorage.setItem("mysong", JSON.stringify(isLoggedIn));
});

  let routes;
  if(isLoggedIn){
     routes=(
      <Switch>
          <Route path="/" exact component={Users} />
          <Route path="/:userId/places" exact component={Userplaces} />
          <Route path="/places/new" exact component={Newplace} />
            <Route path="/places/:placeId" exact component={Updateplace} />
            <Redirect to="/"  />
      </Switch>
    )
  }
  else{
    routes=(
      <Switch>
        <Route path="/" exact component={Users} />
        <Route path="/:userId/places" component={Userplaces} />
        <Route path="/auth" exact component={Auth} />
        <Redirect to="/auth" />
      </Switch>
    )
  }

  return (
    <AuthContext.Provider value={{isLoggedIn,login,logout}}>
      <Router>
        <Mainnavigation />
        <main>
        
          
          {routes}
          
       
        </main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
