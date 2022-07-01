import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Vehicles from "./pages/Vehicles";
import Recepits from "./pages/Receipts";
import Header from "./components/Header";
import AddNewVehicle from "./pages/AddNewVehicle";
import VehicleOverview from "./pages/VehicleOverview";
import AddNewReceipt from "./pages/AddNewReceipt";
import ChooseVehicle from "./pages/ChooseVehicle";

import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" index element={<Home />} />
          <Route path="/vehicles" element={<Vehicles />} />
          <Route path="/vehicles/add-new-vehicle" element={<AddNewVehicle />} />
          <Route path="/vehicles/overview/:id" element={<VehicleOverview />} />
          <Route path="/receipts" element={<Recepits />} />
          <Route path="/receipts/choose-vehicle" element={<ChooseVehicle />} />
          <Route
            path="/receipts/add-new-receipt/vehicle/:id"
            element={<AddNewReceipt />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
