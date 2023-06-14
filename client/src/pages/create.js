import React, { useState } from "react";
import { useNavigate } from "react-router";
import FileBase64 from 'react-file-base64';
import { Modal, Box, Typography, List, ListItem, ListItemText, Button } from "@mui/material";
import frLocale from '@fullcalendar/core/locales/fr';
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import Input from "@mui/material/Input";
import listPlugin from "@fullcalendar/list";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";
import "dayjs/locale/de";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'

import { createEvent, getEvents, deleteEvent, updateEvent } from "../api/events"; // Import your API functions

const styleBtn = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '10px 20px',
  color: 'white',
  borderRadius: '5px',
  cursor: 'pointer',
};

const style = {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
  margin:"auto",
  marginLeft:"1.5rem",
  width: "100vw",
  bgcolor: '#4d547d',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 0,
  px: 4,
  pb: 3,
  py:0,
  color: '#191F45'
};

export default function Create() {
  const navigate = useNavigate();
 const [form, setForm] = useState({
      start: "",
      end: "",
      title: "",
      phone: "",
      adressDepart: "",
      adressArrive: "",
      remarque: "",
      bonDeCommande: "",
 });

 
 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await createEvent(form);
    setForm({
      start: "",
      end: "",
      title: "",
      phone:"",
      adressDepart: "",
      adressArrive: "",
      remarque: "",
      bonDeCommande: "",
    });
    

  } catch (error) {
    window.alert(`An error occurred: ${error.message}`);
  }
};

/*  // This function will handle the submission.
 async function onSubmit(e) {
   e.preventDefault();
 
   // When a post request is sent to the create url, we'll add a new record to the database.
   const newPerson = { ...form };
 
   await fetch("https://fullcalendar-backend.onrender.com/record", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(newPerson),
   })
   .catch(error => {
     window.alert(error);
     return;
   });
 
   setForm({ name: "", position: "", level: "", address: "", date: "", heure:"" , image:""});
   
   navigate("/");
 } */
  
 
 // This following section will display the form that takes the input from the user.
 return (
  <Box sx={{ ...style, }}>
  <div className="m-5 p-5 bg-black text-white rounded">
    <h3>Créer un nouveau rendez-vous</h3>
    <form onSubmit={handleSubmit} className="form-group flex flex-col justify-evenly text-red-500 gap-3 ">
      <div style={{ display:"flex" ,gap:"2rem"}}>

      <div className="form-group">
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
          <DateTimePicker
            label="Date Et Heure de Début"
            type="date"
            className="form-control"
            id="start"
            value={form.start}
            onChange={(value) => setForm((prev) => ({ ...prev, start: value }))}
            required
            minDate={ dayjs() }

          />
        </LocalizationProvider>
      </div>
      <div className="form-group">
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
          <DateTimePicker
            label="Date Et Heure de Fin"
            type="date"
            className="form-control"
            id="end"
            value={form.end}
            onChange={(value) => setForm((prev) => ({ ...prev, end: value }))}
            minDate={ dayjs( form.start ) }

            required
          />
        </LocalizationProvider>
      </div>
      </div>
      <div className="form-group flex first-letter:capitalize">
        <label htmlFor="end" className="mb-4">
          Client:
        </label>
        <Input
          fullWidth
          label="Client"
          sx={{
            color: 'success.main',
          }}
          id="fullWidth"
          type="text"
          color="primary"
          margin="dense"
          variant="outlined"
          id="title"
          value={form.title}
          onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="address" className="mb-3">
          Numéro de Téléphone:
        </label>
        <Input
          fullWidth
          type="number"
          className="form-control"
          id="phone"
          placeholder="Numéro de Téléphone"
          value={form.phone}
          onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
          
        />
      </div>
      <div className="form-group">
        <label htmlFor="address" className="mb-3">
          Adresse de départ:
        </label>
        <Input
          fullWidth
          type="text"
          className="form-control"
          id="adressDépart"
          placeholder="Adresse de départ"
          value={form.adressDepart}
          onChange={(e) => setForm((prev) => ({ ...prev, adressDepart: e.target.value }))}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="address" className="mb-3">
          Adresse d'arrivée:
        </label>
        <Input
          fullWidth
          type="text"
          className="form-control"
          id="adressArrive"
          value={form.adressArrive}
          onChange={(e) => setForm((prev) => ({ ...prev, adressArrive: e.target.value }))}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="remarque" className="mb-3">
          Remarque:
        </label>
        <Input
          fullWidth
          type="text"
          className="form-control"
          id="remarque"
          value={form.remarque}
          onChange={(e) => setForm((prev) => ({ ...prev, remarque: e.target.value }))}
        />
      </div> 
      <div className="col-span-full">
              <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
              Bon De Commande:
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <PhotoIcon className="mx-auto h-2 w-2 text-gray-300" style={{ width:"50%", marginLeft: '25%' }}  aria-hidden="true" />
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                   <FileBase64
         multiple={ false }
         onDone={ ({base64}) => setForm((prev) => ({ ...prev, bonDeCommande: base64 }) )}/>                    </label>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF pas plus de  10MB</p>
                </div>
              </div>
            </div>
      <Box className="form-group" sx={{ ...styleBtn }}>
        <Button variant="contained" color="primary" type="submit">
          Confirmer
        </Button>
      </Box>
    </form>
  </div>
</Box>
 );
}