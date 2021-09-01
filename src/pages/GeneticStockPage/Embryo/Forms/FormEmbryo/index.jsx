import React, { useEffect, useState } from "react";
import { Grid, Typography, InputAdornment } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { AddCircle } from "@material-ui/icons";
import { useStyles } from "./styles";
import { Formik } from "formik";
import * as yup from "yup";
import TextFieldFormik from "../../../../../components/Inputs/TextFieldFormik";
import SelectFieldFormik from "../../../../../components/Inputs/SelectFieldFormik";
import ButtonFormik from "../../../../../components/Inputs/ButtonFormik";
import CheckboxFormik from "../../../../../components/Inputs/CheckboxFormik";
import { useDispatch } from "react-redux";
import GeneticStockActions from "../../../../../redux/actions/geneticStock.actions";

const propTypes = {};

function FormEmbryo({ setOpen }) {
  const classes = useStyles();

  const letters = ["A", "B", "C", "D"];
  const [animalRace, setAnimalRace] = useState({
    A: { type: "1", percentage: "100%" },
  });
  const dispatch = useDispatch();

  const [errorPercentage, setErrorPercentage] = useState("");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // eslint-disable-next-line no-unused-vars
  const handleCheckPercentage = (list = {}) => {
    let total = 0;

    Object.keys(list).forEach((animal) => {
      const percentage = list[animal];
      total = total + parseFloat(percentage);
    });

    console.log("total");
    console.log(total);

    if (total !== 100) {
      setErrorPercentage(
        "El porcentaje total debe ser 100%. Porfavor ajuste sus cantidades"
      );
      return false;
    } else {
      setErrorPercentage("");
      return true;
    }
  };

  const handleAddRace = () => {
    const races = { ...animalRace };
    if (letters[Object.keys(races).length]) {
      races[letters[Object.keys(races).length]] = {
        type: "1",
        percentage: "0%",
      };

      setAnimalRace(races);
    }
  };

  const handleRemoveRace = (id, index, values) => {
    const races = { ...animalRace };
    delete races[id];
    // values[`percentageRace${index + 1}`] = 0;
    // values[`race${index + 1}Id`] = "";
    setAnimalRace(races);
  };

  const [initValues] = useState({
    agribusinessId: "",
    identifier: "",
    father: "",
    mother: "",
    active: false,
    value: 0,
    stock: 0,
    lastMove: "",
    totalValue: 0,
    geneticType: "EMBRYO",
    observation: "",
  });

  const validationSchema = yup.object({});

  const handleSubmit = (values, actions) => {
    dispatch(GeneticStockActions.createGenticStock(values));
  };

  return (
    <Grid className={classes.modal}>
      <Formik
        initialValues={initValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Typography variant={"subtitle1"}>Nuevo Embrion</Typography>
              </Grid>
            </Grid>
            <Grid container spacing={1} className={classes.formStyle}>
              <TextFieldFormik
                label="Cód. embrión"
                name="identifier"
                onChange={props.handleChange}
                xs={12}
                sm={4}
              />
              <TextFieldFormik
                label="Padre"
                name="father"
                onChange={props.handleChange}
                xs={12}
                sm={4}
              />
              <TextFieldFormik
                label="Madre"
                name="mother"
                onChange={props.handleChange}
                xs={12}
                sm={4}
              />
              <Grid
                lg={6}
                sm={6}
                xs={12}
                container
                justifyContent="center"
                alignContent="center"
                alignItems="center"
              >
                <CheckboxFormik
                  label="Activo"
                  name="active"
                  options={[{ _id: 1, name: "Si" }]}
                  onChange={props.handleChange}
                  checked={props.values.active}
                ></CheckboxFormik>
              </Grid>
            </Grid>
            <Grid item xs={12} container className={classes.border}>
              {Object.keys(animalRace).map((raceItem, index) => (
                <Grid
                  item
                  xs={12}
                  container
                  key={`race-option-${raceItem}`}
                  spacing={1}
                  className={classes.raceContainer}
                >
                  <Grid item xs={12}>
                    <Typography
                      variant={"body2"}
                      gutterBottom
                      className={classes.subtitle}
                    >
                      {`Raza ${raceItem}`}
                    </Typography>
                  </Grid>
                  <Grid item container sm={8} xs={12}>
                    <SelectFieldFormik
                      name={`race${index + 1}Id`}
                      label="Raza"
                      options={[]}
                      onChange={props.handleChange}
                    />
                  </Grid>
                  <Grid
                    item
                    container
                    sm={4}
                    xs={12}
                    alignItems={"center"}
                    justifyContent={"center"}
                  >
                    <Grid item xs={11}>
                      <TextFieldFormik
                        xs={12}
                        name={`percentageRace${index + 1}`}
                        endAdornment={
                          <InputAdornment position="start">%</InputAdornment>
                        }
                        type="number"
                        label="Porcentaje"
                        style={{ textAlign: "end" }}
                        // type="number"
                        onChange={props.handleChange}
                      />
                    </Grid>
                    <Grid item xs={1}>
                      {Boolean(index) && (
                        <DeleteIcon
                          color={"secondary"}
                          className={classes.deleteIcon}
                          onClick={() =>
                            handleRemoveRace(raceItem, index, props.values)
                          }
                        />
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              ))}
              <Grid item xs={12} className={classes.errorMessage}>
                <Typography variant={"caption"} gutterBottom>
                  {errorPercentage}
                </Typography>
              </Grid>
              <AddCircle
                color={"secondary"}
                className={classes.addBtn}
                onClick={handleAddRace}
              />
            </Grid>
            <Grid container spacing={1}>
              <TextFieldFormik
                label="Costo unidad"
                type="number"
                name="value"
                onChange={props.handleChange}
                lg={3}
                sm={3}
                xs={12}
              ></TextFieldFormik>
              <TextFieldFormik
                label="Existencia"
                type="number"
                name="stock"
                onChange={props.handleChange}
                lg={3}
                sm={3}
                xs={12}
              ></TextFieldFormik>
              <TextFieldFormik
                label="Últ. movimiento"
                type="text"
                name="lastMove"
                onChange={props.handleChange}
                lg={3}
                sm={3}
                xs={12}
              ></TextFieldFormik>
              <TextFieldFormik
                label="Valor Total"
                type="text"
                name="totalValue"
                onChange={props.handleChange}
                lg={3}
                sm={3}
                xs={12}
              ></TextFieldFormik>
              <TextFieldFormik
                label="Observación"
                type="text"
                name="observation"
                onChange={props.handleChange}
                multiline
                rows={3}
                xs={12}
              ></TextFieldFormik>
            </Grid>
            <Grid item container justifyContent={"flex-end"} xs={12}>
              <Grid item xs={3} className={classes.paddingButton}>
                <ButtonFormik xs={3} label="Cancelar" type="cancel" />
              </Grid>
              <Grid item xs={3}>
                <ButtonFormik xs={3} label="Guardar" type="submit" />
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </Grid>
  );
}

FormEmbryo.propTypes = propTypes;

export default FormEmbryo;
