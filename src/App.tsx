import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link, Outlet } from 'react-router';


export default function App() {



  return (
     <Container maxWidth="lg">
      <AppBar position="static">
        <Toolbar>
          <Typography>Personal Trainer</Typography>
        </Toolbar>
      </AppBar>
          <nav>
        <Link to={"/"} style={{ marginRight: "10px" }}>Customers</Link> 
        <Link to={"/trainings"} style={{ marginRight: "10px" }}>Trainings</Link>
      </nav>
    
      <CssBaseline />
    <Outlet />
    </Container>
  )
}


