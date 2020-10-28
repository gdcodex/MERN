import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttp } from "../../shared/hooks/http-hook";

import Placelist from "../components/placelist";

function Userplaces() {
  const [loadedPlaces, setloadedPlaces] = useState(null);
  const { isLoading, isError, resetError, sendRequest } = useHttp();

  const userId = useParams().userId;
  useEffect(() => {
    sendRequest(`http://localhost:5000/api/places/users/${userId}`)
      .then((data) => setloadedPlaces(data.places))
      .catch((err) => console.log(err));
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
     {loadedPlaces && <Placelist items={loadedPlaces} />}
    </>
  );
}

export default Userplaces;
