import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import  Button  from '@mui/material/Button';

import type { Customer } from '../types';
import { getCustomers, deleteCustomer } from '../customerapi';
import EditCustomer from './EditCustomer';

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
        { field: 'firstname', headerName: 'First Name', width: 150 },
        { field: 'lastname', headerName: 'Last Name', width: 150 },
        { field: 'streetaddress', headerName: 'Address', width: 200 },
        { field: 'postcode', headerName: 'Postcode', width: 100 },
        { field: 'city', headerName: 'City', width: 150 },
        { field: 'email', headerName: 'Email', width: 200 },
        { field: 'phone', headerName: 'Phone', width: 150 },
        {
            field: '_links.customer.href',
            headerName: 'Actions',
            sortable: false,
            width: 150,
            filterable: false,
            hideable: false,
                 renderCell: (params: GridRenderCellParams) =>
        <Button color ="error" size="small" onClick={() => handleDelete(params.id as string)}>
            Delete
        </Button>
        },
        {
            field: '_links.customer.href',
            headerName: 'Actions',
            sortable: false,
            width: 150,
            filterable: false, hideable: false,
            renderCell: (params: GridRenderCellParams) =>
            <EditCustomer fetchCustomers={fetchCustomers} customerRow={params.row} />
        }
    ]

    return (
        <>
           <div style ={{width: '90%', height: 500, margin: 'auto'}}>
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