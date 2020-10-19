import React from "react";

import Card from "../../shared/components/UIElements/Card";
import Placeitem from "./placeitem";
import "./placelist.css";

function Placelist(props) {
  if (props.items.length === 0) {
    return (
      <div className="place-list center">
        <Card>
          <h2>No places found. Create one?</h2>
          <button>Share Place</button>
        </Card>
      </div>
    );
  }

  return (
    <ul className="place-liist">
      {props.items.map((place) => (
        <Placeitem
          key={place.id}
          id={place.id}
          image={place.imageUrl}
          title={place.ttitle}
          description={place.description}
          address={place.address}
          creatorId={place.creator}
          coordinates={place.location}
        />
      ))}
    </ul>
  );
}

export default Placelist;
