import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import dayjs from 'dayjs';
import type { Training } from '../types';
import { deleteTraining } from "../trainingsapi";

function Traininglist() {
    const [trainings, setTrainings] = useState<Training[]>([]);

    const fetchTrainings = async () => {
        try {
            const response = await fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/gettrainings');
            if (!response.ok) {
                throw new Error("Error fetching trainings: " + response.statusText);
            }
            const data = await response.json();
            const formattedData = data.map((training: any) => ({
                ...training,
                formattedDate: dayjs(training.date).format('DD.MM.YYYY HH:mm'),
                customerName: `${training.customer?.firstname ?? ''} ${training.customer?.lastname ?? ''}`.trim(),
            }));
            setTrainings(formattedData);
        } catch (error) {
            console.error("Error fetching trainings:", error);
        }
    };

    useEffect(() => {
        fetchTrainings();
    }, []);

const handleDelete = async (id: number) => {
    try {
        await deleteTraining(id); // Poista treeni ID:n perusteella
        setTrainings(prev => prev.filter(training => training.id !== id)); // Suodata poistettu treeni pois
    } catch (error) {
        console.error("Error deleting training:", error);
    }
};

const columns: GridColDef[] = [
    { field: 'formattedDate', headerName: 'Date', width: 200 },
    { field: 'activity', headerName: 'Activity', width: 200 },
    { field: 'duration', headerName: 'Duration (min)', width: 150 },
    { field: 'customerName', headerName: 'Customer', width: 200 },
    {
        field: 'id',
        headerName: 'Delete',
        sortable: false,
        width: 100,
        filterable: false,
        hideable: false,
        renderCell: (params: GridRenderCellParams) =>
            <Button color="error" size="small" onClick={() => handleDelete(params.row.id)}>
                Delete
            </Button>
    },
];

return (
  <>
  <div style={{ height: 600, width: '95%', margin: 'auto', marginTop: 20 }}>
  <DataGrid
  rows={trainings}
  columns={columns}
  getRowId={(row) => row.id} // Käytä `id` rivin yksilöimiseen
  autoPageSize
  disableRowSelectionOnClick
  />
  </div>
  </>
  );
}

export default Traininglist;