import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
//import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import type { TrainingForm, Training } from '../types';

type EditTrainingProps = {
    fetchTrainings: () => void;
    trainingRow: Training;
}

export default function EditTraining({ fetchTrainings, trainingRow }: EditTrainingProps) {
    const [open, setOpen] = useState(false);
    const [training, setTraining] = useState<TrainingForm>({
        date: '',
        duration: 0,
        activity: '',
    });

    const handleClickOpen = () => {
        setOpen(true);
        setTraining({
            date: trainingRow.date,
            duration: trainingRow.duration,
            activity: trainingRow.activity,
        });
    };
    const handleClose = () => {
        setOpen(false);
        setTraining({
            date: '',
            duration: 0,
            activity: '',
        });
    };

    const handleSave = () => {
        if(!training.date || !training.duration || !training.activity ) {
            alert("Please fill all fields");
            return;
        }
        fetch(trainingRow._links.training.href, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(training)
        })
    .then(response => {
            if (!response.ok)
                throw new Error("Error when updating training: ") 
            return response.json();
        })
        .then(() => {
            fetchTrainings();
            handleClose();
        })
        .catch(err => console.error(err));
    };

    return (
        <>
            <Button variant="outlined" onClick={handleClickOpen} style={{ marginRight: '10px' }}>
                Edit
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Training</DialogTitle>
                <DialogContent>
                     <TextField
                    required
                    margin="dense"
                    label="Date"
                    value={training.date}
                    onChange={event => setTraining({...training, date: event.target.value})}
                    fullWidth
                    variant="standard"
                    />
                    <TextField
                    required
                    margin="dense"
                    label="Duration (min)"
                    value={training.duration}
                    onChange={event => setTraining({...training, duration: Number(event.target.value)})}
                    fullWidth
                    variant="standard"
                    />
                    <TextField
                    required
                    margin="dense"
                    label="Activity"
                    value={training.activity}
                    onChange={event => setTraining({...training, activity: event.target.value})}
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
