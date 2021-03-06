import { Grid, Typography, InputAdornment } from "@material-ui/core";
import { Formik } from "formik";
import * as yup from "yup";
import SelectFieldFormik from "../../../components/Inputs/SelectFieldFormik";
import TextFieldFormik from "../../../components/Inputs/TextFieldFormik";
import PropTypes from "prop-types";
import DatePickerFieldFormik from "../../../components/Inputs/DatePickerFieldFormik";
import ButtonFormik from "../../../components/Inputs/ButtonFormik";
import { movementOptions, operationOptions } from "../../../constants";
import { useDispatch } from "react-redux";
import MovementActions from "../../../redux/actions/movement.actions";
import { useEffect } from "react";
import { useSelector, shallowEqual } from "react-redux";
import geneticStockActions from "../../../redux/actions/geneticStock.actions";
import AutocompleteFieldFormik from "../../../components/Inputs/AutocompleteFieldFormik";

const defaultInitValues = {
  geneticStockId: "",
  movementType: "",
  date: new Date(),
  observation: "",
  quantity: 1,
  unitValue: 0,
  saleAccount: "",
  description: "",
  toWho: "",
};

/**
 * @component
 * @description Componente, formulario para crear o editar el registro del movimientos que tiene relacion con stock genetico
 * @author Emerson Puma Quispe <emerson.puma@ideascloud.io>
 */

