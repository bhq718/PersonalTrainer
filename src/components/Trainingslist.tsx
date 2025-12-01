/* eslint-disable react-hooks/immutability */
import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import Button from '@mui/material/Button';

import type { Training} from '../types';
import { getTrainings, deleteTraining } from '../trainingsapi';
import EditTraining from './EditTraining';
import AddTraining from './AddTraining';

function Traininglist() {

    const [trainings, setTrainings] = useState<Training[]>([]);

   useEffect(() => {
        fetchTrainings();
    }, []);

    const fetchTrainings = () => {
        getTrainings()
            .then(data => setTrainings(data._embedded.trainings))
            .catch(err => console.error(err));
    }

    const handleDelete = (url: string) => {
        if (window.confirm('Are you sure you want to delete this training?')) {
            deleteTraining(url)
                .then(() => fetchTrainings())
                .catch(err => console.error(err));
        }
    }

    const columns: GridColDef[] = [
        { field: 'date', headerName: 'Date', width: 150 },
        { field: 'duration', headerName: 'Duration (min)', width: 150 },
        { field: 'activity', headerName: 'Activity', width: 150 },
        {
            field: '_links.self.href',
            headerName: 'Actions', sortable: false, width: 100, filterable: false, hideable: false,
            renderCell: (params: GridRenderCellParams) =>
                <Button color="error" size="small" onClick={() => handleDelete(params.id as string)}>
                    Delete
                </Button>
        },
          {
                    field: '_links.trainings.href',
                    headerName: 'Actions', sortable: false, width: 100, filterable: false, hideable: false,
                    renderCell: (params: GridRenderCellParams) =>
                        <EditTraining fetchTrainings={fetchTrainings} trainingRow={params.row} />
                }
    ]

    return (
        <>
            <AddTraining fetchTrainings={fetchTrainings} />
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={trainings}
                columns={columns}
                getRowId={(row) => row._links.trainings.href}
                autoPageSize
                 rowSelection={false}
            />
        </div>
        </>
    );

}

export default Traininglist;