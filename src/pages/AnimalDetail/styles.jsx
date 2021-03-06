import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  registerContainer: {
    paddingTop: "1rem",
  },
  errorsContainer: {
    paddingTop: "1rem",
  },
  textSecondary: {
    color: `${theme.palette.secondary.main} !important`,
  },
  tableHeader: {
    color: `${theme.palette.primary.main} !important`,
    backgroundColor: "#fafafa",
    position: "sticky",
    top: 0,
  },
  optionContainer: {
    padding: "1rem 0",
  },
  closeBtn: {
    position: "absolute",
    right: 10,
    top: 10,
    cursor: "pointer",
  },
  option: {
    padding: "1.2rem .5rem",
    backgroundColor: theme.palette.button.tertiary,
    "&:hover": {
      backgroundColor: theme.palette.button.primary,
      color: "white",
    },
    "&:focus": {
      backgroundColor: theme.palette.button.primary,
      color: "white",
    },
  },
  optionDelete: {
    backgroundColor: "#E7B3CA",
  },
  card: {
    padding: "1.2rem",
    margin: "0.5rem",
  },
  calendarTitle: {
    fontSize: "12px",
  },
  link: {
    textAlign: "right",
    display: "block",
  },
  image: {
    width: "70%",
    margin: "auto",
    paddingTop: "2rem",
    paddingBottom: "2rem",
    position: "relative",
  },
  cowImageEditButton: {
    position: "absolute",
    right: "-0.5rem",
    top: "1.5rem",
  },
  cowImageQrButton: {
    position: "absolute",
    right: "-2.5rem",
    bottom: "0.5rem",
    backgroundColor: "#E8EDF1",
    padding: "15px",
    borderRadius: "100%",
  },
  cowImage: {
    width: "100%",
    margin: "auto",
    borderRadius: "1rem",
  },
  textCenter: {
    textAlign: "center",
  },
  generalFeature: {
    padding: "0.25rem",
  },
  borderLinearProgress: {
    padding: "2rem",
    paddingLeft: "3rem",
    paddingRight: "3rem",
  },
  cardFeature: {
    color: "#979797",
    fontWeight: "bold",
    paddingRight: "0.1rem",
  },
  cowCodeTitle: {
    paddingBottom: "1rem",
  },
  divider: {
    marginBottom: "1rem",
  },
  checkboxSmall: {
    width: "16px",
    height: "16px",
  },

  qrImage: {
    width: "60px",
    height: "60px",
  },
  cardEditIcon: {
    backgroundColor: "#BBD1D7",
  },
  cardEditButtonCow: {
    backgroundColor: "#BBD1D7",
    "&:hover": {
      backgroundColor: "#BBD1D7",
    },
  },
  cardTitle: {
    fontWeight: "700",
    alignSelf: "flex-end",
  },
  cardHeader: {
    paddingBottom: "0.25rem",
    display: "flex",
    justifyContent: "space-between",
  },
  active: {
    backgroundColor: theme.palette.secondary.main,
    color: "white",
  },
  userContainer: {
    backgroundColor: theme.palette.card.green,
    padding: "2rem",
  },
  userTitle: {
    fontWeight: "600",
    fontSize: 25,
  },
  userDescription: {
    fontSize: 13,
  },
  userItem: {
    padding: "1rem",
  },
  userItemNumber: {
    fontSize: 22,
  },
  userItemText: {
    fontSize: 13,
  },
  userItemContainer: {
    padding: "1rem",
    backgroundColor: theme.palette.card.gray,
    height: "100%",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  icon: {
    color: theme.palette.general.main,
    marginBottom: "1rem",
  },
  cardContainer: {
    [theme.breakpoints.down("sm")]: {
      margin: 0,
    },
  },
  formStyle: {
    marginBottom: "1rem",
  },
  formDivider: {
    marginTop: "0.3rem",
  },
  paddingButton: {
    marginRight: "1rem",
  },
  borderBirth: {
    border: "1px solid #0073C8",
  },
  formControlContainer: {
    flexDirection: "row !important",
    justifyContent: "space-between !important",
  },
  checkBoxFormControl: {
    padding: ".3rem .2rem 0",
  },
  checkBoxLabelForm: {
    fontSize: 13,
  },
  raceInput: {
    minWidth: "100%",
  },
  raceContainer: {
    padding: "1rem 0",
  },
  border: {
    border: `1px solid ${theme.palette.primary.main}`,
    padding: "0 1rem",
    marginBottom: "1rem",
    position: "relative",
  },
  addBtn: {
    position: "absolute",
    right: -12,
    bottom: 7,
    backgroundColor: "white",
    color: theme.palette.primary.main,
    cursor: "pointer",
  },
  hidden: {
    display: "none !important",
  },
  deleteIcon: {
    cursor: "pointer",
    marginLeft: theme.spacing(1),
    color: theme.palette.primary.main,
  },
  errorMessage: {
    color: "red",
    textAlign: "center",
  },
  categoryForm: {
    padding: ".5rem",
  },
  rightText: {
    textAlign: "end",
  },
  cardIcon: {
    backgroundColor: "#BBD1D7",
    padding: "8px",
    marginRight: "10px",
    "&:hover": {
      backgroundColor: theme.palette.button.primary,
      color: "white",
    },
  },
  cardIconSelected: {
    backgroundColor: theme.palette.button.primary,
    color: "white",
    "&:hover": {
      backgroundColor: theme.palette.button.primary,
      color: "white",
    },
  },
  containerIcons: {
    marginBottom: "1.5rem",
  },

  nextBtn: {
    marginTop: "2rem",
    width: "100%",
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
    },
  },
  prevBtn: {
    marginTop: "2rem",
    marginRight: ".5rem",
    backgroundColor: theme.palette.button.secondary,
    margin: "1.5rem 0 .8rem 0",
    width: "100%",
    "&:hover": {
      backgroundColor: theme.palette.button.secondary,
    },
  },
}));
