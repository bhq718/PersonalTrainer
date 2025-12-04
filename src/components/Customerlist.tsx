/* eslint-disable react-hooks/immutability */
import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import Button from '@mui/material/Button';

import type { Customer } from '../types';
import { getCustomers, deleteCustomer } from '../customerapi';
import EditCustomer from './EditCustomer';
import AddCustomer from './AddCustomer';
import AddTrainings from './AddTraining';

function Customerlist() {

    const [customers, setCustomers] = useState<Customer[]>([]);

   useEffect(() => {
        fetchCustomers();
    }, []);



    

    const fetchCustomers = () => {
        getCustomers()
            .then(data => setCustomers(data._embedded.customers))
            .catch(err => console.error(err));
    }

    const handleDelete = (url: string) => {
        if (window.confirm('Are you sure you want to delete this customer?')) {
            deleteCustomer(url)
                .then(() => fetchCustomers())
                .catch(err => console.error(err));
        }
    }

    const columns: GridColDef[] = [
        { field: 'firstname', headerName: 'First Name', width: 100 },
        { field: 'lastname', headerName: 'Last Name', width: 100 },
        { field: 'streetaddress', headerName: 'Address', width: 100 },
        { field: 'postcode', headerName: 'Postcode', width: 100 },
        { field: 'city', headerName: 'City', width: 100 },
        { field: 'email', headerName: 'Email', width: 100 },
        { field: 'phone', headerName: 'Phone', width: 100 },
      
        {
            field: '_links.self.href',
            headerName: 'Actions', sortable: false, width: 100, filterable: false, hideable: false,
            renderCell: (params: GridRenderCellParams) =>
                <Button color="error" size="small" onClick={() => handleDelete(params.id as string)}>
                    Delete
                </Button>
        },
        {
            field: '_links.customer.href',
            headerName: 'Actions', sortable: false, width: 100, filterable: false, hideable: false,
            renderCell: (params: GridRenderCellParams) =>
                <EditCustomer fetchCustomers={fetchCustomers} customerRow={params.row} />
        },
{
  field: '_links.trainings.href',
  headerName: 'Trainings',
  width: 150,
  renderCell: (params: GridRenderCellParams) =>
    <AddTrainings
      customerHref={params.row._links.customer.href}
      onSaved={fetchCustomers} // Käytä fetchCustomers-funktiota
    />
}
    ]

    return (
        <>
            <AddCustomer fetchCustomers={fetchCustomers} />
            <div style={{ width: '90%', height: 500, margin: 'auto' }}>
                <DataGrid
                    rows={customers}
                    columns={columns}
                    getRowId={(row) => row._links.customer.href}
                    autoPageSize
                    rowSelection={false}
                />
            </div>
        </>
    );
}
export default Customerlist;