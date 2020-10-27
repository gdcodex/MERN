import React, { useEffect, useState } from "react";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import Userslist from "../components/userslist";

function Users() {
  const [isLoading, setisLoading] = useState(false);
  const [isError, setisError] = useState(false);
  const [loadedUsers, setloadedUsers] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setisLoading(true);
      try {
        const response = await fetch("http://localhost:5000/api/users");
        const responseData = await response.json();

        if (!response.ok) {
          throw new Error("Sorry, something went wrong !!");
        }
        setloadedUsers(responseData.users);
      } catch (err) {
        console.log(err);
        setisError(err.message);
      }
      setisLoading(false);
    };
    fetchData();
  },[]);
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
          onClear={() => setisError(null)}
        />
      )}
      {
        loadedUsers &&
      <Userslist items={loadedUsers} />
      }
    </>
  );
}

export default Users;
