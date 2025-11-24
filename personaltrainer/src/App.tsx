import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import './App.css'

import Customerlist from "./components/Customerlist";

function App() {


  return (
     <Container maxWidth="lg">
      <AppBar position="static">
        <Toolbar>
          <Typography>Personal Trainer</Typography>
        </Toolbar>
      </AppBar>
      <Customerlist />
      <CssBaseline />
    </Container>
  )
}

export default App
