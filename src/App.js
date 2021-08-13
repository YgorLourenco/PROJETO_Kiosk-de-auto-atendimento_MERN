import { Container, CssBaseline, Paper, ThemeProvider } from "@material-ui/core";
import { createTheme } from '@material-ui/core/styles'
import { BrowserRouter, Route } from "react-router-dom";
import ChooseScreen from "./screens/ChooseScreen";
import HomeScreen from "./screens/HomeScreen";
import OrderScreen from "./screens/OrderScreen";

const theme = createTheme({
  typography: {
    h1: { fontWeight: 'bold'},
    h2: {
      fontSize: '2rem',
      color: 'black',
    },
    h3: {
      fontSize: '1.8rem',
      fontWeight: 'bold',
      color: 'white',
    },
  },
  palette: {
    primary: { main: '#ff1744'},
    secondary: {
      main: '#118e16',
      contrastText: '#ffffff',
    },
  },
})

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
          <CssBaseline />
          <Container maxWidth='sm'>
            <Paper>
              <Route path='/' component={HomeScreen} exact={true}></Route>
              <Route path='/choose' component={ChooseScreen} exact={true}></Route>
              <Route path='/order' component={OrderScreen} exact={true}></Route>
            </Paper>
          </Container>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
