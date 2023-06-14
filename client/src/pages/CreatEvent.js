import React, { useState } from "react";
import { useNavigate } from "react-router";
import Datetime from 'react-datetime';

export default function CreatEvent() {
  const navigate = useNavigate();
 const [form, setForm] = useState({
   start: "",
   end: "",
   title: "",
   disc:""
 
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
 
   await fetch("https://fullcalendar-backend.onrender.com/CalendarControler", {
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
 
   setForm({ start: "", end: "", title: "",   disc:"" });
   
   navigate("/");
 }
  
 
 // This following section will display the form that takes the input from the user.
 return (
   <div className="m-5 p-5 bg-black text-white rounded">
             
     <h3>Créer un nouveau rendez-vous</h3>
     <form onSubmit={onSubmit}>
       <div className="form-group">
         <label htmlFor="name" className="mb-3">start</label>
         <Datetime
           type="date"
           className="form-control"
           id="start"
           value={form.start}
           onChange={value => updateForm({ start: value })}
         />
       </div>
       <div className="form-group ">
         <label htmlFor="end" className="mb-3">end</label>
         <Datetime
           type="date"
           className="form-control"
           id="end"
           value={form.end}
           onChange={value => updateForm({ end: value })}
         />
       </div>
       <div className="form-group ">
         <label htmlFor="title" className="mb-3">title</label>
         <input
           type="text"
           className="form-control"
           id="title"
           value={form.title}
           onChange={(e) => updateForm({ title: e.target.value })}
         />
       </div>
       <div className="form-group ">
         <label htmlFor="address" className="mb-3">discription</label>
         <input
           type="text"
           className="form-control"
           id="disc"
           value={form.disc}
           onChange={(e) => updateForm({ disc: e.target.value })}
         />
       </div>
      <div className="form-group">
         <input
           type="submit"
           value="Create person"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
 );
}