import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';

import { saveTraining } from '../trainingsapi';

type Props = {
  customerHref: string;
  onSaved?: () => void;
  addTraining?: (training: any) => Promise<any>; 
};

export default function AddTrainings({ customerHref, onSaved, addTraining }: Props) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState('');
  const [activity, setActivity] = useState('');
  const [duration, setDuration] = useState('');
  const [saving, setSaving] = useState(false);

  const openDialog = () => setOpen(true);
  const closeDialog = () => setOpen(false);


const submit = async () => {
    const dur = Number(duration);
    if (Number.isNaN(dur)) { alert('Use numbers only'); return; }
    if (!date || !activity || !duration) { alert('Please fill all the fields'); return; }

const training = {
  date: new Date(date).toISOString(), // Päivämäärä ISO-muodossa
  activity,
  duration: dur,
  customer: customerHref // Asiakkaan URL
};

    try {
      setSaving(true);
      const saveFn = addTraining ?? saveTraining; // käytä propia tai suoraa API-funktiota
      await saveFn(training);
      alert('New training added successfully');
      onSaved?.();
      closeDialog();
    } catch (err: any) {
      console.error('Add training error:', err);
      alert('Adding new training failed ' + (err?.message ?? String(err)));
    } finally {
      setSaving(false);
    }
  };
  

  return (
    <>
      <Button variant="outlined" size="small" onClick={openDialog}>Add Training</Button>
      <Dialog open={open} onClose={closeDialog}>
        <DialogTitle>Add new training</DialogTitle>
        <DialogContent>
          <TextField label="Date and time" type="datetime-local" fullWidth value={date} onChange={e=>setDate(e.target.value)}  />
          <TextField label="Activity" fullWidth value={activity} onChange={e=>setActivity(e.target.value)} />
          <TextField label="Duration (min)" type="number" fullWidth value={duration} onChange={e=>setDuration(e.target.value)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Peruuta</Button>
          <Button onClick={submit} variant="contained" disabled={saving}>Tallenna</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}