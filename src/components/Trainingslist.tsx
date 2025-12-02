import {  useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import dayjs from 'dayjs'
import { useOutletContext } from "react-router";

import type { OutletContextType} from '../types';



function Traininglist() {

const { trainings, fetchTrainings, deleteTraining } = useOutletContext<OutletContextType>();

  useEffect(() => {
    fetchTrainings();
  }, [fetchTrainings]);


  const formattedTrainings = (trainings ?? []).map(training => ({
    ...training,
    formattedDate: training.date ? dayjs(training.date).format('DD.MM.YYYY HH:mm') : '',
    customerName: (training as any).customerName ?? ''
  }));
 
  
 
  const columns: GridColDef[] = [
    { field: 'formattedDate', headerName: 'Date', width: 200 },
    { field: 'activity', headerName: 'Activity', width: 200 },
    { field: 'duration', headerName: 'Duration (min)', width: 150 },
    { field: 'customerName', headerName: 'Customer', width: 200 },
           {
            field: '_links.self.href',
            headerName: 'Delete',
            sortable: false,
            width: 100,
            filterable: false,
            hideable: false,
            renderCell: (params: GridRenderCellParams) =>
                <Button color="error" size="small" onClick={() => deleteTraining(params.row?._links?.self?.href ?? (params.id as string))}>
                    Delete
                </Button>
        },
  ];
 
    return (
        <>
      <div style={{ height: 600, width: '95%', margin: 'auto', marginTop: 20 }}>
      <DataGrid
        rows={formattedTrainings}
        columns={columns}
        getRowId={row => row._links?.self?.href ?? (row as any).id}
        autoPageSize
        disableRowSelectionOnClick
      />
    </div>
        </>
    );

}

export default Traininglist;