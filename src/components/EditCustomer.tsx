import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
//import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import type { CustomerForm, Customer } from '../types';

type EditCustomerProps = {
    fetchCustomers: () => void;
    customerRow: Customer;
}

export default function EditCustomer({ fetchCustomers, customerRow }: EditCustomerProps) {
    const [open, setOpen] = useState(false);
    const [customer, setCustomer] = useState<CustomerForm>({
        firstname: "",
        lastname: "",
        streetaddress: "",
        postcode: "",
        city: "",
        email: "",
        phone: "",
    });

    const handleClickOpen = () => {
        setOpen(true);
        setCustomer({
            firstname: customerRow.firstname,
            lastname: customerRow.lastname,
            streetaddress: customerRow.streetaddress,
            postcode: customerRow.postcode,
            city: customerRow.city,
            email: customerRow.email,
            phone: customerRow.phone,
        });
    };

    const handleClose = () => {
        setOpen(false);
        setCustomer({
            firstname: "",
            lastname: "",
            streetaddress: "",
            postcode: "",
            city: "",
            email: "",
            phone: "",
        });
    };

    const handleSave = () => {
        if(!customer.firstname || !customer.lastname || !customer.streetaddress || !customer.postcode ||
           !customer.city || !customer.email || !customer.phone) {
            alert("All fields are required.");
            return;
        }
        fetch(customerRow._links.customer.href, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customer)
        })
        .then(response => {
            if (!response.ok)
                throw new Error("Error when updating customer: ") 
            return response.json();
        })
        .then(() => {
            fetchCustomers();
            handleClose();
        })
        .catch(err => console.error(err));
    };

    return (
        <>
        <Button size="small" onClick={handleClickOpen}>
            Edit
        </Button>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Edit Customer</DialogTitle>
            <DialogContent>
                <TextField
                required
                margin="dense"
                label="First Name"
                value={customer.firstname}
                onChange={(event) => setCustomer({...customer, firstname: event.target.value})}
                fullWidth
                variant="standard"
                />
                <TextField
                required
                margin="dense"
                label="Last Name"
                value={customer.lastname}
                onChange={(event) => setCustomer({...customer, lastname: event.target.value})}
                fullWidth
                variant="standard"
                />
                <TextField
                required
                margin="dense"
                label="Street Address"
                value={customer.streetaddress}
                onChange={(event) => setCustomer({...customer, streetaddress: event.target.value})}
                fullWidth
                variant="standard"
                />
                <TextField
                required
                margin="dense"
                label="Postcode"
                value={customer.postcode}
                onChange={(event) => setCustomer({...customer, postcode: event.target.value})}
                fullWidth
                variant="standard"
                />
                <TextField
                required
                margin="dense"
                label="City"
                value={customer.city}
                onChange={(event) => setCustomer({...customer, city: event.target.value})}
                fullWidth
                variant="standard"
                />
                <TextField
                required
                margin="dense"
                label="Email"
                value={customer.email}
                onChange={(event) => setCustomer({...customer, email: event.target.value})}
                fullWidth
                variant="standard"
                />
                <TextField
                required
                margin="dense"
                label="Phone"
                value={customer.phone}
                onChange={(event) => setCustomer({...customer, phone: event.target.value})}
                fullWidth
                variant="standard"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSave}>Save</Button>
            </DialogActions>
        </Dialog>
        </>
    );

    }