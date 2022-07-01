const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./database/models");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors());
app.use(bodyParser.json());

//Routers
const vehicleRouter = require("./routes/Vehicles");
app.use("/vehicles", vehicleRouter);
const receiptsRouter = require("./routes/Receipts");
app.use("/receipts", receiptsRouter);

db.sequelize
  .sync()
  .then(() => {
    console.log("Database connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(() => console.log("Database not connected"));
