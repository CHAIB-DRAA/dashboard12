import React from 'react';
import { Box, List, ListItem, ListItemText, Typography, useTheme } from "@mui/material";
import Maps from '../components/maps';
import Header from '../components/Header';
import Card from '../components/Card';

const Accueil = () => {
  return (
    <>
    <Box m="20px">
    <Header title="Accueill" subtitle="Bienvenue dans votre page d'acceuill" className="mr-3" />
    <Card />
    </Box>
    </>
    )
}

export default Accueil