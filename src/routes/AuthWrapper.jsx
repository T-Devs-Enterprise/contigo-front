import { CircularProgress } from "@material-ui/core";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router";
import { farmActions } from "../redux/actions/farm.actions";
import { useStyles } from "../styles";
import { ROUTES_DICT } from "./routesDict";
import Joyride from "react-joyride";
import { useState } from "react";
import steps from "./reactTourSteps";
/**
 * @returns {Component}
 * @description Wrapper de autentificacion que solicita datos globales de prioridad (Farm actual y Agronegocio actual)
 * @author Frank Cary Viveros <frank.cary@tecsup.edu.pe>
 */

const AuthWrapper = ({ children }) => {
  const dispatch = useDispatch();
  const currentFarm = useSelector((state) => state.farm.current);
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();

  const { current: currentAgribusiness } = useSelector(
    (state) => state.agribusiness
  );

  const user = useSelector((state) => state.auth.user);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const [auth, setAuth] = useState(false);

  useEffect(() => {
    if (!currentFarm || !currentAgribusiness) {
      dispatch(farmActions.findFarmByOwnerId(user?._id)).then((e) => {
        //if (!currentFarm) {
        //  history.push(ROUTES_DICT.setup);
        //}
      });
    }
  }, [dispatch, currentFarm, currentAgribusiness, user]);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setAuth(true);
    } else {
      setAuth(false);
    }
  }, [location]);

  return (
    <>
      {!currentAgribusiness &&
      isLoggedIn &&
      location.pathname !== ROUTES_DICT.setup ? (
        <div className={classes.loader}>
          <CircularProgress />
        </div>
      ) : (
        children
      )}
      {auth && (
        <Joyride
          continuous={true}
          run={true}
          scrollToFirstStep={true}
          showProgress={true}
          showSkipButton={true}
          steps={steps}
          styles={{
            options: {
              zIndex: 10000,
            },
          }}
        />
      )}
    </>
  );
};

export default AuthWrapper;
