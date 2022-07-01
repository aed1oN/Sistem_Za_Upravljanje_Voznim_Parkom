const express = require("express");
const { Vehicles } = require("../database/models/");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const vehicles = await Vehicles.findAll();
    res.status(200).json(vehicles);
  } catch (e) {
    res.status(404).json(e);
  }
});

router.get("/:id", async (req, res) => {
  const pk = req.params.id;
  try {
    const vehicle = await Vehicles.findByPk(pk);
    res.status(200).json(vehicle);
  } catch (e) {
    res.status(404).json(e);
  }
});

router.post("/add-new-vehicle", async (req, res) => {
  const vehicle = req.body;
  try {
    const createdVehicle = await Vehicles.create(vehicle);
    res.status(200).json(createdVehicle);
  } catch (e) {
    if (e.parent.sqlMessage.includes("Duplicate entry")) {
      res.status(404).json({ message: "Broj šasije mora biti jedinstven" });
      return;
    }
    if (e.parent.sqlMessage.includes("Data too long")) {
      res.status(404).json({
        message: "URL slike je predug, molim vas odaberite drugu sliku",
      });
      return;
    }
    res.status(404).json(e);
  }
});

router.patch("/:id", async (req, res) => {
  const pk = req.params.id;
  const vehicle = req.body;
  try {
    const updatedData = await Vehicles.update(vehicle, {
      where: { id: pk },
    });
    res.status(200).json(updatedData);
  } catch (e) {
    res.status(404).json(e);
  }
});

router.delete("/:id", async (req, res) => {
  const pk = req.params.id;
  try {
    await Vehicles.destroy({ where: { id: pk } });
    res.status(200).json({ message: "Record deleted" });
  } catch (e) {
    res.status(404).json(e);
  }
});

module.exports = router;
