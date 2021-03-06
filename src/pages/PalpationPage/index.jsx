import React, { useState } from "react";
// import { useHistory } from "react-router-dom";
import { Grid } from "@material-ui/core";
import { columns, exampleTable } from "./constants";
import { useStyles } from "./styles";
import CustomMaterialTable from "../../components/CustomMaterialTable";
import PalpationHeader from "./PalpationHeader";

function PalpationPage() {
  // const history = useHistory();
  const [animalsList, setAnimalsList] = useState(exampleTable);

  // const { state = {} } = history.location;
  const classes = useStyles();

  return (
    <Grid container xs={12}>
      <PalpationHeader />
      <Grid item xs={12} className={classes.registerContainer}>
        <CustomMaterialTable
          columns={columns}
          data={animalsList}
          filters={[
            { field: "allRegister", type: "text", title: "Todos registros" },
            { field: "allAge", type: "text", title: "Todas edades" },
            {
              field: "allStates",
              type: "text",
              title: "Todos estados",
            },
            {
              field: "allDates",
              type: "date",
              title: "Todas fechas",
            },
          ]}
          setData={setAnimalsList}
        />
      </Grid>
    </Grid>
  );
}

export default PalpationPage;
