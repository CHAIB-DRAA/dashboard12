import { Schema, model, models } from 'mongoose';

const CoursesSchema = new Schema({
  client: [ClientSchema]
  adressDepart: {
    type: String,
    required: [true, 'Adresse Depart est obligatoire.'],
  },
  adressArrive: {
    type: String,
    required: [true, 'adresse arrive est obligatoire.'],

  },
  dateDépart : {
        type: String,
        required: [true, 'date de départ est obligatoire.'],
  },
  dateArrive : {
    type: String,
    required : [true, 'date de départ est obligatoire.'],
  
},
bonDeCommande: {
    type: String,
}
});
const Client = new Schema({
  name:{
    type: String,
    required: [true, 'nom est obligatoire.'],
  },
  phone:{
    type: String,
    required: [true, 'nom est obligatoire.'],
  },
  mutuale:{
    type: String,
  },
});

const Client = models.Client || model('Client', ClientSchema);
const Courses = models.Courses || model('Courses', CoursesSchema);

export default Courses;