import { Provider } from "react-redux";
import { store } from "./redux/store";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import mainTheme from "./themes/mainTheme";
import { AppRouter } from "./routes/AppRouter";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { es } from "date-fns/esm/locale";

function App() {
  return (
    <Provider store={store}>
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={es}>
        <ThemeProvider theme={mainTheme}>
          <CssBaseline />
          <AppRouter />
        </ThemeProvider>
      </MuiPickersUtilsProvider>
    </Provider>
  );
}

export default App;
