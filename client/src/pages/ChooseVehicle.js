import React from "react";
import VehicleList from "../components/VehicleList";
import { FaChevronLeft, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const ChooseVehicle = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="info-and-buttons">
        <h2>Odaberite vozilo</h2>
        <Button
          text="Odustani"
          icon={FaTimes()}
          color="FreeSpeechRed"
          onClick={() => navigate("/receipts")}
        />
      </div>
      <VehicleList editVehicle={false} />
    </div>
  );
};

export default ChooseVehicle;
