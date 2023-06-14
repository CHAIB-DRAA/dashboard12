import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from '@mui/material/Button';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Skeleton,  { SkeletonTheme }  from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import SckeletonCard from '../components/SckeletonCard'
import Header from "../components/Header";
export default function ClientId() {
 const [form, setForm] = useState({
  start: "",
  end: "",
  title: "",
  adressDepart: "",
  adressArrive: "",
  remarque: "",
  bonDeCommande: "",
   records: [],
 });
 const params = useParams();
 const navigate = useNavigate();
 const [isLoading , setIsLoading] = useState(true);  
   const [startDate, setStartDate] = useState(new Date());
   function navigateCreateCourse(){
    navigate('./createCourse')
   };

 useEffect(() => {
   async function fetchData() {
     const id = params.id.toString();
     const response = await fetch(`http://localhost:5050/events/${params.id.toString()}`);
      
     if (!response.ok) {
       const message = `An error has occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const record = await response.json();
     if (!record) {
       window.alert(`Record with id ${id} not found`);
       navigate("/");
       return;
     }
 
     setForm(record);
     setIsLoading(false);

   }
 
   fetchData();
 
   return;
 }, [params.id, navigate]);
 
 // These methods will update the state properties.
 
 
 // This following section will display the form that takes input from the user to update the data.
 return (
  <>
  <Header  title=" Fiche du Client" subtitle="Toute les information à propos de la course " />
    {isLoading ? <SckeletonCard />
     
   :<div style={{
    display:"flex",
    flexDirection:"columns",
    margin:"auto",
    width:"80vw",
    justifyContent:"space-between",
    flexWrap: "wrap",
    padding: "1rem",
       border: "1px solid grey",
       borderRadius: "5px",
   }}>
     <form className="" 
     style={{
       display:"flex",
      flexDirection:"column",
       marginLeft:"2rem",
       flex: "1 1 auto"
      
      }}>
       <div>
        <h3> Nom du client :    <span style = {{ fontSize:"1rem", fontWeight:'normal' }}>{form.title  } </span> </h3>
       
       </div>
       <div>
         <h3> Téléphone du client : <span style = {{ fontSize:"1rem", fontWeight:'normal' }}>{form.phone } </span></h3>
     
       </div>
       <div>
        <h3> Adresse de Départ : <span style = {{ fontSize:"1rem", fontWeight:'normal' }}>{form.adressDepart } </span></h3>
       
       </div>
       <div>
        <h3> Adresse de D'Arrivé : <span style = {{ fontSize:"1rem", fontWeight:'normal' }}>{form.adressArrive } </span></h3>
       
      </div> 
       <div>
        <h3> Service Proposé : <span style = {{ fontSize:"1rem", fontWeight:'normal' }}>{form.service } </span></h3>
      </div> 
       <div>
        <h3> Date & Heure de Départ : <span style = {{ fontSize:"1rem", fontWeight:'normal' }}>{form.start } </span></h3>
      
        </div> 
       <div>
        <h3> Date & Heure de Retour : <span style = {{ fontSize:"1rem", fontWeight:'normal' }}>{form.end  } </span></h3>
     
        </div>
       <div>
        <h3> Remarque : <span style = {{ fontSize:"1rem", fontWeight:'normal' }}>{form.remarque }</span></h3>
         
         </div>
       
     </form>
     <div className="card-image waves-effect waves-block waves-light" >
            <img className="activator" style ={{  width: "40vw", height: "70vh",}} src={form.bonDeCommande } />
      </div>
     
  </div>}

</>
 );
}