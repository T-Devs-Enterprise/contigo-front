import AuthService from "../../services/auth.service";
import ACTION_TYPES from "../types";
import { farmActions } from "./farm.actions";
import UiActions from "./ui.actions";

class AuthActions {
  register(data) {
    return (dispatch) => {
      return AuthService.register(data).then(
        (response) => {
          dispatch({
            type: ACTION_TYPES.AUTH.REGISTER_SUCESS,
            payload: response,
          });

          return Promise.resolve();
        },
        (error) => {
          dispatch({ type: ACTION_TYPES.AUTH.REGISTER_FAIL });
          dispatch(UiActions.showSnackbar(error.message, "error"));
          return Promise.reject();
        }
      );
    };
  }

  login(data) {
    return (dispatch) => {
      return AuthService.login(data).then(
        (response) => {
          localStorage.setItem("user", JSON.stringify(response));
          dispatch(farmActions.findFarmByOwnerId(response._id));
          dispatch({ type: ACTION_TYPES.AUTH.LOGIN_SUCESS, payload: response });
          return Promise.resolve();
        },
        (error) => {
          dispatch({ type: ACTION_TYPES.AUTH.LOGIN_FAIL, error: error });
          dispatch(UiActions.showSnackbar(error.message, "error"));
          return Promise.reject();
        }
      );
    };
  }

  logout() {
    return (dispatch) => {
      localStorage.clear();
      dispatch({ type: ACTION_TYPES.AUTH.LOGOUT });
    };
  }
}

export default new AuthActions();