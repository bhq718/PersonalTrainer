import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef } from '@mui/x-data-grid';
//import  Button  from '@mui/material/Button';

import type {Customer} from '../types';
import { getCustomers } from '../customerapi';

function Customerlist() {
    const [customer, setCustomers] = useState<Customer[]>([]);

    useEffect(() => {
        fecthCustomers();
    }, []);

    const fetchCustomers = () => {
        getCustomers()
        .then(data => setCustomers(data._embedded.customers))
        .catch(err => console.error(err));
    }

    const columns: GridColDef[] = [
        { field: 'firstname', headerName: 'First Name', width: 150 },
        { field: 'lastname', headerName: 'Last Name', width: 150 },
        { field: 'streetaddress', headerName: 'Address', width: 200 },
        { field: 'postcode', headerName: 'Postcode', width: 100 },
        { field: 'city', headerName: 'City', width: 150 },
        { field: 'email', headerName: 'Email', width: 200 },
        { field: 'phone', headerName: 'Phone', width: 150 },
    ]

    return (
        <>
           <div style ={{width: '90%', height: 500, margin: 'auto'}}>
            <DataGrid
                rows={customer}
                columns={columns}
                getRowId={(row) => row._links.customer.href}
                autopageSize
                rowSelection={false}
            />
           </div>
        </>
    );


} export default Customerlist;