const ACTION_TYPES = {
  AUTH: {
    REGISTER_SUCESS: "auth/REGISTER_SUCESS",
    REGISTER_FAIL: "auth/REGISTER_FAIL",
    LOGIN_SUCESS: "auth/LOGIN_SUCCESS",
    LOGIN_FAIL: "auth/LOGIN_FAIL",
    LOGOUT: "auth/LOGIN_LOGOUT",
  },
  UI: {
    SNACKBAR_SHOW: "ui/SNACKBAR_SHOW",
  },
  API: {
    REQUEST: "api/REQUEST",
    START: "api/START",
    END: "api/END",
    DENIED: "api/DENIED",
    ERROR: "api/ERROR",
  },
  CURRENCY: {
    RETRIEVE: "currency/RETRIEVE",
    RETRIEVE_BY_ID: "currency/RETRIEVE_BY_ID",
  },
  AGRIBUSINESS: {
    RETRIEVE: "agribusiness/RETRIEVE",
    CREATE: "agribusiness/CREATE",
    UPDATE_CURRENT: "agribusiness/UPDATE_CURRENT",
    DELETE: "agribusiness/DELETE",
  },
  FARM: {
    RETRIEVE_BY_OWNER_ID: "farm/RETRIEVE_BY_OWNER_ID",
  },
  ANIMAL: {
    UPDATE_CURRENT: "animal/UPDATE_CURRENT",
  },
};

export default ACTION_TYPES;