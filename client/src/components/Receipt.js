import React, { useState } from "react";
import { BiReceipt } from "react-icons/bi";
import { AiOutlineEdit } from "react-icons/ai";
import { format } from "date-fns";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "./Button";
import axios from "axios";

const statusColor = new Map();
statusColor.set("Evidentiran", "#ffcc00");
statusColor.set("Završen", "#696969");
statusColor.set("Potvrđen", "#c0cb01");
statusColor.set("Odbijen", "#db1010");

const styles = {
  inputStyle: {
    padding: "0.5em",
    border: 0,
    borderBottom: "2px solid #9b9b9b",
    outline: "none",
    backgroundColor: "#fff",
    marginRight: "1em",
  },
};

const Receipt = (props) => {
  const [showDialog, setShowDialog] = useState(false);

  const onSubmit = (formData) => {
    axios
      .patch(`http://localhost:3001/receipts/${props.value.id}`, formData)
      .then((value) => {
        axios
          .get("http://localhost:3001/receipts")
          .then((response) => {
            props.setReceiptList(response.data);
            setShowDialog(false);
          })
          .catch((e) => console.log(e));
      })
      .catch((e) => console.log(e));
  };

  return (
    <div id="list-item">
      <div id="receipt-info-container">
        <div id="receipt-status">
          <BiReceipt size={84} color={statusColor.get(props.value.status)} />
          <span
            id="status"
            style={{ color: statusColor.get(props.value.status) }}
          >
            {props.value.status}
          </span>
        </div>
        <div id="receipt-info">
          <h2>{props.value.vehicleBrand}</h2>
          <h5>
            Vremenski period:{" "}
            {format(
              Date.parse(props.value.startingTime),
              "dd.MM.yyyy, HH:mm:ss"
            )}{" "}
            do
            {" " +
              format(
                Date.parse(props.value.endingTime),
                "dd.MM.yyyy, HH:mm:ss"
              )}
          </h5>
          <h5>
            Lokacija: {props.value.startLocation} - {props.value.endLocation}
          </h5>
          <h5>Ime vozača: {props.value.driverName}</h5>
          <h5>Broj putnika: {props.value.numberOfPassengers}</h5>
        </div>
      </div>
      <div id="change-receipt-status">
        {props.value.status !== "Završen" &&
        props.value.status !== "Odbijen" &&
        props.showButtons ? (
          <Button
            text="Promijeni status"
            icon={AiOutlineEdit()}
            color="VerdunGreen"
            onClick={() => {
              setShowDialog(true);
              console.log(props.showButtons);
            }}
          />
        ) : null}
      </div>
      <Dialog open={showDialog}>
        <DialogTitle>
          Izmijenite status naloga za vozilo {props.value.vehicleBrand}
        </DialogTitle>
        <DialogContent>
          <Formik
            initialValues={{ status: props.value.status }}
            onSubmit={onSubmit}
          >
            <Form>
              <div id="dialog-choice-box">
                <label>Status:</label>
                <Field name="status" as="select" style={styles.inputStyle}>
                  <option value="Evidentiran">Evidentiran</option>
                  <option value="Završen">Završen</option>
                  <option value="Odbijen">Odbijen</option>
                  <option value="Potvrđen">Potvrđen</option>
                </Field>
              </div>
              <DialogActions style={{ marginTop: "1em" }}>
                <button onClick={() => setShowDialog(false)}>
                  <span
                    style={{
                      backgroundColor: "#db1010",
                    }}
                    className="button-icon"
                  >
                    Odustani
                  </span>
                </button>

                <button type="submit">
                  <span
                    style={{
                      backgroundColor: "#465902",
                    }}
                    className="button-icon"
                  >
                    Potvrdi
                  </span>
                </button>
              </DialogActions>
            </Form>
          </Formik>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Receipt;
