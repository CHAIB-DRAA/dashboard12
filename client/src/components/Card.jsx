import React from 'react'
import { Modal, Box, Typography, List, ListItem, ListItemText, Button } from "@mui/material";
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
const Card = () => {
  return (
   
    <Box width = '20vw' >
      
      <Stack spacing={2}>
      <Skeleton variant="text" sx={{ fontSize: '3rem' }} />
      <Skeleton variant="rectangular" width={210} height={60} />
    </Stack>
    </Box>
    
      
  )
}

export default Card