import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import Datetime from 'react-datetime';
import FileBase64 from 'react-file-base64';

export default function CreatEvent() {
  const navigate = useNavigate();
  const params = useParams();
  const [records, setRecords] = useState([]);
  const [form, setForm] = useState({
    clientId: "",
    start: "",
    end: "",
    title: "",
    addressDepart: "",
    addressArrive: "",
    image: "",
  });

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  useEffect(() => {
    async function getRecords() {
      const id = params.id.toString();
      const response = await fetch(`https://fullcalendar-backend.onrender.com/record/${id}`);

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const records = await response.json();
      setRecords(records);
      console.log(records._id);
    }

    getRecords();
    
    return;
  }, [params.id]);

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();

    // When a post request is sent to the create url, we'll add a new record to the database.
    const newPerson = { ...form };

    await fetch("https://fullcalendar-backend.onrender.com/courses", {
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
      clientId: '',
      start: "",
      end: "",
      title: "",
      addressDepart: "",
      addressArrive: "",
      image: "",
    });

    navigate("/");
  }

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
          <label htmlFor="address" className="mb-3">addressDepart</label>
          <input
            type="text"
            className="form-control"
            id="addressDepart"
            value={form.addressDepart}
            onChange={(e) => updateForm({ addressDepart: e.target.value })}
          />
        </div>
        <FileBase64
          multiple={false}
          onDone={({ base64 }) => updateForm({ image: base64 })}
        />

        <div className="form-group">
          <input
            type="hidden"
            className="form-control"
            id="clientId"
            value={records._id}
            onChange={(e) => updateForm({ clientId: e.target.value })}
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
