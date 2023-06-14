import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { updateEvent, deleteEvent } from "../api/events";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import Input from "@mui/material/Input";
import { Modal, Box, Typography, List, ListItem, ListItemText, Button } from "@mui/material";
import dayjs from "dayjs";
import "dayjs/locale/en";
import localizedFormat from "dayjs/plugin/localizedFormat";
import frLocale from "date-fns/locale/fr";
import FormGroup from '@mui/material/FormGroup';


dayjs.extend(localizedFormat);

const styleBtn = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "10px 20px",
  color: "white",
  borderRadius: "5px",
  cursor: "pointer",
};

export default function EventDetails() {
  const navigate = useNavigate();
  const params = useParams();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [event, setEvent] = useState(null);
  const [form, setForm] = useState({
    start: "",
    end: "",
    title: "",
    adressDepart: "",
    adressArrive: "",
    remarque: "",
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`http://localhost:5050/events/${params.id}`);

        if (!response.ok) {
          throw new Error(`An error has occurred: ${response.statusText}`);
        }

        const record = await response.json();
        if (!record) {
          throw new Error(`Record with id ${params.id} not found`);
        }

        setEvent(record);
        setForm(record);
      } catch (error) {
        window.alert(error.message);
        navigate("/calendrier");
      }
    }

    fetchData();
  }, [params.id, navigate]);

  const handleOpenConfirmation = () => {
    setShowConfirmation(true);
  };

  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
  };

  const handleSubmitDelete = async () => {
    try {
      await deleteEvent(params.id);
      navigate("/calendrier");
    } catch (error) {
      window.alert(error);
    }
  };

  const handleOpenEditModal = () => {
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  const updateForm = (value) => {
    setForm((prev) => {
      return { ...prev, ...value };
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateEvent(params.id, form);
      navigate(`/evenements/${params.id}`);
    } catch (error) {
      window.alert(error);
    }
  };

  if (!event) {
    return <Typography variant="h6">Chargement des données...</Typography>;
  }

  const {
    start,
    end,
    title,
    adressDepart,
    adressArrive,
    remarque,
  } = form;

  return (
    <Box sx={{ width: "50vw", margin: "auto", height: "75vh", marginTop: "2rem", display:'flex', gap:'3rem', flexDirection: 'column' }}>
      <Modal open={showEditModal} onClose={handleCloseEditModal} >
        <Box sx={{ p: 5, width: 500, height:'auto', m: 'auto' ,bgcolor:'#15110f',marginTop:'2rem' }}>
          <Typography variant="h6" mb={2}>
            Modifier l'événement
          </Typography>
          <FormGroup sx={{ display:"flex", gap:'2rem',marginTop:'2rem'}}>
          <Box className="form-group " sx= {{ display:'flex',gap:'3rem'}} >
          <LocalizationProvider dateAdapter={AdapterDayjs} locale="en">
        <div className="form-group">
    <DateTimePicker
      label="Date et heure de début"
      className="form-control"
      //value={new Date(form.start)}
      onChange={(value) => setForm((prev) => ({ ...prev, start: value.toISOString() }))}
      required
  minDate={ dayjs() }
    />
  </div>
  <div className="form-group">
    <DateTimePicker
      label="Date et heure de fin"
      className="form-control"
      //value={new Date(form.end)}
      onChange={(value) => setForm((prev) => ({ ...prev, end: value.toISOString() }))}
      required
      views={['year', 'month', 'day', 'hours', 'minutes']}
      minDate={ dayjs( form.start ) }
     
    />
  </div>
</LocalizationProvider>

            </Box>
            <div className="form-group flex first-letter:capitalize">
              <label htmlFor="title" className="mb-4">
                Client:
              </label>
              <Input
                fullWidth
                label="Client"
                sx={{
                  color: "success.main",
                }}
                type="text"
                color="primary"
                margin="dense"
                variant="outlined"
                id="title"
                value={title}
                onChange={(e) => updateForm({ title: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="adressDepart" className="mb-3">
                Adresse de départ:
              </label>
              <Input
                fullWidth
                type="text"
                className="form-control"
                id="adressDepart"
                placeholder="Adresse de départ"
                value={adressDepart}
                onChange={(e) => updateForm({ adressDepart: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="adressArrive" className="mb-3">
                Adresse d'arrivée:
              </label>
              <Input
                fullWidth
                type="text"
                className="form-control"
                id="adressArrive"
                value={adressArrive}
                onChange={(e) => updateForm({ adressArrive: e.target.value })}
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
                value={remarque}
                onChange={(e) => updateForm({ remarque: e.target.value })}
              />
            </div>
            <Box sx={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}>
            <Button
  variant="contained"
  color="primary"
  onClick={async (e) => {
    e.preventDefault();

    const newEvent = { ...form };

    try {
      // Supprimer l'ancien événement si nécessaire
      if (params.id) {
        await fetch(`http://localhost:5050/events/${params.id}`, {
          method: "DELETE",
        });
      }

      const response = await fetch("http://localhost:5050/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEvent),
      });

      if (!response.ok) {
        throw new Error("Une erreur s'est produite lors de l'enregistrement des données.");
      }

      setForm({
        start: "",
        end: "",
        title: "",
        adressDepart: "",
        adressArrive: "",
        remarque: "",
      });

      navigate("/calendrier");
    } catch (error) {
      window.alert(error);
    }
  }}
  sx={{ marginRight: "1rem" }}
  color="success"
>
  Enregistrer
</Button>

              <Button variant="contained" onClick={handleCloseEditModal} color='error'>
                Annuler
              </Button>
            </Box>
          </FormGroup>
          
        </Box>
      </Modal>

      <Typography variant="h4" mb={2}>
        Détails de l'événement
      </Typography>
      <List>
        <ListItem>
          <ListItemText primary="Date et heure de début" secondary={form.start} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Date et heure de fin" secondary={form.end} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Client" secondary={title} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Adresse de départ" secondary={adressDepart} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Adresse d'arrivée" secondary={adressArrive} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Remarque" secondary={remarque} />
        </ListItem>
      </List>

      <Box sx={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}>
        <Button variant="contained" color="primary" onClick={handleOpenEditModal} sx={{ marginRight: "1rem" }}>
          Modifier
        </Button>
        <Button variant="contained" color="error" onClick={handleOpenConfirmation}>
          Supprimer
        </Button>
      </Box>

      <Modal open={showConfirmation} onClose={handleCloseConfirmation}>
        <Box sx={{ p: 2, width: 400, margin:"2rem auto" }}>
          <Typography variant="h6" mb={2}>
            Confirmation de suppression
          </Typography>
          <Typography variant="body1" mb={2}>
            Êtes-vous sûr de vouloir supprimer cet événement ?
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center" ,}}>
            <Button variant="contained" color="error" onClick={handleSubmitDelete} sx={{ marginRight: "1rem" }}>
              Oui
            </Button>
            <Button variant="contained" onClick={handleCloseConfirmation}>
              Non
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
