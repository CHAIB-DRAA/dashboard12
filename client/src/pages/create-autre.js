import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function CreateRelation() {
  const navigate = useNavigate();
 const [form, setForm] = useState({
   name: "",
   phone: "",
  service: "",
   zone:"",
   
 });

 
 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 
 // This function will handle the submission.
 async function onSubmit(e) {
   e.preventDefault();
 
   // When a post request is sent to the create url, we'll add a new record to the database.
   const newPerson = { ...form };
 
   await fetch("https://fullcalendar-backend.onrender.com/relation_autre", {
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
 
   setForm({  
   name: "",
   phone: "",
  service: "",
   zone:"", });
   
   navigate("/");
 }
  
 
 // This following section will display the form that takes the input from the user.
 return (
   <div className="m-5 p-5 bg-black text-white rounded">
     <h3>Créer une nouvelle relation</h3>
     <form onSubmit={onSubmit}>
       <div className="form-group">
         <label htmlFor="name" className="mb-3">Nom</label>
         <input
           type="text"
           className="form-control"
           id="name"
           value={form.name}
           onChange={(e) => updateForm({ name: e.target.value })}
         />
       </div>
     
       
      
       <div className="form-group mt-3">
         <label htmlFor="position" className="mb-3">Téléphone</label>
         <input
           type="tel"
           className="form-control"
           id="phone"
           value={form.phone}
           onChange={(e) => updateForm({ phone: e.target.value })}
         />
       </div>
       <div className="form-group mt-3">
         <label htmlFor="profession" className="mb-3">Profession</label>
         <input
           type="text"
           className="form-control"
       id="profession"
           value={form.profession}
           onChange={(e) => updateForm({service: e.target.value })}
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
       <div className="form-group">
         <input
           type="submit"
           value="Creer"
           className="btn btn-primary"
         />
       </div>
       
     </form>
   </div>
 );
}