import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
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

const AddNewVehicle = () => {
  const navigate = useNavigate();

  const [uniqueVehicleIdError, setUniqueVehicleIdError] = useState("");
  const [tooLongURLError, setTooLongURLError] = useState("");

  const initialValues = {
    vehicleBrand: "",
    vehicleId: "",
    engineNumber: "",
    fuel: "Dizel",
    imageURL: "",
  };

  const onSubmit = (formData) => {
    if (formData.imageURL === "") {
      formData.imageURL =
        "https://www.seat.com.mt/content/dam/public/seat-website/carworlds/compare/default-image/ghost.png";
    }
    axios
      .post("http://localhost:3001/vehicles/add-new-vehicle", formData)
      .then((value) => {
        navigate("/vehicles");
      })
      .catch((e) => {
        if (e.response.data.message.includes("Broj šasije")) {
          setUniqueVehicleIdError(e.response.data.message);
          return;
        }
        if (e.response.data.message.includes("URL slike")) {
          setTooLongURLError(e.response.data.message);
          return;
        }
      });
  };

  const validationSchema = Yup.object().shape({
    vehicleBrand: Yup.string().required("Marka i tip automobila su obavezni"),
    vehicleId: Yup.string()
      .length(17, "Broj šasije mora sadržavati 17 znakova")
      .required("Broj šasije je obavezan"),
    engineId: Yup.string().required("Broj motora je obavezan"),
    powerKS: Yup.number()
      .positive("Snaga motora ne može biti negativna")
      .required("Snaga motora je obavezna"),
    powerkW: Yup.number()
      .positive("Snaga motora ne može biti negativna")
      .required("Snaga motora je obavezna"),
    productionYear: Yup.number()
      .positive("Godina prozivodnje ne može biti negativna")
      .required("Godina proizvodnje je obavezna"),
  });

  return (
    <div id="add-new-vehicle-page">
      <div id="add-card">
        <div id="heading">
          <h2>Dodaj novo vozilo</h2>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ errors }) => (
            <Form>
              <div className="input-field">
                <label>Marka i tip:</label>
                <Field
                  name="vehicleBrand"
                  id="vehicle-brand"
                  style={styles.inputStyle}
                />
                <ErrorMessage
                  name="vehicleBrand"
                  component="span"
                  className="errorMessage"
                />
              </div>
              <div className="input-field">
                <label>Broj šasije:</label>
                <Field
                  name="vehicleId"
                  id="vehicle-id"
                  style={styles.inputStyle}
                  onKeyUp={(e) => setUniqueVehicleIdError("")}
                />
                <ErrorMessage
                  name="vehicleId"
                  component="span"
                  className="errorMessage"
                />
                {uniqueVehicleIdError ? (
                  <span className="errorMessage">{uniqueVehicleIdError}</span>
                ) : null}
              </div>
              <div className="input-field">
                <label>Broj motora:</label>
                <Field
                  name="engineId"
                  id="engine-id"
                  style={styles.inputStyle}
                />
                <ErrorMessage
                  name="engineId"
                  component="span"
                  className="errorMessage"
                />
              </div>
              <div className="input-field">
                <label>Snaga motora:</label>
                <div id="power-container">
                  <div>
                    <Field
                      type="number"
                      name="powerKS"
                      placeholder="KS"
                      id="power-KS"
                      style={styles.inputStyle}
                    />
                    <Field
                      type="number"
                      name="powerkW"
                      placeholder="kW"
                      id="power-kW"
                      style={styles.inputStyle}
                    />
                  </div>
                  <div>
                    <ErrorMessage
                      name="powerKS"
                      component="span"
                      className="errorMessage"
                    />
                    {!errors.powerKS && (
                      <ErrorMessage
                        name="powerkW"
                        component="span"
                        className="errorMessage"
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className="input-field">
                <label>Vrsta goriva:</label>
                <Field name="fuel" as="select" style={styles.inputStyle}>
                  <option value="Dizel">Dizel</option>
                  <option value="Benzin">Benizn</option>
                  <option value="Plin">Plin</option>
                </Field>
              </div>
              <div className="input-field">
                <label>Godina proizvodnje:</label>
                <Field
                  type="number"
                  name="productionYear"
                  id="production-year"
                  style={styles.inputStyle}
                />
                <ErrorMessage
                  name="productionYear"
                  component="span"
                  className="errorMessage"
                />
              </div>
              <div className="input-field">
                <label>URL Slike:</label>
                <Field
                  name="imageURL"
                  id="image"
                  style={styles.inputStyle}
                  onKeyUp={() => setTooLongURLError("")}
                />
                <ErrorMessage
                  name="image"
                  component="span"
                  className="errorMessage"
                />
                {tooLongURLError ? (
                  <span className="errorMessage">{tooLongURLError}</span>
                ) : null}
              </div>
              <div id="controls-container">
                <div id="controls">
                  <Button
                    text="Odustani"
                    icon={AiOutlineClose()}
                    color="FreeSpeechRed"
                    onClick={() => navigate("/vehicles")}
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

export default AddNewVehicle;
