import React, { useState } from 'react';
import { Modal, Box } from '@mui/material';
import Button from '@mui/material/Button';
import Datetime from 'react-datetime';

const CreateAppointmentModal = ({ open, handleClose }) => {
  const [form, setForm] = useState({
    start: '',
    end: '',
    title: '',
    disc: ''
  });

  const updateForm = (field, value) => {
    setForm(prevForm => ({
      ...prevForm,
      [field]: value
    }));
  };

  const onSubmit = e => {
    e.preventDefault();
    // Logic for submitting the form
  };

  const style = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 400,
  };

  const styleBtn = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: 'blue',
    color: 'white',
    borderRadius: '5px',
    cursor: 'pointer',
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box sx={{ ...style }}>
        <div className="m-5 p-5 bg-black text-white rounded">
          <h3>Créer un nouveau rendez-vous</h3>
          <form onSubmit={onSubmit} className="form-group flex flex-col text-red-500">
            <div className="form-group">
              <label htmlFor="start" className="mb-3">Début</label>
              <Datetime
                className="form-control"
                id="start"
                value={form.start}
                onChange={value => updateForm('start', value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="end" className="mb-3">Fin</label>
              <Datetime
                className="form-control"
                id="end"
                value={form.end}
                onChange={value => updateForm('end', value)}
              />
            </div>
            <div className="form-group flex first-letter:capitalize">
              <label htmlFor="title" className="mb-3">Titre</label>
              <input
                type="text"
                className="form-control"
                id="title"
                value={form.title}
                onChange={(e) => updateForm('title', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="disc" className="mb-3">Description</label>
              <input
                type="text"
                className="form-control"
                id="disc"
                value={form.disc}
                onChange={(e) => updateForm('disc', e.target.value)}
              />
            </div>
            <Box className="form-group" sx={{ ...styleBtn }}>
              <Button variant="contained" color="primary" type="submit">
                Créer rendez-vous
              </Button>
            </Box>
          </form>
        </div>
      </Box>
    </Modal>
  );
};

export default CreateAppointmentModal;
