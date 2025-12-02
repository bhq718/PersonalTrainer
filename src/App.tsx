import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link, Outlet } from 'react-router';
import { useState, useEffect, useCallback } from "react";

import type { Training } from "./types";
import { getTrainings, deleteTraining as deleteTrainingApi  } from "./trainingsapi";


export default function App() {

const [trainings, setTrainings] = useState<Training[]>([]);

  const fetchTrainings = useCallback(async (): Promise<Training[]> => {
    try {
      const data = await getTrainings();
      const raw = data?._embedded?.trainings ?? [];

       const enriched = await Promise.all(
        raw.map(async (t: any) => {
          let customerName = '';
          try {
            const link = t._links?.customer?.href;
            if (link) {
              const res = await fetch(link);
              const cust = await res.json();
              customerName = `${cust.firstname ?? ''} ${cust.lastname ?? ''}`.trim();
            }
          } catch (e) {
            console.error('customer fetch failed', e);
          }
          return { ...t, customerName };
        })
      );

      return enriched;
    } catch (e) {
      console.error(e);
      return [];
    }
  }, []);

  const deleteTraining = useCallback(async (href: string) => {
    await deleteTrainingApi(href);
    const updated = await fetchTrainings();
    setTrainings(updated);
  }, [fetchTrainings]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const data = await fetchTrainings();
      if (mounted) setTrainings(data);
    })();
    return () => { mounted = false; };
  }, [fetchTrainings]);

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
        <Link to={"/statistics"} style={{ marginRight: "10px" }}>Statistics</Link>
      </nav>
    
      <CssBaseline />
    <Outlet context={{ trainings, fetchTrainings, deleteTraining }} />
    </Container>
  )
}


