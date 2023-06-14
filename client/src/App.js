


import React, {useMemo, useState, useEffect} from "react";
import "react-datetime/css/react-datetime.css";
import { supabase } from './supabase'
import Account from './pages/Account'
// We use Route in order to define the different routes of our application
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import {useSelector} from "react-redux";
import Skeleton,  { SkeletonTheme }  from 'react-loading-skeleton'

//  import all the components we need in our app
import { themeSettings } from "./theme";
import Navbar from "./components/Navbar";
import Calendar from "./pages/Calendrier"
import Client from "./pages/Clients";
import ClientId from "./pages/Client";
import Accueil from "./pages/Accueil";
import Login from "./pages/login";
// pages create
import Create from "./pages/create";
import CreatEvent from "./pages/CreatEvent";
import CreateRelation from "./pages/create-relation";
import CreateVtc from "./pages/create-vtc";
import CreateAutre from "./pages/create-autre";
import CreateCourse from "./pages/CreateCourse";
// page Edition
import Edit from "./pages/edit";
import EditEvent from "./pages/EditEvent";
import EditRelation from "./pages/edit-relation";
import EditVtc from "./pages/edit-vtc";
import EditAutre from "./pages/edit-autre";

//page Affichage 
import Depense from "./pages/Depense";
import ChauffeurTaxi from "./pages/ChauffeurTaxi";
import ChauffeurVtc from "./pages/ChauffeurVtc";
import Autre from "./pages/Autre";
import ChiffreAffaire from "./pages/ChiffreAffaire"; 
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./layout";
import useToken from './utils/useToken';

function setToken(userToken) {
  sessionStorage.setItem('token', JSON.stringify(userToken));
  console.log('setToken', userToken);

}

function getToken() {
  const tokenString = sessionStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  return userToken?.token
}
const App = () => {
  const { token, setToken } = useToken();

  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)),[mode]);

  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])
  if(!session){
    <Login />
  }  
    
 return (
<div className="app">
      <SkeletonTheme baseColor="#313131" highlightColor="#444">
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {!session ? <Login /> : 
            <Routes>
              
              <Route element={<Layout />}>

                <Route exact path="/" element={<Navigate to="/accueil" replace />} />
                <Route path="/accueil" element={<Accueil />} />
                <Route path="/Calendrier" element={<Calendar />} />
                <Route path="/clients" element={<Client />} />
                <Route path="/account" element={<Account key={session.user.id} session={session} />} />
                <Route path="/client/:id" element={<ClientId />} />
                <Route path="/dépenses" element={<Depense />} />
                <Route path="/gains" element={<ChiffreAffaire />} />
                <Route path="/Chauffeursdetaxi" element={<ChauffeurTaxi />} />
                <Route path="/ChauffeursVtc" element={<ChauffeurVtc />} />
                <Route path="/Autres" element={<Autre />} />
                <Route path="/events/:id" element={<EditEvent />} />
                <Route path="/edit/:id" element={<Edit />} />
                <Route path="/edit-relation/:id" element={<EditRelation />} />
                <Route path="/edit-vtc/:id" element={<EditVtc />} />
                <Route path="/edit-autre/:id" element={<EditAutre />} />
                <Route path="/create" element={<Create />} />
                <Route path="/CreatEvent" element={<CreatEvent />} />
                <Route path="/create-relation" element={<CreateRelation />} />
                <Route path="/create-vtc" element={<CreateVtc />} />
                <Route path="/create-autre" element={<CreateAutre />} />
                <Route path="/client/:id/createCourse" element={<CreateCourse />} />
              </Route>
            </Routes>}
          </ThemeProvider>
        </BrowserRouter>
      </SkeletonTheme>
    </div>
 )
};
 
export default App; 