const MovementForm = ({
  initValues = defaultInitValues,
  type = "create",
  onClickCancelButton,
  onCompleteSubmit = () => {},
  geneticType,
}) => {
  const dispatch = useDispatch();
  const geneticStockList = useSelector(
    (state) =>
      state.geneticStock.list.filter(
        (e) => e.active && e.geneticType === geneticType
      ),
    shallowEqual
  );
  const currentFarm = useSelector((state) => state.farm.current);
  const validationSchema = () =>
    yup.lazy((values) => {
      return yup.object({
        movementType: yup
          .string("Ingresa el tipo de movimiento")
          .required("Esta campo es requerido."),
        date: yup
          .date("Ingresa una fecha")
          .required("Este campo es requerido."),
        geneticStockId: yup
          .string("Ingresa stock gen??tico")
          .nullable(true)
          .required("Esta campo es requerido."),
        observation: yup.string("Ingresa una observaci??n"),
        quantity: yup
          .number("Ingrese solo n??meros")
          .integer("Solo n??meros enteros")
          .min(1, "La cantidad debe ser mayor o igual a 1")
          .max(
            movementOptions[values.movementType] === movementOptions.SALE ||
              movementOptions[values.movementType] === movementOptions.OTHER
              ? values.geneticStockId
                ? geneticStockList.find((e) => e._id === values.geneticStockId)
                    ?.stock
                : 0
              : Infinity,
            ({ max }) => `La cantidad debe ser menor o igual a ${max}`
          )

          .required("Este campo es requerido"),
        unitValue: yup
          .number("Ingrese solo n??meros")
          .required("Este campo es requerido"),
        saleAccount: yup.string("Ingresa una cuenta"),
        description: yup.string("Ingresa una descripci??n"),
        toWho: yup.string("Ingresa informaci??n"),
      });
    });

  useEffect(() => {
    (!geneticStockList || geneticStockList.length === 0) &&
      dispatch(
        geneticStockActions.listGeneticStockByAgribusiness({
          geneticType,
        })
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const transformByMovementType = (values) => {
    if (
      movementOptions[values.movementType] === movementOptions.SALE ||
      operationOptions[values.movementOperationType] ===
        operationOptions.SUBSTRACTION
    ) {
      values.quantity = values.quantity * -1;
    }
    return values;
  };

  const onSubmit = async (values, actions) => {
    try {
      const transformedValues = transformByMovementType(values);
      if (type === "create") {
        await dispatch(MovementActions.create(transformedValues, geneticType));
      }
      if (type === "update") {
        await dispatch(MovementActions.update(transformedValues, geneticType));
      }
      onCompleteSubmit();
    } catch {
      actions.setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {(props) => (
        <form onSubmit={props.handleSubmit}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography variant="subtitle1">
                {type === "create" && "Nuevo movimiento"}
                {type === "update" && "Editar movimiento"}
              </Typography>
            </Grid>
            <SelectFieldFormik
              onChange={props.handleChange}
              xs={12}
              sm={props.values.movementType === "OTHER" ? 2 : 5}
              name="movementType"
              label="Movimiento"
              options={Object.keys(movementOptions)
                .filter(
                  (key) =>
                    key === "SALE" || key === "PURCHASE" || key === "OTHER"
                )
                .map((key) => ({
                  _id: key,
                  name: movementOptions[key],
                }))}
            />
            {props.values.movementType === "OTHER" && (
              <SelectFieldFormik
                onChange={props.handleChange}
                xs={12}
                sm={3}
                name="movementOperationType"
                label="Tipo de operacion"
                options={Object.keys(operationOptions).map((key) => ({
                  _id: key,
                  name: operationOptions[key],
                }))}
              />
            )}
            <AutocompleteFieldFormik
              options={geneticStockList}
              name="geneticStockId"
              label="Stock gen??tico"
              onChange={props.handleChange}
              xs={12}
              sm={5}
            />
            <TextFieldFormik
              name="stock"
              label="Cantidad"
              onChange={props.handleChange}
              xs={12}
              sm={2}
              disabled
              value={
                props.values.geneticStockId
                  ? geneticStockList.find(
                      (e) => e._id === props.values.geneticStockId
                    )?.stock
                  : 0
              }
            />

            <DatePickerFieldFormik
              label="Fecha"
              onChange={props.handleChange}
              name="date"
              xs={12}
              sm={6}
            />
            <TextFieldFormik
              onChange={props.handleChange}
              name="toWho"
              label="A quien"
              xs={12}
              sm={6}
            />
            <TextFieldFormik
              onChange={props.handleChange}
              name="observation"
              label="Observaci??n"
            />
            <TextFieldFormik
              onChange={props.handleChange}
              name="quantity"
              label="Cantidad"
              type="number"
              xs={12}
              sm={4}
            />
            <TextFieldFormik
              onChange={props.handleChange}
              name="unitValue"
              label="Valor unidad"
              endAdornment={
                <InputAdornment position="start">
                  {currentFarm?.currency?.currencyAbbreviation}
                </InputAdornment>
              }
              type="number"
              xs={12}
              sm={4}
            />
            <TextFieldFormik
              name="total"
              label="Total"
              xs={12}
              endAdornment={
                <InputAdornment position="start">
                  {currentFarm?.currency?.currencyAbbreviation}
                </InputAdornment>
              }
              sm={4}
              disabled
              value={(props.values.unitValue * props.values.quantity).toFixed(
                2
              )}
            />
            {/* 
            <TextFieldFormik
              onChange={props.handleChange}
              name="saleAccount"
              label="Cta venta embri??n"
              xs={12}
              sm={6}
            />
            */}
            <TextFieldFormik
              onChange={props.handleChange}
              name="description"
              label="Descripci??n"
              xs={12}
              sm={12}
            />
          </Grid>
          <Grid
            container
            justifyContent={"flex-end"}
            style={{ gap: "0.5rem" }}
            xs={12}
          >
            {onClickCancelButton && (
              <Grid item xs={2}>
                <ButtonFormik
                  onClick={onClickCancelButton}
                  xs={2}
                  label="Cancelar"
                  type="button"
                />
              </Grid>
            )}
            <Grid item xs={2}>
              <ButtonFormik xs={2} label="Guardar" type="submit" />
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
};

MovementForm.propTypes = {
  type: PropTypes.oneOf(["create", "update"]).isRequired,
  onClickCancelButton: PropTypes.func,
  initValues: PropTypes.object,
};

export default MovementForm;
