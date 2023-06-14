import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function EditRelation() {
 const [form, setForm] = useState({
  name: "",
   phone: "",
   service: "",
   zone:"",
   records:[],
 });
 const params = useParams();
 const navigate = useNavigate();
   const [startDate, setStartDate] = useState(new Date());

 useEffect(() => {
   async function fetchData() {
     const id = params.id.toString();
     const response = await fetch(`https://fullcalendar-backend.onrender.com/relation_autre/${params.id.toString()}`);
 
     if (!response.ok) {
       const message = `An error has occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const relation = await response.json();
     if (!relation) {
       window.alert(`relation with id ${id} not found`);
       navigate("/");
       return;
     }
 
     setForm(relation);
   }
 
   fetchData();
 
   return;
 }, [params.id, navigate]);
 
 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 
 async function onSubmit(e) {
   e.preventDefault();
   const editedPerson = {
    name: form.name,
    phone: form.phone,
    service: form.service,
    zone: form.zone,
   };
 
   // This will send a post request to update the data in the database.
   await fetch(`https://fullcalendar-backend.onrender.com/relation_autre/${params.id}`, {
     method: "PATCH",
     body: JSON.stringify(editedPerson),
     headers: {
       'Content-Type': 'application/json'
     },
   });
 
   navigate("/");
 }
 
 // This following section will display the form that takes input from the user to update the data.
 return (
   <div>
     <h3>Update relation</h3>
     <form onSubmit={onSubmit}>
       <div className="form-group">
         <label htmlFor="name">Name: </label>
         <input
           type="text"
           className="form-control"
           id="name"
           value={form.name}
           onChange={(e) => updateForm({ name: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="phone"> Téléphone: </label>
         <input
           type="text"
           className="form-control"
           id="phone"
           value={form.phone}
           onChange={(e) => updateForm({ phone: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="service">Service: </label>
         <input
           type="text"
           className="form-control"
           id="service"
           value={form.service}
           onChange={(e) => updateForm({ service: e.target.value })}
         />
          </div>   

           
           
       <div className="form-group">
         <label htmlFor="zone" className="mb-3">Zone</label>
         <input
           type="text"
           className="form-control"
           id="zone"
           value={form.zone}
           onChange={(e) => updateForm({zone: e.target.value })}
         />
       </div>
       <br />
 
       <div className="form-group">
         <input
           type="submit"
           value="Update relation"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
 );
}