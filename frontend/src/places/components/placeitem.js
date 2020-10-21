import React, { useState } from "react";

import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/formelements/Button";
import Modal from "../../shared/components/UIElements/modal";
import Map from "../../shared/components/UIElements/map";
import "./placeitem.css";

function Placeitem(props) {
  const [showMap, setshowMap] = useState(false);
  const [showDelete, setshowDelete] = useState(false);

  const openMapHandler = () => setshowMap(true);
  const closeMapHandler = () => setshowMap(false);
  const openDelete = () => setshowDelete(true);
  const closeDelete = () => setshowDelete(false);
  const confirmDelete = () =>{console.log("deleting...");setshowDelete(false)};

  return (
    <>
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={props.address}
        contentClass="place-item__modal-content"
        foooterClass="place-item__modal-actions"
        footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
      >
        <div className="map-container">
          <Map center={props.coordinates} zoom={16} />
        </div>
      </Modal>

      <Modal show={showDelete} onCancel={closeDelete} header="Alert !" foooterClass="place-item__modal-actions" footer={<>
        <Button inverse onClick={closeDelete}>CANCEL</Button>
        <Button danger onClick={confirmDelete}>PROCEED</Button>
      </>}>
        <p>Are you sure? It can't be undone later</p>
      </Modal>

      <li className="place-item">
        <Card className="place-item__content">
          <div className="place-item__image">
            <img src={props.image} alt={props.title} />
          </div>
          <div className="place-item__info">
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
          </div>
          <div className="place-item__actions">
            <Button inverse onClick={openMapHandler}>
              VIEW ON MAP
            </Button>
            <Button to={`/places/${props.id}`}>EDIT</Button>
            <Button danger onClick={openDelete}>Delete</Button>
          </div>
        </Card>
      </li>
    </>
  );
}

export default Placeitem;
