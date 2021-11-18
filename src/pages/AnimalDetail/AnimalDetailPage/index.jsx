import { Button, Paper } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { Checkbox } from "@material-ui/core";
import { Divider } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import { CameraAlt, Edit, ViewList, Add, Visibility } from "@material-ui/icons";
import clsx from "clsx";
import { useState, useEffect } from "react";
import { useStyles } from "../styles";
import Calendar from "react-calendar";
import {
  useParams,
  useLocation,
  useHistory,
  generatePath,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AnimalActions from "../../../redux/actions/animal.actions";
import { getAge, formatDate } from "../../../helpers/convertDate";
import QRCode from "qrcode.react";
import "react-calendar/dist/Calendar.css";
import { animalDetailChipOptions } from "../constants";
import { ROUTES_DICT } from "../../../routes/routesDict";
import {
  stateOptions,
  typeServicesTest,
  unitWeightTestOptions,
  unitCapacityTestOptions,
} from "../../../constants";
import { add, differenceInDays, differenceInMonths, format } from "date-fns";

/**
 * @component
 * @description Componente, en esta seccion se encuentra la estrucura de toda la vista de detalle de animal
 * @author Emerson Puma Quispe <emerson.puma@ideascloud.io>
 */

const AnimalDetailPage = ({ children, setTitle, setChipList }) => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const [cow] = useState({
    imageSrc:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Cow_female_black_white.jpg/782px-Cow_female_black_white.jpg",
  });
  const dispatch = useDispatch();
  const params = useParams();
  const currentAnimal = useSelector((state) => state.animal.current);
  const currentAgribusiness = useSelector(
    (state) => state.agribusiness.current
  );

  const calculateLastAbortion = (values = []) => {
    for (let index = 0; index < values.length; index++) {
      if (values[index].birthType === "ABORTION") {
        return format(new Date(values[index].birthDate), "yyyy-MM-dd");
      }
    }
    return "Sin información";
  };

  // const calculatePregnancy = (values = []) => {
  //   for (let index = 0; index < values.length; index++) {
  //     if (values[index].state === "PREGNANT") {
  //       return format(new Date(values[index].pregnancyDate), "yyyy-MM-dd");
  //     }
  //   }
  //   return "Sin información";
  // };

  const calculateDaysPregnancy = (values) => {
    const result = differenceInDays(new Date(), new Date(values));
    const days = result > 1 ? " dias" : " dia";
    return result + days;
  };

  const totalMilk = (values = []) => {
    let total = 0;
    for (let index = 0; index < values.length; index++) {
      total =
        total +
        values[index].firstSample +
        values[index].secondSample +
        values[index].thirdSample;
    }
    return total + ` ${unitCapacityTestOptions[currentAgribusiness.milkUnit]} `;
  };

  const totalDaysMilk = (values = []) => {
    const result = differenceInDays(
      new Date(),
      new Date(values[values.length - 1].controlDate)
    );
    const days = result > 1 ? " dias" : " dia";
    return result + days;
  };

  const kindAnimal = () => {
    let spDay = "";
    let iDay = 0;
    switch (true) {
      case currentAnimal.gender === "FEMALE" &&
        differenceInMonths(new Date(), new Date(currentAnimal?.birthDate)) <
          currentAgribusiness.isBreeding:
        return "Cria Hembra";
      case currentAnimal.gender === "MALE" &&
        differenceInMonths(new Date(), new Date(currentAnimal?.birthDate)) <
          currentAgribusiness.isBreeding:
        return "Cria Macho";
      case currentAnimal.gender === "FEMALE" &&
        differenceInMonths(new Date(), new Date(currentAnimal?.birthDate)) >=
          currentAgribusiness.isBreeding &&
        differenceInMonths(new Date(), new Date(currentAnimal?.birthDate)) <
          currentAgribusiness.isHeifer:
        return "Hembra Levante";
      case currentAnimal.gender === "MALE" &&
        differenceInMonths(new Date(), new Date(currentAnimal?.birthDate)) >=
          currentAgribusiness.isBreeding &&
        differenceInMonths(new Date(), new Date(currentAnimal?.birthDate)) <
          currentAgribusiness.isHeifer:
        return "Macho Levante";
      case currentAnimal.gender === "FEMALE" &&
        differenceInMonths(new Date(), new Date(currentAnimal?.birthDate)) >=
          currentAgribusiness.isHeifer &&
        differenceInMonths(new Date(), new Date(currentAnimal?.birthDate)) <
          24 &&
        currentAnimal.reproductiveStatus === "EMPTY":
        return "Vaquillona Vacia";
      case currentAnimal.gender === "FEMALE" &&
        differenceInMonths(new Date(), new Date(currentAnimal?.birthDate)) >=
          currentAgribusiness.isHeifer &&
        differenceInMonths(new Date(), new Date(currentAnimal?.birthDate)) <
          24 &&
        currentAnimal.reproductiveStatus === "PREGNANT":
        iDay = differenceInDays(
          new Date(),
          new Date(currentAnimal.pregnantDate)
        );
        spDay =
          iDay === 0
            ? " dias preñez"
            : iDay === 1
            ? " dia de preñez"
            : " dias de preñez";
        return `Vaquillona Preñada, ${iDay} ${spDay}`;
      case currentAnimal.gender === "MALE" &&
        differenceInMonths(new Date(), new Date(currentAnimal?.birthDate)) >=
          currentAgribusiness.isHeifer &&
        differenceInMonths(new Date(), new Date(currentAnimal?.birthDate)) <
          24 &&
        currentAnimal.category !== "REPRODUCTOR":
        return "Novillo para Engorda";
      case currentAnimal.gender === "MALE" &&
        differenceInMonths(new Date(), new Date(currentAnimal?.birthDate)) >=
          currentAgribusiness.isHeifer &&
        differenceInMonths(new Date(), new Date(currentAnimal?.birthDate)) <
          24 &&
        currentAnimal.category === "REPRODUCTOR":
        return "Torete";
      case currentAnimal.gender === "MALE" &&
        differenceInMonths(new Date(), new Date(currentAnimal?.birthDate)) >=
          24 &&
        currentAnimal.category === "REPRODUCTOR":
        return "Toro Reproductor";
      // mayor que 24 meses
      case currentAnimal.gender === "FEMALE" &&
        differenceInMonths(new Date(), new Date(currentAnimal?.birthDate)) >=
          24 &&
        currentAnimal.births.length !== 0 &&
        !currentAnimal.isDried &&
        currentAnimal.reproductiveStatus === "EMPTY":
        iDay = differenceInDays(
          new Date(),
          new Date(currentAnimal.births[0].birthDate)
        );
        spDay =
          iDay === 0
            ? " dias abiertos"
            : iDay === 1
            ? " dia de abierto"
            : " dias de abiertos";
        return `Vaca Parida, ${iDay} ${spDay}`;
      case currentAnimal.gender === "FEMALE" &&
        differenceInMonths(new Date(), new Date(currentAnimal?.birthDate)) >=
          24 &&
        currentAnimal.births.length !== 0 &&
        !currentAnimal.isDried &&
        currentAnimal.reproductiveStatus === "PREGNANT":
        iDay = differenceInDays(
          new Date(),
          new Date(currentAnimal.pregnantDate)
        );
        spDay =
          iDay === 0
            ? " dias de preñez"
            : iDay === 1
            ? " dia de preñez"
            : " dias de preñez";
        return `Vaca Preñada, ${iDay} ${spDay}`;
      case currentAnimal.gender === "FEMALE" &&
        differenceInMonths(new Date(), new Date(currentAnimal?.birthDate)) >=
          24 &&
        currentAnimal.births.length !== 0 &&
        currentAnimal.isDried &&
        currentAnimal.reproductiveStatus === "EMPTY":
        iDay = differenceInDays(
          new Date(),
          new Date(currentAnimal.births[0].birthDate)
        );
        spDay =
          iDay === 0
            ? " dias abiertos"
            : iDay === 1
            ? " dia de abierto"
            : " dias de abiertos";
        return `Vaca Seca, ${iDay} ${spDay}`;
      case currentAnimal.gender === "FEMALE" &&
        differenceInMonths(new Date(), new Date(currentAnimal?.birthDate)) >=
          24 &&
        currentAnimal.births.length !== 0 &&
        currentAnimal.isDried &&
        currentAnimal.reproductiveStatus === "PREGNANT":
        iDay = differenceInDays(
          new Date(),
          new Date(currentAnimal.pregnantDate)
        );
        spDay =
          iDay === 0
            ? " dias de preñez"
            : iDay === 1
            ? " dia de preñez"
            : " dias de preñez";
        return `Vaca Seca,  ${iDay} ${spDay}`;
      case currentAnimal.gender === "FEMALE" &&
        differenceInMonths(new Date(), new Date(currentAnimal?.birthDate)) >=
          24 &&
        currentAnimal.lastBirthDate &&
        !currentAnimal.isDried &&
        currentAnimal.reproductiveStatus === "EMPTY":
        iDay = differenceInDays(
          new Date(),
          new Date(currentAnimal.lastBirthDate)
        );
        spDay =
          iDay === 0
            ? " dias abiertos"
            : iDay === 1
            ? " dia de abierto"
            : " dias de abiertos";
        return `Vaca Parida, ${iDay} ${spDay}`;
      case currentAnimal.gender === "FEMALE" &&
        differenceInMonths(new Date(), new Date(currentAnimal?.birthDate)) >=
          24 &&
        currentAnimal.lastBirthDate &&
        !currentAnimal.isDried &&
        currentAnimal.reproductiveStatus === "PREGNANT":
        iDay = differenceInDays(
          new Date(),
          new Date(currentAnimal.pregnantDate)
        );
        spDay =
          iDay === 0
            ? " dias de preñez"
            : iDay === 1
            ? " dia de preñez"
            : " dias de preñez";
        return `Vaca Preñada, ${iDay} ${spDay}`;
      case currentAnimal.gender === "FEMALE" &&
        differenceInMonths(new Date(), new Date(currentAnimal?.birthDate)) >=
          24 &&
        currentAnimal.lastBirthDate &&
        currentAnimal.isDried &&
        currentAnimal.reproductiveStatus === "EMPTY":
        iDay = differenceInDays(
          new Date(),
          new Date(currentAnimal.lastBirthDate)
        );
        spDay =
          iDay === 0
            ? " dias abiertos"
            : iDay === 1
            ? " dia abierto"
            : " dias abiertos";
        return `Vaca Seca, ${iDay} ${spDay}`;
      case currentAnimal.gender === "FEMALE" &&
        differenceInMonths(new Date(), new Date(currentAnimal?.birthDate)) >=
          24 &&
        currentAnimal.lastBirthDate &&
        currentAnimal.isDried &&
        currentAnimal.reproductiveStatus === "PREGNANT":
        iDay = differenceInDays(
          new Date(),
          new Date(currentAnimal.pregnantDate)
        );
        spDay =
          iDay === 0
            ? " dias de preñez"
            : iDay === 1
            ? " dia de preñez"
            : " dias de preñez";
        return `Vaca Seca,  ${iDay} ${spDay}`;
      default:
        return "Indeterminado";
    }
  };

  const expectedBirth = (values) => {
    const result = add(new Date(values), {
      years: 0,
      months: 0,
      weeks: 0,
      days: 285,
      hours: 0,
      minutes: 0,
      seconds: 0,
    });
    return format(new Date(result), "yyyy-MM-dd");
  };

  const calculateIEP = (values = []) => {
    if (values.length > 1) {
      const result = differenceInDays(
        new Date(values[0].birthDate),
        new Date(values[1].birthDate)
      );
      return result + " dias";
    } else {
      return "Sin información";
    }
  };

  // const calculateIEC = (values = []) => {
  //   if (values.length > 1) {
  //     const result = differenceInDays(
  //       new Date(values[0].controlDate),
  //       new Date(values[1].controlDate)
  //     );
  //     return result + " dias";
  //   } else {
  //     return "Sin información";
  //   }
  // };

  useEffect(() => {
    setChipList(animalDetailChipOptions(location, params));
    if (!currentAnimal || currentAnimal._id !== params._id) {
      dispatch(AnimalActions.get({ _id: params._id }));
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, currentAnimal, params._id]);

  return (
    <Grid container xs={12}>
      {currentAnimal && currentAnimal._id && currentAnimal._id === params._id && (
        <Grid>
          <Grid item container xs={12}>
            <Grid item xs={12} lg={9}>
              <Grid container xs={12}>
                <Grid item xs={12} lg={4}>
                  {/* General Info Card */}
                  <Paper elevation={4} className={classes.card}>
                    <div className={classes.cardHeader}>
                      <Typography variant="body1" className={classes.cardTitle}>
                        Datos generales
                      </Typography>
                      <IconButton
                        className={classes.cardEditIcon}
                        size="small"
                        onClick={() => {
                          history.push(
                            generatePath(
                              ROUTES_DICT.animalDetail.general.update,
                              {
                                ...params,
                                _id: params._id,
                              }
                            )
                          );
                        }}
                      >
                        <Edit fontSize="small"></Edit>
                      </IconButton>
                    </div>
                    <Divider></Divider>
                    <div className="">
                      <div className={classes.image}>
                        <div className={clsx(classes.cowImageEditButton)}>
                          <IconButton
                            className={clsx(
                              classes.cardEditIcon,
                              classes.cardEditButtonCow
                            )}
                            onClick={() => {
                              history.push(
                                generatePath(
                                  ROUTES_DICT.animalDetail.image.upload,
                                  {
                                    ...params,
                                    _id: params._id,
                                  }
                                )
                              );
                            }}
                            size="small"
                          >
                            <CameraAlt fontSize="small"></CameraAlt>
                          </IconButton>
                        </div>
                        <img
                          src={
                            currentAnimal && currentAnimal.imageURL
                              ? currentAnimal.imageURL
                              : cow.imageSrc
                          }
                          className={classes.cowImage}
                          alt=""
                          srcset=""
                        />
                        <div className={clsx(classes.cowImageQrButton)}>
                          <QRCode
                            renderAs="svg"
                            value={window.location.href}
                            className={classes.qrImage}
                            includeMargin={true}
                            onClick={() => {
                              history.push(
                                generatePath(ROUTES_DICT.animalDetail.qr.view, {
                                  ...params,
                                  _id: params._id,
                                })
                              );
                            }}
                          />
                        </div>
                      </div>
                      <Typography
                        variant="h4"
                        className={clsx(
                          classes.textCenter,
                          classes.cowCodeTitle
                        )}
                      >
                        {currentAnimal && currentAnimal.identifier}
                      </Typography>
                      <Grid
                        container
                        className={classes.generalFeature}
                        xs={12}
                      >
                        <Grid item xs={4}>
                          <Typography className={classes.cardFeature}>
                            Nombre
                          </Typography>
                        </Grid>
                        <Grid item xs={8}>
                          <Typography>
                            {currentAnimal && currentAnimal.name}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        className={classes.generalFeature}
                        xs={12}
                      >
                        <Grid item xs={4}>
                          <Typography className={classes.cardFeature}>
                            Sexo
                          </Typography>
                        </Grid>
                        <Grid item xs={8}>
                          <Typography>
                            {currentAnimal && currentAnimal.gender === "FEMALE"
                              ? "Hembra"
                              : "Macho"}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        className={classes.generalFeature}
                        xs={12}
                      >
                        <Grid item xs={4}>
                          <Typography className={classes.cardFeature}>
                            Edad
                          </Typography>
                        </Grid>
                        <Grid item xs={8}>
                          <Typography>
                            {currentAnimal &&
                              getAge(
                                new Date(currentAnimal.birthDate),
                                new Date()
                              )}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        className={classes.generalFeature}
                        xs={12}
                      >
                        <Grid item xs={4}>
                          <Typography className={classes.cardFeature}>
                            Clase
                          </Typography>
                        </Grid>
                        <Grid item xs={8}>
                          <Typography>
                            {currentAnimal && kindAnimal()}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        className={classes.generalFeature}
                        xs={12}
                      >
                        <Grid item xs={4}>
                          <Typography className={classes.cardFeature}>
                            {currentAnimal && currentAnimal.gender === "FEMALE"
                              ? "Estado"
                              : "Categoria"}
                          </Typography>
                        </Grid>
                        <Grid item xs={8}>
                          {currentAnimal && (
                            <Typography>
                              {currentAnimal.gender === "MALE"
                                ? currentAnimal.category
                                : currentAnimal.gender === "FEMALE" &&
                                  currentAnimal.reproductiveStatus &&
                                  currentAnimal.reproductiveStatus !== ""
                                ? stateOptions[currentAnimal.reproductiveStatus]
                                : "Sin información"}
                            </Typography>
                          )}
                          {/* <Typography>Vaca seca, 276 dias de preñez</Typography> */}
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        className={classes.generalFeature}
                        xs={12}
                      >
                        <Grid item xs={4}>
                          <Typography className={classes.cardFeature}>
                            Concebido por
                          </Typography>
                        </Grid>
                        <Grid item xs={8}>
                          {currentAnimal && currentAnimal.bornBy ? (
                            <Typography>
                              {typeServicesTest[currentAnimal.bornBy]}
                            </Typography>
                          ) : (
                            <Typography>Sin información</Typography>
                          )}
                          {/* <Typography>Vaca seca, 276 dias de preñez</Typography> */}
                        </Grid>
                      </Grid>
                      <div className={classes.borderLinearProgress}>
                        {/* {currentAnimal && currentAnimal.gender === "FEMALE" && (
                          <BorderLinearProgress
                            variant="determinate"
                            value="50"
                            about="asd"
                          ></BorderLinearProgress>
                        )} */}
                      </div>
                      <div className={classes.cardHeader}>
                        <Typography
                          variant="body1"
                          className={classes.cardTitle}
                        >
                          Nacimiento
                        </Typography>
                      </div>
                      <Divider className={classes.divider}></Divider>
                      <Grid
                        container
                        className={classes.generalFeature}
                        xs={12}
                      >
                        <Grid item xs={4}>
                          <Typography className={classes.cardFeature}>
                            Fecha de nacimiento
                          </Typography>
                        </Grid>
                        <Grid item xs={8}>
                          <Typography>
                            {currentAnimal &&
                              currentAnimal.birthDate &&
                              formatDate(new Date(currentAnimal.birthDate))}
                            {/* {animals && animals.birthDate} */}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        className={classes.generalFeature}
                        xs={12}
                      >
                        <Grid item xs={4}>
                          <Typography className={classes.cardFeature}>
                            Entrada hato
                          </Typography>
                        </Grid>
                        <Grid item xs={8}>
                          <Typography>
                            {currentAnimal &&
                              currentAnimal.herdDate &&
                              format(
                                new Date(currentAnimal.herdDate),
                                "yyyy-MM-dd"
                              )}
                            {/* {animals && animals.herdDate} */}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        className={classes.generalFeature}
                        xs={12}
                      >
                        <Grid item xs={4}>
                          <Typography className={classes.cardFeature}>
                            Nro. Registro
                          </Typography>
                        </Grid>
                        <Grid item xs={8}>
                          <Typography>
                            {currentAnimal &&
                            currentAnimal.registerNumber &&
                            currentAnimal.registerNumber !== ""
                              ? currentAnimal.registerNumber
                              : "Sin información"}
                          </Typography>
                        </Grid>
                      </Grid>
                    </div>
                  </Paper>
                </Grid>
                <Grid item xs={12} lg={8}>
                  <Grid container style={{ height: "100%" }} xs={12}>
                    <Grid
                      item
                      xs={12}
                      lg={
                        currentAnimal && currentAnimal.gender === "FEMALE"
                          ? 6
                          : 12
                      }
                    >
                      {/* Race card */}
                      <Paper
                        style={{ height: "96%" }}
                        elevation={4}
                        className={classes.card}
                      >
                        <div className={classes.cardHeader}>
                          <Typography
                            variant="body1"
                            className={classes.cardTitle}
                          >
                            Raza
                          </Typography>
                          <IconButton
                            className={classes.cardEditIcon}
                            size="small"
                            onClick={() => {
                              history.push(
                                generatePath(
                                  ROUTES_DICT.animalDetail.race.update,
                                  {
                                    ...params,
                                    _id: params._id,
                                  }
                                )
                              );
                            }}
                          >
                            <Edit fontSize="small"></Edit>
                          </IconButton>
                        </div>
                        <Divider className={classes.divider}></Divider>
                        <div className="">
                          <Grid
                            container
                            className={classes.generalFeature}
                            xs={12}
                          >
                            {currentAnimal &&
                              currentAnimal.fatherId !== null &&
                              currentAnimal.fatherId !== "" && (
                                <>
                                  <Grid item xs={5}>
                                    <Typography className={classes.cardFeature}>
                                      Padre
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={7}>
                                    <Typography>
                                      {currentAnimal && currentAnimal.father
                                        ? currentAnimal.father.identifier
                                        : "Sin información"}
                                      <IconButton
                                        className={classes.cardEditIcon}
                                        style={{ marginLeft: "1rem" }}
                                        size="small"
                                        onClick={() => {
                                          history.push(
                                            generatePath(
                                              ROUTES_DICT.animalDetail.detail,
                                              {
                                                ...params,
                                                _id: currentAnimal.fatherId,
                                              }
                                            )
                                          );
                                        }}
                                      >
                                        <Visibility fontSize="small"></Visibility>
                                      </IconButton>
                                    </Typography>
                                  </Grid>
                                </>
                              )}
                            {currentAnimal && currentAnimal.fatherId === null && (
                              <>
                                <Grid item xs={5}>
                                  <Typography className={classes.cardFeature}>
                                    {currentAnimal.fatherRef &&
                                    currentAnimal.fatherRef !== ""
                                      ? "Ref. Padre"
                                      : "Padre"}
                                  </Typography>
                                </Grid>
                                <Grid item xs={7}>
                                  <Typography>
                                    {currentAnimal.fatherRef &&
                                    currentAnimal.fatherRef !== ""
                                      ? currentAnimal.fatherRef
                                      : "Sin información"}
                                  </Typography>
                                </Grid>
                              </>
                            )}
                          </Grid>
                          <Grid
                            container
                            className={classes.generalFeature}
                            xs={12}
                          >
                            {currentAnimal &&
                              currentAnimal.motherId !== null &&
                              currentAnimal.motherId !== "" && (
                                <>
                                  <Grid item xs={5}>
                                    <Typography className={classes.cardFeature}>
                                      Madre
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={7}>
                                    <Typography>
                                      {currentAnimal && currentAnimal.mother
                                        ? currentAnimal.mother.identifier
                                        : "Sin información"}
                                      <IconButton
                                        className={classes.cardEditIcon}
                                        style={{ marginLeft: "1rem" }}
                                        size="small"
                                        onClick={() => {
                                          history.push(
                                            generatePath(
                                              ROUTES_DICT.animalDetail.detail,
                                              {
                                                ...params,
                                                _id: currentAnimal.motherId,
                                              }
                                            )
                                          );
                                        }}
                                      >
                                        <Visibility fontSize="small"></Visibility>
                                      </IconButton>
                                    </Typography>
                                  </Grid>
                                </>
                              )}
                            {currentAnimal && currentAnimal.motherId === null && (
                              <>
                                <Grid item xs={5}>
                                  <Typography className={classes.cardFeature}>
                                    {currentAnimal.motherRef &&
                                    currentAnimal.motherRef !== ""
                                      ? "Ref. Madre"
                                      : "Madre"}
                                  </Typography>
                                </Grid>
                                <Grid item xs={7}>
                                  <Typography>
                                    {currentAnimal.motherRef &&
                                    currentAnimal.motherRef !== ""
                                      ? currentAnimal.motherRef
                                      : "Sin información"}
                                  </Typography>
                                </Grid>
                              </>
                            )}
                          </Grid>
                          <Grid
                            container
                            className={classes.generalFeature}
                            xs={12}
                          >
                            <Grid item xs={5}>
                              <Typography className={classes.cardFeature}>
                                Raza{" "}
                                {currentAnimal &&
                                currentAnimal.percentageRace1 !== 100
                                  ? "1"
                                  : ""}
                              </Typography>
                            </Grid>
                            <Grid item xs={7}>
                              {currentAnimal && currentAnimal.race1 ? (
                                <>
                                  {currentAnimal && currentAnimal.race1 && (
                                    <Typography>
                                      {currentAnimal &&
                                        currentAnimal.race1 &&
                                        currentAnimal.race1.name}{" "}
                                      -{" "}
                                      {currentAnimal &&
                                        currentAnimal.percentageRace1 &&
                                        currentAnimal.percentageRace1}
                                      %
                                    </Typography>
                                  )}
                                </>
                              ) : (
                                <Typography>No especificado</Typography>
                              )}
                            </Grid>
                          </Grid>
                          {currentAnimal &&
                            currentAnimal.race2Id &&
                            currentAnimal.race2Id !== "" &&
                            currentAnimal.race2 &&
                            currentAnimal.percentageRace2 !== 0 && (
                              <Grid
                                container
                                className={classes.generalFeature}
                                xs={12}
                              >
                                <Grid item xs={5}>
                                  <Typography className={classes.cardFeature}>
                                    Raza2
                                  </Typography>
                                </Grid>
                                <Grid item xs={7}>
                                  <Typography>
                                    {currentAnimal &&
                                      currentAnimal.race2 &&
                                      currentAnimal.race2.name}{" "}
                                    -{" "}
                                    {currentAnimal &&
                                      currentAnimal.percentageRace2 &&
                                      currentAnimal.percentageRace2}
                                    %
                                  </Typography>
                                </Grid>
                              </Grid>
                            )}
                          {currentAnimal &&
                            currentAnimal.race3Id &&
                            currentAnimal.race3Id !== "" &&
                            currentAnimal.race3 &&
                            currentAnimal.percentageRace3 !== 0 && (
                              <Grid
                                container
                                className={classes.generalFeature}
                                xs={12}
                              >
                                <Grid item xs={5}>
                                  <Typography className={classes.cardFeature}>
                                    Raza3
                                  </Typography>
                                </Grid>
                                <Grid item xs={7}>
                                  <Typography>
                                    {currentAnimal &&
                                      currentAnimal.race3 &&
                                      currentAnimal.race3.name}{" "}
                                    -{" "}
                                    {currentAnimal &&
                                      currentAnimal.percentageRace3 &&
                                      currentAnimal.percentageRace3}
                                    %
                                  </Typography>
                                </Grid>
                              </Grid>
                            )}
                          {currentAnimal &&
                            currentAnimal.race4Id &&
                            currentAnimal.race4Id !== "" &&
                            currentAnimal.race4 &&
                            currentAnimal.percentageRace4 !== 0 && (
                              <Grid
                                container
                                className={classes.generalFeature}
                                xs={12}
                              >
                                <Grid item xs={5}>
                                  <Typography className={classes.cardFeature}>
                                    Raza4
                                  </Typography>
                                </Grid>
                                <Grid item xs={7}>
                                  <Typography>
                                    {currentAnimal &&
                                      currentAnimal.race4 &&
                                      currentAnimal.race4.name}{" "}
                                    -{" "}
                                    {currentAnimal &&
                                      currentAnimal.percentageRace4 &&
                                      currentAnimal.percentageRace4}
                                    %
                                  </Typography>
                                </Grid>
                              </Grid>
                            )}
                          <Grid
                            container
                            className={classes.generalFeature}
                            xs={12}
                          >
                            <Grid item xs={5}>
                              <Typography className={classes.cardFeature}>
                                Color
                              </Typography>
                            </Grid>
                            <Grid item xs={7}>
                              <Typography>
                                {currentAnimal && currentAnimal.color !== ""
                                  ? currentAnimal.color
                                  : "No especificado"}
                              </Typography>
                            </Grid>
                          </Grid>
                        </div>
                      </Paper>
                    </Grid>
                    {currentAnimal && currentAnimal.gender === "FEMALE" && (
                      <>
                        <Grid item xs={12} lg={6}>
                          {/* Parts Card */}
                          <Paper
                            style={{ height: "96%" }}
                            elevation={4}
                            className={classes.card}
                          >
                            <div className={classes.cardHeader}>
                              <Typography
                                variant="body1"
                                className={classes.cardTitle}
                              >
                                Partos
                              </Typography>
                              <div>
                                {currentAnimal &&
                                  currentAnimal.births &&
                                  currentAnimal.births.length !== 0 && (
                                    <IconButton
                                      className={classes.cardEditIcon}
                                      size="small"
                                      style={{ marginRight: "0.5rem" }}
                                      onClick={() => {
                                        history.push(
                                          generatePath(
                                            ROUTES_DICT.animalDetail.birth.list,
                                            {
                                              ...params,
                                              _id: params._id,
                                            }
                                          )
                                        );
                                      }}
                                    >
                                      <ViewList fontSize="small"></ViewList>
                                    </IconButton>
                                  )}
                                {currentAnimal &&
                                  currentAnimal.reproductiveStatus &&
                                  currentAnimal.reproductiveStatus ===
                                    "PREGNANT" && (
                                    <IconButton
                                      className={classes.cardEditIcon}
                                      size="small"
                                      onClick={() => {
                                        history.push(
                                          generatePath(
                                            ROUTES_DICT.animalDetail.birth
                                              .create,
                                            {
                                              ...params,
                                              _id: params._id,
                                            }
                                          )
                                        );
                                      }}
                                    >
                                      <Add fontSize="small"></Add>
                                    </IconButton>
                                  )}
                              </div>
                            </div>
                            <Divider></Divider>
                            <a className={clsx(classes.link)} href="/#">
                              Grafica Reproductiva
                            </a>
                            <div className="">
                              <Grid
                                container
                                className={classes.generalFeature}
                                xs={12}
                              >
                                <Grid item xs={5}>
                                  <Typography className={classes.cardFeature}>
                                    Nro. de partos
                                  </Typography>
                                </Grid>
                                <Grid item xs={7}>
                                  <Typography>
                                    {currentAnimal &&
                                    currentAnimal.births &&
                                    currentAnimal.births.length !== 0
                                      ? currentAnimal.birthsQuantity
                                        ? currentAnimal.births.length +
                                          currentAnimal.birthsQuantity
                                        : currentAnimal.births.length
                                      : currentAnimal.birthsQuantity
                                      ? currentAnimal.birthsQuantity
                                      : "Sin informacíon"}
                                  </Typography>
                                </Grid>
                              </Grid>
                              <Grid
                                container
                                className={classes.generalFeature}
                                xs={12}
                              >
                                <Grid item xs={5}>
                                  <Typography className={classes.cardFeature}>
                                    Ultimo parto
                                  </Typography>
                                </Grid>
                                <Grid item xs={7}>
                                  <Typography>
                                    {currentAnimal &&
                                    currentAnimal.lastBirthDate
                                      ? format(
                                          new Date(currentAnimal.lastBirthDate),
                                          "yyyy-MM-dd"
                                        )
                                      : currentAnimal.births &&
                                        currentAnimal.births.length !== 0
                                      ? format(
                                          new Date(
                                            currentAnimal.births[0].birthDate
                                          ),
                                          "yyyy-MM-dd"
                                        )
                                      : "Sin información"}
                                  </Typography>
                                </Grid>
                              </Grid>
                              <Grid
                                container
                                className={classes.generalFeature}
                                xs={12}
                              >
                                <Grid item xs={5}>
                                  <Typography className={classes.cardFeature}>
                                    IEP
                                  </Typography>
                                </Grid>
                                <Grid item xs={7}>
                                  {currentAnimal && currentAnimal.births && (
                                    <Typography>
                                      {calculateIEP(currentAnimal.births)}
                                    </Typography>
                                  )}
                                </Grid>
                              </Grid>
                              {/* <Grid
                            container
                            className={classes.generalFeature}
                            xs={12}
                          >
                            <Grid item xs={5}>
                              <Typography className={classes.cardFeature}>
                                IEP u
                              </Typography>
                            </Grid>
                            <Grid item xs={7}>
                              <Typography>No especificado</Typography>
                            </Grid>
                          </Grid> */}
                              <Grid
                                container
                                className={classes.generalFeature}
                                xs={12}
                              >
                                <Grid item xs={5}>
                                  <Typography className={classes.cardFeature}>
                                    Ult. aborto
                                  </Typography>
                                </Grid>
                                <Grid item xs={7}>
                                  {currentAnimal && currentAnimal.births && (
                                    <Typography>
                                      {calculateLastAbortion(
                                        currentAnimal.births
                                      )}
                                    </Typography>
                                  )}
                                </Grid>
                              </Grid>
                            </div>
                          </Paper>
                        </Grid>
                        <Grid item xs={12} lg={6}>
                          {/* Servicios*/}
                          <Paper
                            style={{ height: "96%" }}
                            elevation={4}
                            className={classes.card}
                          >
                            <div className={classes.cardHeader}>
                              <Typography
                                variant="body1"
                                className={classes.cardTitle}
                              >
                                Servicios
                              </Typography>
                              <div>
                                <IconButton
                                  className={classes.cardEditIcon}
                                  size="small"
                                  style={{ marginRight: "0.5rem" }}
                                  onClick={() => {
                                    history.push(
                                      generatePath(
                                        ROUTES_DICT.animalDetail.service.list,
                                        {
                                          ...params,
                                          _id: params._id,
                                        }
                                      )
                                    );
                                  }}
                                >
                                  <ViewList fontSize="small"></ViewList>
                                </IconButton>
                                {currentAgribusiness &&
                                  currentAgribusiness.reproductiveManagement ===
                                    "DM_&_AI_&_ET" && (
                                    <Button
                                      className={classes.cardEditIcon}
                                      size="small"
                                      style={{ marginRight: "0.5rem" }}
                                      onClick={() => {
                                        history.push(
                                          generatePath(
                                            ROUTES_DICT.animalDetail.service
                                              .transfer.create,
                                            {
                                              ...params,
                                              _id: params._id,
                                            }
                                          )
                                        );
                                      }}
                                    >
                                      <Add fontSize="small"></Add>T.E
                                      {/* <Typography
                                  variant="caption"
                                  className={classes.cardTitle}
                                >
                                  Trans.E
                                </Typography> */}
                                    </Button>
                                  )}
                                <Button
                                  className={classes.cardEditIcon}
                                  size="small"
                                  onClick={() => {
                                    history.push(
                                      generatePath(
                                        ROUTES_DICT.animalDetail.service.ia
                                          .create,
                                        {
                                          ...params,
                                          _id: params._id,
                                        }
                                      )
                                    );
                                  }}
                                >
                                  <Add fontSize="small"></Add>I.A
                                  {/* <Typography
                                    variant="caption"
                                    className={classes.cardTitle}
                                  >
                                    I.A
                                  </Typography> */}
                                </Button>
                              </div>
                            </div>
                            <Divider className={classes.divider}></Divider>
                            <Grid container className="">
                              <Grid item xs={12}>
                                <Grid
                                  container
                                  className={classes.generalFeature}
                                  xs={12}
                                >
                                  <Grid item xs={5}>
                                    <Typography className={classes.cardFeature}>
                                      Últ. Servicio
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={7}>
                                    <Typography>
                                      {currentAnimal &&
                                      currentAnimal.services &&
                                      currentAnimal.services.length !== 0
                                        ? format(
                                            new Date(
                                              currentAnimal.services[0].serviceDate
                                            ),
                                            "yyyy-MM-dd"
                                          )
                                        : "Sin información"}
                                    </Typography>
                                  </Grid>
                                </Grid>
                                <Grid
                                  container
                                  className={classes.generalFeature}
                                  xs={12}
                                >
                                  <Grid item xs={5}>
                                    <Typography className={classes.cardFeature}>
                                      Hora
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={7}>
                                    <Typography>
                                      {currentAnimal &&
                                      currentAnimal.services &&
                                      currentAnimal.services.length !== 0
                                        ? currentAnimal.services[0].serviceTime
                                          ? format(
                                              new Date(
                                                currentAnimal.services[0].serviceTime
                                              ),
                                              "ppp"
                                            )
                                          : "Sin información"
                                        : "Sin información"}
                                    </Typography>
                                  </Grid>
                                </Grid>
                                <Grid
                                  container
                                  className={classes.generalFeature}
                                  xs={12}
                                >
                                  <Grid item xs={5}>
                                    <Typography className={classes.cardFeature}>
                                      Tipo de servicio
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={7}>
                                    <Typography>
                                      {currentAnimal &&
                                      currentAnimal.services &&
                                      currentAnimal.services.length !== 0
                                        ? typeServicesTest[
                                            currentAnimal.services[0]
                                              .serviceType
                                          ]
                                        : "Sin información"}
                                    </Typography>
                                  </Grid>
                                </Grid>
                                <Grid
                                  container
                                  className={classes.generalFeature}
                                  xs={12}
                                >
                                  <Grid item xs={5}>
                                    <Typography className={classes.cardFeature}>
                                      Observaciones
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={7}>
                                    <Typography>
                                      {currentAnimal &&
                                      currentAnimal.services &&
                                      currentAnimal.services.length !== 0
                                        ? currentAnimal.services[0].observation
                                        : "Sin información"}
                                    </Typography>
                                  </Grid>
                                </Grid>
                              </Grid>
                              {/* <Grid item xs={6}>
                            <HighchartsReact
                              highcharts={Highcharts}
                              options={{
                                chart: {
                                  type: "scatter",
                                  margin: [70, 50, 60, 80],
                                  events: {
                                    click: function (e) {
                                      // find the clicked values and the series
                                      var x = Math.round(e.xAxis[0].value),
                                        y = Math.round(e.yAxis[0].value),
                                        series = this.series[0];

                                      // Add it
                                      series.addPoint([x, y]);
                                    },
                                  },
                                },
                                title: {
                                  text: "",
                                },

                                accessibility: {
                                  announceNewData: {
                                    enabled: true,
                                  },
                                },
                                xAxis: {
                                  gridLineWidth: 1,
                                  minPadding: 0.2,
                                  maxPadding: 0.2,
                                  maxZoom: 20,
                                },
                                yAxis: {
                                  title: {
                                    text: "Value",
                                  },
                                  minPadding: 0.2,
                                  maxPadding: 0.2,
                                  maxZoom: 20,
                                  plotLines: [
                                    {
                                      value: 0,
                                      width: 1,
                                      color: "#808080",
                                    },
                                  ],
                                },
                                legend: {
                                  enabled: false,
                                },
                                exporting: {
                                  enabled: false,
                                },
                                plotOptions: {
                                  series: {
                                    lineWidth: 1,
                                    point: {
                                      events: {
                                        click: function () {
                                          if (this.series.data.length > 1) {
                                            this.remove();
                                          }
                                        },
                                      },
                                    },
                                  },
                                },
                                series: [
                                  {
                                    data: [
                                      [20, 20],
                                      [105, 40],
                                    ],
                                  },
                                ],
                              }}
                            />
                          </Grid> */}
                            </Grid>
                          </Paper>
                        </Grid>
                        <Grid item xs={12} lg={6}>
                          {/* Palpacion*/}
                          <Paper
                            style={{ height: "96%" }}
                            elevation={4}
                            className={classes.card}
                          >
                            <div className={classes.cardHeader}>
                              <Typography
                                variant="body1"
                                className={classes.cardTitle}
                              >
                                Palpación
                              </Typography>
                              <div>
                                <IconButton
                                  className={classes.cardEditIcon}
                                  size="small"
                                  style={{ marginRight: "0.5rem" }}
                                  onClick={() => {
                                    history.push(
                                      generatePath(
                                        ROUTES_DICT.animalDetail.palpation.list,
                                        {
                                          ...params,
                                          _id: params._id,
                                        }
                                      )
                                    );
                                  }}
                                >
                                  <ViewList fontSize="small"></ViewList>
                                </IconButton>
                                <IconButton
                                  className={classes.cardEditIcon}
                                  size="small"
                                  onClick={() => {
                                    history.push(
                                      generatePath(
                                        ROUTES_DICT.animalDetail.palpation
                                          .create,
                                        {
                                          ...params,
                                          _id: params._id,
                                        }
                                      )
                                    );
                                  }}
                                >
                                  <Add fontSize="small"></Add>
                                </IconButton>
                              </div>
                            </div>
                            <Divider className={classes.divider}></Divider>
                            <Grid container className="">
                              <Grid item xs={12}>
                                <Grid
                                  container
                                  className={classes.generalFeature}
                                  xs={12}
                                >
                                  <Grid item xs={5}>
                                    <Typography className={classes.cardFeature}>
                                      Últ. Celo
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={7}>
                                    <Typography>
                                      {currentAnimal &&
                                      currentAnimal.zealControl &&
                                      currentAnimal.zealControl.length !== 0
                                        ? format(
                                            new Date(
                                              currentAnimal.zealControl[0].controlDate
                                            ),
                                            "yyyy-MM-dd"
                                          )
                                        : "Sin información"}
                                    </Typography>
                                  </Grid>
                                </Grid>
                                {/* <Grid
                                  container
                                  className={classes.generalFeature}
                                  xs={12}
                                >
                                  <Grid item xs={5}>
                                    <Typography className={classes.cardFeature}>
                                      I.E.C
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={7}>
                                    <Typography>0</Typography>
                                  </Grid>
                                </Grid> */}
                                <Grid
                                  container
                                  className={classes.generalFeature}
                                  xs={12}
                                >
                                  <Grid item xs={5}>
                                    <Typography className={classes.cardFeature}>
                                      Últ. palpación
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={7}>
                                    <Typography>
                                      {currentAnimal &&
                                      currentAnimal.palpations &&
                                      currentAnimal.palpations.length !== 0
                                        ? format(
                                            new Date(
                                              currentAnimal.palpations[0].pregnancyDate
                                            ),
                                            "yyyy-MM-dd"
                                          )
                                        : "Sin información"}
                                    </Typography>
                                  </Grid>
                                </Grid>

                                <Grid
                                  container
                                  className={classes.generalFeature}
                                  xs={12}
                                >
                                  <Grid item xs={5}>
                                    <Typography className={classes.cardFeature}>
                                      Estado de palpación
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={7}>
                                    <Typography>
                                      {currentAnimal &&
                                      currentAnimal.palpations &&
                                      currentAnimal.palpations.length !== 0
                                        ? stateOptions[
                                            currentAnimal.palpations[0].state
                                          ]
                                        : "Sin información"}
                                    </Typography>
                                  </Grid>
                                </Grid>
                                <Grid
                                  container
                                  className={classes.generalFeature}
                                  xs={12}
                                >
                                  <Grid item xs={5}>
                                    <Typography className={classes.cardFeature}>
                                      Observaciones de palpación
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={7}>
                                    <Typography>
                                      {currentAnimal &&
                                      currentAnimal.palpations &&
                                      currentAnimal.palpations.length !== 0
                                        ? currentAnimal.palpations[0]
                                            .observation !== ""
                                          ? currentAnimal.palpations[0]
                                              .observation !== ""
                                          : "Sin información"
                                        : "Sin información"}
                                    </Typography>
                                  </Grid>
                                </Grid>
                                {currentAnimal &&
                                  currentAnimal.reproductiveStatus ===
                                    "PREGNANT" && (
                                    <>
                                      <Grid
                                        container
                                        className={classes.generalFeature}
                                        style={{ marginTop: "20px" }}
                                        xs={12}
                                      >
                                        <Grid item xs={5}>
                                          <Typography
                                            className={classes.cardFeature}
                                          >
                                            Fecha Preñez
                                          </Typography>
                                        </Grid>
                                        <Grid item xs={7}>
                                          <Typography>
                                            {currentAnimal.palpations &&
                                            currentAnimal.palpations.length !==
                                              0
                                              ? format(
                                                  new Date(
                                                    currentAnimal.palpations[0].pregnancyDate
                                                  ),
                                                  "yyyy-MM-dd"
                                                )
                                              : currentAnimal.pregnantDate
                                              ? format(
                                                  new Date(
                                                    currentAnimal.pregnantDate
                                                  ),
                                                  "yyyy-MM-dd"
                                                )
                                              : "Sin información"}
                                          </Typography>
                                        </Grid>
                                      </Grid>
                                      <Grid
                                        container
                                        className={classes.generalFeature}
                                        xs={12}
                                      >
                                        <Grid item xs={5}>
                                          <Typography
                                            className={classes.cardFeature}
                                          >
                                            Días de preñez
                                          </Typography>
                                        </Grid>
                                        <Grid item xs={7}>
                                          <Typography>
                                            {calculateDaysPregnancy(
                                              currentAnimal.pregnantDate
                                            )}
                                          </Typography>
                                        </Grid>
                                      </Grid>
                                      <Grid
                                        container
                                        className={classes.generalFeature}
                                        xs={12}
                                      >
                                        <Grid item xs={5}>
                                          <Typography
                                            className={classes.cardFeature}
                                          >
                                            Parto esperado
                                          </Typography>
                                        </Grid>
                                        <Grid item xs={7}>
                                          <Typography>
                                            {expectedBirth(
                                              currentAnimal.pregnantDate
                                            )}
                                          </Typography>
                                        </Grid>
                                      </Grid>
                                    </>
                                  )}
                              </Grid>
                              {/* <Grid item xs={6}>
                            <HighchartsReact
                              highcharts={Highcharts}
                              options={{
                                chart: {
                                  type: "scatter",
                                  margin: [70, 50, 60, 80],
                                  events: {
                                    click: function (e) {
                                      // find the clicked values and the series
                                      var x = Math.round(e.xAxis[0].value),
                                        y = Math.round(e.yAxis[0].value),
                                        series = this.series[0];

                                      // Add it
                                      series.addPoint([x, y]);
                                    },
                                  },
                                },
                                title: {
                                  text: "",
                                },

                                accessibility: {
                                  announceNewData: {
                                    enabled: true,
                                  },
                                },
                                xAxis: {
                                  gridLineWidth: 1,
                                  minPadding: 0.2,
                                  maxPadding: 0.2,
                                  maxZoom: 20,
                                },
                                yAxis: {
                                  title: {
                                    text: "Value",
                                  },
                                  minPadding: 0.2,
                                  maxPadding: 0.2,
                                  maxZoom: 20,
                                  plotLines: [
                                    {
                                      value: 0,
                                      width: 1,
                                      color: "#808080",
                                    },
                                  ],
                                },
                                legend: {
                                  enabled: false,
                                },
                                exporting: {
                                  enabled: false,
                                },
                                plotOptions: {
                                  series: {
                                    lineWidth: 1,
                                    point: {
                                      events: {
                                        click: function () {
                                          if (this.series.data.length > 1) {
                                            this.remove();
                                          }
                                        },
                                      },
                                    },
                                  },
                                },
                                series: [
                                  {
                                    data: [
                                      [20, 20],
                                      [105, 40],
                                    ],
                                  },
                                ],
                              }}
                            />
                          </Grid> */}
                            </Grid>
                          </Paper>
                        </Grid>
                      </>
                    )}
                    {currentAnimal && currentAnimal.gender === "MALE" && (
                      <Grid item xs={12} lg={12}>
                        {/* Pesos */}
                        <Paper
                          style={{ height: "94%" }}
                          elevation={4}
                          className={classes.card}
                        >
                          <div className={classes.cardHeader}>
                            <Typography
                              variant="body1"
                              className={classes.cardTitle}
                            >
                              Pesos
                            </Typography>
                            <div>
                              <IconButton
                                className={classes.cardEditIcon}
                                size="small"
                                style={{ marginRight: "0.5rem" }}
                                onClick={() => {
                                  history.push(
                                    generatePath(
                                      ROUTES_DICT.animalDetail.weight.list,
                                      {
                                        ...params,
                                        _id: params._id,
                                      }
                                    )
                                  );
                                }}
                              >
                                <ViewList fontSize="small"></ViewList>
                              </IconButton>
                              <IconButton
                                className={classes.cardEditIcon}
                                size="small"
                                onClick={() => {
                                  history.push(
                                    generatePath(
                                      ROUTES_DICT.animalDetail.weight.create,
                                      {
                                        ...params,
                                        _id: params._id,
                                      }
                                    )
                                  );
                                }}
                              >
                                <Add fontSize="small"></Add>
                              </IconButton>
                            </div>
                          </div>
                          <Divider className={classes.divider}></Divider>
                          <div className="">
                            <Grid
                              container
                              className={classes.generalFeature}
                              xs={12}
                            >
                              <Grid item xs={5}>
                                <Typography className={classes.cardFeature}>
                                  Peso
                                </Typography>
                              </Grid>
                              <Grid item xs={7}>
                                <Typography>
                                  {currentAnimal &&
                                  currentAnimal.weightControls &&
                                  currentAnimal.weightControls.length > 0
                                    ? currentAnimal.weightControls[0].weight +
                                      unitWeightTestOptions[
                                        currentAgribusiness.meatUnit
                                      ]
                                    : "Sin información"}
                                </Typography>
                              </Grid>
                            </Grid>
                            <Grid
                              container
                              className={classes.generalFeature}
                              xs={12}
                            >
                              <Grid item xs={5}>
                                <Typography className={classes.cardFeature}>
                                  Fecha de pesaje
                                </Typography>
                              </Grid>
                              <Grid item xs={7}>
                                <Typography>
                                  {currentAnimal.weightControls &&
                                  currentAnimal.weightControls.length > 0
                                    ? format(
                                        new Date(
                                          currentAnimal.weightControls[0].controlDate
                                        ),
                                        "yyyy-MM-dd"
                                      )
                                    : "No se han registrado pesos"}
                                </Typography>
                              </Grid>
                            </Grid>
                            {/* <Grid
                          container
                          className={classes.generalFeature}
                          xs={12}
                        >
                          <Grid item xs={5}>
                            <Typography className={classes.cardFeature}>
                              Gr./Día
                            </Typography>
                          </Grid>
                          <Grid item xs={7}>
                            <Typography>No especificado</Typography>
                          </Grid>
                        </Grid>
                        <Grid
                          container
                          className={classes.generalFeature}
                          xs={12}
                        >
                          <Grid item xs={5}>
                            <Typography className={classes.cardFeature}>
                              C. Corp
                            </Typography>
                          </Grid>
                          <Grid item xs={7}>
                            <Typography>No especificado</Typography>
                          </Grid>
                        </Grid>
                        <Grid
                          container
                          className={classes.generalFeature}
                          xs={12}
                        >
                          <Grid item xs={5}>
                            <Typography className={classes.cardFeature}>
                              Alzada
                            </Typography>
                          </Grid>
                          <Grid item xs={7}>
                            <Typography>No especificado</Typography>
                          </Grid>
                        </Grid> */}
                          </div>
                        </Paper>
                      </Grid>
                    )}
                  </Grid>
                </Grid>
              </Grid>
              <Grid container xs={12}>
                <Grid item xs={12} lg={4}>
                  {/*Ubicacion de corral*/}
                  <Paper elevation={4} className={classes.card}>
                    <div className={classes.cardHeader}>
                      <Typography variant="body1" className={classes.cardTitle}>
                        Ubicación de corral
                      </Typography>
                      <IconButton
                        className={classes.cardEditIcon}
                        size="small"
                        onClick={() => {
                          history.push(
                            generatePath(
                              ROUTES_DICT.animalDetail.other.update,
                              {
                                ...params,
                                _id: params._id,
                              }
                            )
                          );
                        }}
                      >
                        <Edit fontSize="small"></Edit>
                      </IconButton>
                    </div>
                    <Divider className={classes.divider}></Divider>
                    <div className="">
                      <Grid
                        container
                        className={classes.generalFeature}
                        xs={12}
                      >
                        <Grid item xs={6}>
                          <Typography className={classes.cardFeature}>
                            Potrero
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography>No especificado</Typography>
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        className={classes.generalFeature}
                        xs={12}
                      >
                        <Grid item xs={6}>
                          <Typography className={classes.cardFeature}>
                            Grupo
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography>No especificado</Typography>
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        className={classes.generalFeature}
                        xs={12}
                      >
                        <Grid item xs={6}>
                          <Typography className={classes.cardFeature}>
                            Lote
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography>No especificado</Typography>
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        className={classes.generalFeature}
                        xs={12}
                      >
                        <Grid item xs={6}>
                          <Typography className={classes.cardFeature}>
                            Descornado
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Checkbox
                            size="small"
                            defaultChecked
                            color="primary"
                            className={classes.checkboxSmall}
                            inputProps={{
                              "aria-label": "secondary checkbox",
                            }}
                          />
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        className={classes.generalFeature}
                        xs={12}
                      >
                        <Grid item xs={6}>
                          <Typography className={classes.cardFeature}>
                            Herrado
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Checkbox
                            size="small"
                            defaultChecked
                            color="primary"
                            className={classes.checkboxSmall}
                            inputProps={{
                              "aria-label": "secondary checkbox",
                            }}
                          />
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        className={classes.generalFeature}
                        xs={12}
                      >
                        <Grid item xs={6}>
                          <Typography className={classes.cardFeature}>
                            Pologia
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Checkbox
                            size="small"
                            defaultChecked
                            color="primary"
                            className={classes.checkboxSmall}
                            inputProps={{
                              "aria-label": "secondary checkbox",
                            }}
                          />
                        </Grid>
                      </Grid>
                    </div>
                  </Paper>
                </Grid>
                {currentAnimal && currentAnimal.gender === "FEMALE" && (
                  <Grid item xs={12} lg={4}>
                    {/* Produccion lechera */}
                    <Paper
                      style={{ height: "94%" }}
                      elevation={4}
                      className={classes.card}
                    >
                      <div className={classes.cardHeader}>
                        <Typography
                          variant="body1"
                          className={classes.cardTitle}
                        >
                          Producción Lechera
                        </Typography>
                        <div>
                          <IconButton
                            className={classes.cardEditIcon}
                            size="small"
                            style={{ marginRight: "0.5rem" }}
                            onClick={() => {
                              history.push(
                                generatePath(
                                  ROUTES_DICT.animalDetail.milk.list,
                                  {
                                    ...params,
                                    _id: params._id,
                                  }
                                )
                              );
                            }}
                          >
                            <ViewList fontSize="small"></ViewList>
                          </IconButton>
                          <IconButton
                            className={classes.cardEditIcon}
                            size="small"
                            onClick={() => {
                              history.push(
                                generatePath(
                                  ROUTES_DICT.animalDetail.milk.create,
                                  {
                                    ...params,
                                    _id: params._id,
                                  }
                                )
                              );
                            }}
                          >
                            <Add fontSize="small"></Add>
                          </IconButton>
                        </div>
                      </div>
                      <Divider className={classes.divider}></Divider>
                      <div className="">
                        <Grid
                          container
                          className={classes.generalFeature}
                          xs={12}
                        >
                          <Grid item xs={5}>
                            <Typography className={classes.cardFeature}>
                              Total leche
                            </Typography>
                          </Grid>
                          <Grid item xs={7}>
                            <Typography>
                              {currentAnimal &&
                              currentAnimal.milkControls &&
                              currentAnimal.milkControls.length > 0
                                ? totalMilk(currentAnimal.milkControls)
                                : `0 ${
                                    unitCapacityTestOptions[
                                      currentAgribusiness.milkUnit
                                    ]
                                  }`}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid
                          container
                          className={classes.generalFeature}
                          xs={12}
                        >
                          <Grid item xs={5}>
                            <Typography className={classes.cardFeature}>
                              Controles Lácteos
                            </Typography>
                          </Grid>
                          <Grid item xs={7}>
                            <Typography>
                              {currentAnimal &&
                                currentAnimal.milkControls &&
                                currentAnimal.milkControls.length >= 0 &&
                                currentAnimal.milkControls.length}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid
                          container
                          className={classes.generalFeature}
                          xs={12}
                        >
                          <Grid item xs={5}>
                            <Typography className={classes.cardFeature}>
                              Dias de lactancía
                            </Typography>
                          </Grid>
                          <Grid item xs={7}>
                            <Typography>
                              {currentAnimal &&
                              currentAnimal.milkControls &&
                              currentAnimal.milkControls.length > 0
                                ? totalDaysMilk(currentAnimal.milkControls)
                                : "0 días"}
                            </Typography>
                          </Grid>
                        </Grid>
                      </div>
                    </Paper>
                  </Grid>
                )}
                {currentAnimal && currentAnimal.gender === "FEMALE" && (
                  <Grid item xs={12} lg={4}>
                    {/* Pesos */}
                    <Paper
                      style={{ height: "94%" }}
                      elevation={4}
                      className={classes.card}
                    >
                      <div className={classes.cardHeader}>
                        <Typography
                          variant="body1"
                          className={classes.cardTitle}
                        >
                          Pesos
                        </Typography>
                        <div>
                          <IconButton
                            className={classes.cardEditIcon}
                            size="small"
                            style={{ marginRight: "0.5rem" }}
                            onClick={() => {
                              history.push(
                                generatePath(
                                  ROUTES_DICT.animalDetail.weight.list,
                                  {
                                    ...params,
                                    _id: params._id,
                                  }
                                )
                              );
                            }}
                          >
                            <ViewList fontSize="small"></ViewList>
                          </IconButton>
                          <IconButton
                            className={classes.cardEditIcon}
                            size="small"
                            onClick={() => {
                              history.push(
                                generatePath(
                                  ROUTES_DICT.animalDetail.weight.create,
                                  {
                                    ...params,
                                    _id: params._id,
                                  }
                                )
                              );
                            }}
                          >
                            <Add fontSize="small"></Add>
                          </IconButton>
                        </div>
                      </div>
                      <Divider className={classes.divider}></Divider>
                      <div className="">
                        <Grid
                          container
                          className={classes.generalFeature}
                          xs={12}
                        >
                          <Grid item xs={5}>
                            <Typography className={classes.cardFeature}>
                              Peso
                            </Typography>
                          </Grid>
                          <Grid item xs={7}>
                            <Typography>
                              {currentAnimal &&
                              currentAnimal.weightControls &&
                              currentAnimal.weightControls.length > 0
                                ? currentAnimal.weightControls[0].weight +
                                  ` ${
                                    unitWeightTestOptions[
                                      currentAgribusiness.meatUnit
                                    ]
                                  }`
                                : "No se han registrado pesos"}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid
                          container
                          className={classes.generalFeature}
                          xs={12}
                        >
                          <Grid item xs={5}>
                            <Typography className={classes.cardFeature}>
                              Fecha de pesaje
                            </Typography>
                          </Grid>
                          <Grid item xs={7}>
                            <Typography>
                              {currentAnimal.weightControls &&
                              currentAnimal.weightControls.length > 0
                                ? format(
                                    new Date(
                                      currentAnimal.weightControls[0].controlDate
                                    ),
                                    "yyyy-MM-dd"
                                  )
                                : "No se han registrado pesos"}
                            </Typography>
                          </Grid>
                        </Grid>
                      </div>
                    </Paper>
                  </Grid>
                )}
              </Grid>
            </Grid>
            <Grid item xs={12} lg={3}>
              <Grid container>
                <Grid item xs={12}>
                  {/* Calendario*/}
                  <Paper
                    style={{ height: "96%" }}
                    elevation={4}
                    className={classes.card}
                  >
                    <div className={classes.cardHeader}>
                      <Typography variant="body1" className={classes.cardTitle}>
                        Calendario
                      </Typography>

                      <IconButton
                        className={classes.cardEditIcon}
                        size="small"
                        onClick={() => {
                          history.push(
                            generatePath(
                              ROUTES_DICT.animalDetail.birth.update,
                              {
                                ...params,
                                _id: params._id,
                              }
                            )
                          );
                        }}
                      >
                        <Edit fontSize="small"></Edit>
                      </IconButton>
                    </div>
                    <Divider className={classes.divider}></Divider>

                    <div>
                      <Typography
                        className={classes.calendarTitle}
                        variant="subtitle1"
                      >
                        4 de sep del 2020
                      </Typography>
                      <Calendar value={new Date()}></Calendar>
                      <Typography className={classes.generalFeature}>
                        Vacunación
                      </Typography>
                      <Typography className={classes.generalFeature}>
                        Lorem Ipsum dole mer ammnet, consequertum
                      </Typography>
                    </div>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
      {children()}
    </Grid>
  );
};
export default AnimalDetailPage;
