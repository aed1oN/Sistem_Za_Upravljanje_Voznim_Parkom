import React from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import Button from "../components/Button";
import VehicleList from "../components/VehicleList";

const Vehicles = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="info-and-buttons">
        <h2>Lista vozila</h2>
        <div>
          <Button
            text="Dodaj novo vozilo"
            icon={FaPlus()}
            color="Olive"
            onClick={() => navigate("/vehicles/add-new-vehicle")}
          />
        </div>
      </div>
      <VehicleList editVehicle={true} />
    </div>
  );
};

export default Vehicles;
