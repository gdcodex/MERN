import React, { useEffect, useState } from "react";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import Userslist from "../components/userslist";
import { useHttp } from "../../shared/hooks/http-hook";

function Users() {
 
  const [loadedUsers, setloadedUsers] = useState(false);

  const {isLoading,isError,resetError,sendRequest} = useHttp();

  useEffect(() => {
    sendRequest("http://localhost:5000/api/users").then(data=>{
        setloadedUsers(data.users)
    }).catch(err=>{
        console.log(err)
    })
  }, []);
  return (
    <>
      {isLoading && (
        <div className="center">
          <LoadingSpinner asOverlay />
        </div>
      )}
      {isError && (
        <ErrorModal
          error={isError}
          header="An Error Occurred"
          onClear={resetError}
        />
      )}
      {loadedUsers && <Userslist items={loadedUsers} />}
    </>
  );
}

export default Users;
