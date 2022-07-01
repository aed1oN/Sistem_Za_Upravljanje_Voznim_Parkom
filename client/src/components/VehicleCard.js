import React from "react";

const VehicleCard = (props) => {
  return (
    <div id="card" onClick={props.onClick}>
      <div id="vehicle-image">
        <img src={props.value.imageURL} alt={props.value.vehicleBrand} />
      </div>
      <h2>{props.value.vehicleBrand}</h2>
      <h5>{props.value.fuel}</h5>
      <h5>{props.value.productionYear}</h5>
    </div>
  );
};

export default VehicleCard;
