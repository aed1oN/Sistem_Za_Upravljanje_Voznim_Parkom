import React, { useState } from "react";
import { AiOutlineClose, AiOutlineCheck } from "react-icons/ai";
import { FaChevronLeft } from "react-icons/fa";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import Button from "../components/Button";

const styles = {
  inputStyle: {
    padding: "0.5em",
    border: 0,
    borderBottom: "2px solid #9b9b9b",
    outline: "none",
  },
};

const AddNewReceipt = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const initialValues = {
    startingTime: "",
    endingTime: "",
    startLocation: "",
    endLocation: "",
    driverName: "",
  };

  const validationSchema = Yup.object().shape({
    startLocation: Yup.string().required("Lokacija je obavezna"),
    endLocation: Yup.string().required("Lokacija je obavezna"),
    driverName: Yup.string().required("Ime vozača je obavezno"),
    numberOfPassengers: Yup.string().required("Broj putnika je obavezan"),
  });

  const onSubmit = (formData) => {
    formData.status = "Evidentiran";
    formData.VehicleId = id;
    axios
      .post("http://localhost:3001/receipts/add-new-receipt", formData)
      .then((value) => navigate("/receipts"))
      .catch((e) => console.log(e));
  };

  return (
    <div id="add-new-vehicle-page">
      <div id="add-card">
        <div id="heading">
          <h2>Evidentiraj novi nalog</h2>
        </div>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {({ errors }) => (
            <Form>
              <div className="input-field">
                <label>Vrijeme:</label>
                <div id="power-container">
                  <div>
                    <Field
                      type="text"
                      name="startingTime"
                      placeholder="Od"
                      id="starting-time"
                      style={styles.inputStyle}
                      onFocus={(e) => (e.target.type = "datetime-local")}
                    />
                    <Field
                      type="text"
                      name="endingTime"
                      placeholder="Do"
                      id="ending-time"
                      style={styles.inputStyle}
                      onFocus={(e) => (e.target.type = "datetime-local")}
                    />
                  </div>
                  <div>
                    <ErrorMessage
                      name="startingTime"
                      component="span"
                      className="errorMessage"
                    />
                    {!errors.powerKS && (
                      <ErrorMessage
                        name="endingTime"
                        component="span"
                        className="errorMessage"
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className="input-field">
                <label>Lokacija:</label>
                <div id="power-container">
                  <div>
                    <Field
                      name="startLocation"
                      placeholder="Od"
                      id="start-location"
                      style={styles.inputStyle}
                    />
                    <Field
                      name="endLocation"
                      placeholder="Do"
                      id="end-location"
                      style={styles.inputStyle}
                    />
                  </div>
                  <div>
                    <ErrorMessage
                      name="startLocation"
                      component="span"
                      className="errorMessage"
                    />
                    {!errors.powerKS && (
                      <ErrorMessage
                        name="endLocation"
                        component="span"
                        className="errorMessage"
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className="input-field">
                <label>Ime vozača:</label>
                <Field
                  name="driverName"
                  id="driver-name"
                  style={styles.inputStyle}
                />
                <ErrorMessage
                  name="driverName"
                  component="span"
                  className="errorMessage"
                />
              </div>
              <div className="input-field">
                <label>Broj putnika:</label>
                <Field
                  type="number"
                  name="numberOfPassengers"
                  id="production-year"
                  style={styles.inputStyle}
                />
                <ErrorMessage
                  name="numberOfPassengers"
                  component="span"
                  className="errorMessage"
                />
              </div>
              <div id="controls-container">
                <div id="controls">
                  <Button
                    text="Nazad"
                    icon={FaChevronLeft()}
                    color="FreeSpeechRed"
                    onClick={() => navigate("/receipts/choose-vehicle")}
                  ></Button>
                  <Button
                    text="Potvrdi"
                    icon={AiOutlineCheck()}
                    color="Olive"
                    submit={true}
                  ></Button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddNewReceipt;
