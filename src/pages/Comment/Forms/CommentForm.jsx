import React, { useEffect } from "react";
import { Grid, Typography } from "@material-ui/core";
import * as yup from "yup";
import { Formik } from "formik";
import TextFieldFormik from "../../../components/Inputs/TextFieldFormik";
import ButtonFormik from "../../../components/Inputs/ButtonFormik";
import DatePickerFieldFormik from "../../../components/Inputs/DatePickerFieldFormik";
import AutocompleteFieldFormik from "../../../components/Inputs/AutocompleteFieldFormik";
import SelectFieldFormik from "../../../components/Inputs/SelectFieldFormik";
import { commentTypeOptions, stateOptions } from "../../../constants";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import AnimalActions from "../../../redux/actions/animal.actions";
import PalpationActions from "../../../redux/actions/palpation.actions";
import CustomInfoIcon from "../../../components/CustomInfoIcon";
import CollaboratorActions from "../../../redux/actions/collaborator.actions";
import { useParams } from "react-router";
import CommentActions from "../../../redux/actions/comment.actions";

const defaultInitValues = {
  description: "",
  type: "ERROR",
  state: "OPEN",
};

const CommentForm = ({
  initValues = defaultInitValues,
  type = "create",
  onClickCancelButton,
  onCompleteSubmit = () => {},
}) => {
  const dispatch = useDispatch();

  const validationSchema = yup.object({
    description: yup
      .string("Ingresa la description del problema.")
      .required("Este campo es requerido."),
  });

  const handleSubmit = async (values, actions) => {
    try {
      if (type === "create") {
        await dispatch(CommentActions.create(values));
      }
      if (type === "update") {
        await dispatch(CommentActions.update(values));
      }
      onCompleteSubmit();
    } catch {
      actions.setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
      enableReinitialize
    >
      {(props) => (
        <form onSubmit={props.handleSubmit}>
          <Grid container spacing={1}>
            <Typography variant={"subtitle1"} gutterBottom>
              {type === "create" ? "Reportar incidencia" : "Editar incidencia"}
            </Typography>
          </Grid>
          <Grid container spacing={1}>
            <SelectFieldFormik
              label="Tipo de incidencia"
              name="type"
              onChange={props.handleChange}
              options={Object.keys(commentTypeOptions).map((key) => ({
                _id: key,
                name: commentTypeOptions[key],
              }))}
            />
            <TextFieldFormik
              label="Descripción"
              name="description"
              multiline
              rows={3}
              onChange={props.handleChange}
              xs={12}
            />
          </Grid>
          <Grid item container xs={12} justifyContent="space-between">
            <Grid item xs={5}>
              <ButtonFormik
                xs={12}
                label="Cancelar"
                type="cancel"
                onClick={onClickCancelButton}
              />
            </Grid>
            <Grid item xs={5}>
              <ButtonFormik xs={12} label="Guardar" type="submit" />
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
};

export default CommentForm;
