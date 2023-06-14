import React, { useState, useEffect } from "react";
import {  useTheme } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";
import "dayjs/locale/de";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { createEvent, getEvents, deleteEvent, updateEvent } from "../api/events"; // Import your API functions
import Header from "../components/Header";
import { tokens } from "../theme";
import Input from "@mui/material/Input";
import listPlugin from "@fullcalendar/list";
import googleCalendarPlugin from "@fullcalendar/google-calendar";
import { useNavigate } from "react-router-dom";
import { Modal, Box, Typography, List, ListItem, ListItemText, Button } from "@mui/material";
import frLocale from '@fullcalendar/core/locales/fr';
import FileBase64 from 'react-file-base64';



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
  gap: '4rem',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#4d547d',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
  color: '#191F45'
};

const Calendar = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [events, setEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    start: "",
    end: "",
    title: "",
    adressDepart: "",
    adressArrive: "",
    remarque: "",
    bonDeCommande: "",
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const loadEvents = async () => {
    try {
      const response = await getEvents();
      setEvents(response.data);
    } catch (error) {
      window.alert(`An error occurred: ${error.message}`);
    }
  };

  useEffect(() => {
    async function getEvents() {
      const response = await fetch(`https://fullcalendar-backend.onrender.com/events/`);
  
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }
  
      const events = await response.json();
      console.log(events.map(event => event._id));
   
      setEvents(events);
     
    }
  

    getEvents();
  
    return;
  }, []);

  const handleEventClick = (event) => {
    navigate(`/events/${event.id}`);
  };

  const handleEventDrop = async (event) => {
    try {
      const { id, extendedProps } = event.event;
      const { _id } = extendedProps;
      console.log(_id);
      // Perform the update operation using the _id
    } catch (error) {
      console.log(error);
    }
  };

  const handleDateClick = () => {
    navigate("/createEvent");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createEvent(form);
      setForm({
        start: "",
        end: "",
        title: "",
        adressDepart: "",
        adressArrive: "",
        remarque: "",
        bonDeCommande: "",
      });
      setOpen(false);
      loadEvents();
    } catch (error) {
      window.alert(`An error occurred: ${error.message}`);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      await deleteEvent(eventId);
      loadEvents();
    } catch (error) {
      window.alert(`An error occurred: ${error.message}`);
    }
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 600 }}>
          <div className="m-5 p-5 bg-black text-white rounded">
            <h3>Créer un nouveau rendez-vous</h3>
            <form onSubmit={handleSubmit} className="form-group flex flex-col text-red-500">
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
                  placeholder="Nom de Client"
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
                  placeholder="Adresse d'arrivée"

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
                  placeholder="Remarque"

                  value={form.remarque}
                  onChange={(e) => setForm((prev) => ({ ...prev, remarque: e.target.value }))}
                />
              </div> 
              <div className="form-group" style={{ margin: "3rem 0 3rem 0"}}>
                <label htmlFor="bonDeCommande" className="m-3 "style={{ marginRight: "5rem"}}>
                Bon De Commande:
                </label>
                <FileBase64
                 multiple={ false }
                 onDone={ ({base64}) => setForm((prev) => ({ ...prev, bonDeCommande: base64 }) )}/>
                </div> 
              <Box className="form-group" sx={{ ...styleBtn }}>
                <Button variant="contained" color="primary" type="submit">
                  Confirmer
                </Button>
              </Box>
            </form>
          </div>
        </Box>
      </Modal>
      <Box m="20px">
        <Header title="Calendrier" subtitle="Mes courses et rendez-vous" />

        <Box display="flex" justifyContent="space-between">
          {/* CALENDAR SIDEBAR */}
          <Box
            flex="1 1 20%"
            backgroundColor={colors.primary[400]}
            p="15px"
            borderRadius="4px"
            classeName="md:w-0"
          >
            <Typography variant="h5">Events</Typography>
            <List>
              {events?.map((event) => (
                <ListItem
                  key={event._id}
                  sx={{
                    backgroundColor: event.remarque === '' ? colors.greenAccent[700] : colors.redAccent[500],
                    margin: '10px 0',
                    borderRadius: '2px',
                  }}
                >
                  <ListItemText
                    primary={event.title}
                    secondary={<Typography>{event.remarque !== '' ? `"${event.remarque}"` : ''}</Typography>}
                    onClick={() => {
                      
                      navigate(`/events/${event._id}`);
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Box>

          {/* CALENDAR */}
          <Box flex="1 1 100%" ml="15px"  mr="2rem"
          >
            <FullCalendar
              height="70vh"
             
              locale  = 'fr'
             
              plugins={[
                dayGridPlugin,
                timeGridPlugin,
                interactionPlugin,
                listPlugin,
                googleCalendarPlugin,
              ]}
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                
                right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth',
              }}
              initialView="dayGridWeek"
              editable
              selectable
              selectMirror
              dayMaxEvents
              navLinks 
              select={handleOpen}
              
              eventDrop={(event) => {
                const id = event.event.id;
                const updatedEvent = {
                  _id: event.event.extendedProps._id,
                  start: event.event.start,
                  end: event.event.end,
                  title: event.event.title,
                  adressDepart: event.event.extendedProps.adressDepart,
                  adressArrive: event.event.extendedProps.adressArrive,
                  remarque: event.event.extendedProps.remarque,
                };
                updateEvent(id, updatedEvent);
              }}
              eventClick={(selected) => {
                const id = selected.event.id;
                navigate(`/events/${id}`);
              }}
              eventsSet={({ events }) => setCurrentEvents(events)}
          googleCalendarApiKey="AIzaSyBALf9vGiNAEBH-HYSqtqqHYirQ_zIVexA"
              eventSources={[
                {
                  googleCalendarId: 'mouss27001@gmail.com',
                  className: 'gcal-event',
                  color: 'green'
                },
                {
                   events: events && events.map((event) => ({
                    title: event.title,
                    start: event.start,
                    end: event.end,
                    id: event._id,
                    extendedProps: {
                      _id: event._id,
                      adressDepart: event.adressDepart,
                      adressArrive: event.adressArrive,
                      remarque: event.remarque,
                    },
                  })), 
                },
              ]}
              eventTimeFormat= {{ // like '14:30:00'
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                meridiem: false}
              }
              eventBackgroundColor= 'red'
              eventColor = 'black'

            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Calendar;
