import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import VehicleCard from "./VehicleCard";

const VehicleList = (props) => {
  const navigate = useNavigate();

  const [vehiclesList, setVehiclesList] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/vehicles")
      .then((response) => {
        setVehiclesList(response.data);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <div id="vehicle-list">
      {vehiclesList.map((vehicle) => {
        return (
          <VehicleCard
            key={vehicle.id}
            value={vehicle}
            onClick={
              props.editVehicle
                ? () => navigate(`/vehicles/overview/${vehicle.id}`)
                : () =>
                    navigate(`/receipts/add-new-receipt/vehicle/${vehicle.id}`)
            }
          />
        );
      })}
    </div>
  );
};

export default VehicleList;
