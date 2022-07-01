const express = require("express");
const { Receipts, Vehicles } = require("../database/models/");
const db = require("../database/models");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const [results, metadata] = await db.sequelize.query(
      "SELECT Receipts.id, Receipts.startingTime, Receipts.endingTime, Receipts.startLocation, Receipts.endLocation, Receipts.driverName, Receipts.numberOfPassengers, Receipts.status, Vehicles.vehicleBrand FROM `Receipts` LEFT JOIN Vehicles ON Receipts.VehicleId=Vehicles.id"
    );
    res.status(200).json(results);
  } catch (e) {
    console.log(e);
    res.status(404).json(e);
  }
});

router.post("/add-new-receipt", async (req, res) => {
  const receipt = req.body;
  try {
    const createdVehicle = await Receipts.create(receipt);
    res.status(200).json(createdVehicle);
  } catch (e) {
    res.status(404).json(e);
  }
});

router.patch("/:id", async (req, res) => {
  const pk = req.params.id;
  const status = req.body;
  try {
    const updatedData = await Receipts.update(status, {
      where: { id: pk },
    });
    res.status(200).json(updatedData);
  } catch (e) {
    res.status(404).json(e);
  }
});

module.exports = router;
