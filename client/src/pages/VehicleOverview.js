import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaRegTrashAlt, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "../components/Button";

const styles = {
  inputStyle: {
    padding: "0.5em",
    border: 0,
    borderBottom: "2px solid #9b9b9b",
    outline: "none",
  },
};

const VehicleOverview = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [uniqueVehicleIdError, setUniqueVehicleIdError] = useState("");
  const [tooLongURLError, setTooLongURLError] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [vehicle, setVehicle] = useState({});
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/vehicles/${id}`)
      .then((response) => {
        setVehicle(response.data);
      })
      .catch((e) => console.log(e));
  }, []);

  const onSubmit = (formData) => {
    if (formData.imageURL === "") {
      formData.imageURL =
        "https://www.seat.com.mt/content/dam/public/seat-website/carworlds/compare/default-image/ghost.png";
    }
    axios
      .patch(`http://localhost:3001/vehicles/${id}`, formData)
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

  const handleDelete = () => {
    axios
      .delete(`http://localhost:3001/vehicles/${id}`)
      .then((value) => {
        navigate("/vehicles");
      })
      .catch((e) => console.log(e));
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
    <div id="vehicle-overview-page">
      <div className="info-and-buttons">
        <h2>Pregled vozila</h2>
        <div>
          <Button
            text="Izbriši"
            icon={FaRegTrashAlt()}
            color="FreeSpeechRed"
            onClick={() => setShowDialog(true)}
            marginRight="2em"
          />
          <Button
            text="Uredi"
            icon={FaEdit()}
            color="SteelBlue"
            onClick={() => setDisabled(false)}
          />
        </div>
      </div>
      <div id="vehicle-overview-container">
        <div id="vehicle-overview-image">
          <img src={vehicle.imageURL} alt="Audi Q8" />
        </div>
        <div id="vehicle-overview-form">
          <Formik
            initialValues={vehicle}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            enableReinitialize={true}
          >
            {({ errors }) => (
              <Form>
                <div className="input-field">
                  <label>Marka i tip:</label>
                  <Field
                    disabled={disabled ? true : false}
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
                    disabled={disabled ? true : false}
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
                    disabled={disabled ? true : false}
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
                        disabled={disabled ? true : false}
                        type="number"
                        name="powerKS"
                        placeholder="KS"
                        id="power-KS"
                        style={styles.inputStyle}
                      />
                      <Field
                        disabled={disabled ? true : false}
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
                  <Field
                    disabled={disabled ? true : false}
                    name="fuel"
                    as="select"
                    style={styles.inputStyle}
                  >
                    <option value="Dizel">Dizel</option>
                    <option value="Benzin">Benizn</option>
                    <option value="Plin">Plin</option>
                  </Field>
                </div>
                <div className="input-field">
                  <label>Godina proizvodnje:</label>
                  <Field
                    disabled={disabled ? true : false}
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
                    disabled={disabled ? true : false}
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
                {disabled ? null : (
                  <div id="controls-container">
                    <div id="controls">
                      <button onClick={() => setDisabled(true)}>
                        <span
                          style={{
                            backgroundColor: "#db1010",
                          }}
                          className="button-text"
                        >
                          Odustani
                        </span>
                      </button>

                      <button type="submit">
                        <span
                          style={{
                            backgroundColor: "#465902",
                          }}
                          className="button-text"
                        >
                          Potvrdi
                        </span>
                      </button>
                    </div>
                  </div>
                )}
              </Form>
            )}
          </Formik>
          <Dialog open={showDialog}>
            <DialogTitle>
              Jeste li sigurni da želite obrisati vozilo?
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                Ova akcija se ne može poništiti
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <button onClick={() => setShowDialog(false)}>
                <span
                  style={{
                    backgroundColor: "#db1010",
                  }}
                  className="button-icon"
                >
                  <FaTimes />
                </span>
              </button>

              <button onClick={() => handleDelete()}>
                <span
                  style={{
                    backgroundColor: "#465902",
                  }}
                  className="button-icon"
                >
                  <FaCheck />
                </span>
              </button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default VehicleOverview;
