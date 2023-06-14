import React, { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import CancelIcon from '@mui/icons-material/Close';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import * as locales from '@mui/material/locale';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Header from "../components/Header";



  
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
   GridToolbarExport
} from '@mui/x-data-grid';


 


export default function ChauffeursTaxi() {

 const [records, setRecords] = useState([]);
 const [locale, setLocale] = React.useState('frFR');

  
  const theme = useTheme();

  const themeWithLocale = React.useMemo(
    () => createTheme(theme, locales[locale]),
    [locale, theme],
  );
 // This method fetches the records from the database.
 useEffect(() => {
   async function getRecords() {
     const response = await fetch(`https://fullcalendar-backend.onrender.com/relation_taxi`);
 
     if (!response.ok) {
       const message = `An error occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const records = await response.json();
     setRecords(records);
   }
 
   getRecords();
 
   return;
 }, [records.length]);
 
 

function EditToolbar(props) {

  

  return (
    
    <GridToolbarContainer>
      <ThemeProvider theme={themeWithLocale}>
      <Button color="primary" startIcon={<AddIcon />}   onClick={() => navigate("/create-relation")}>
          Ajouter 
      </Button>
       <GridToolbarExport color="success" csvOptions={{ disableToolbarButton: true, pageStyle: '.MuiDataGrid-root .MuiDataGrid-main { color: rgba(0, 0, 0, 0.87); }' }} />
     </ThemeProvider>
    </GridToolbarContainer>
  );
}

EditToolbar.propTypes = {
  setRowModesModel: PropTypes.func.isRequired,
  setRows: PropTypes.func.isRequired,
};

 const [rows, setRows] = React.useState(records);
  const [rowModesModel, setRowModesModel] = React.useState({});
 const navigate = useNavigate();

  const handleRowEditStart = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleRowEditStop = (params, event) => {
    event.defaultMuiPrevented = true;
  };

 
  

   const handleDeleteClick = (id) => () => {
    async function deleteRow(){

      await fetch(`https://fullcalendar-backend.onrender.com/relation_taxi/${id}`, {
      method: "DELETE"
    });
  
    const newRecords = records.filter((el) => el._id !== id);
    setRecords(newRecords);
    }
    
    deleteRow();
    return ;
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    { field: 'name', headerName: 'Nom', width: 180, editable: true },
    { field: 'phone', headerName: 'Téléphone',  width: 400, type: 'number', editable: true },
    {
      field: 'service',
      headerName: 'Service',
      type: 'text',
      width: 180,
      editable: true,
    },
    {
      field: 'zone',
      headerName: 'Zone',
      type: 'text',
      width: 220,
      editable: true,
    },
    
    
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={() => navigate(`/edit-relation/${id}`)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];
 return (
  <>
  <Header  title="Les taxis partenaires" subtitle="Toute les taxis partenaires  " />
 
    <Box
      sx={{
        height: 500,
        width: '100%',
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
        padding:'2rem'
      }}
    >
       <ThemeProvider theme={themeWithLocale}>
      <DataGrid
         getRowId={(row) => row._id}
        rows={records}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStart={handleRowEditStart}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        loading={records.length === 0}
        slots={{
          toolbar: EditToolbar,

        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
        style={{ color: 'primary'}}
      />
      </ThemeProvider>
    </Box>
  
  </>
 );
}