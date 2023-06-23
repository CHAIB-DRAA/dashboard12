import { useState } from 'react'
import { supabase } from '../supabase'
import '../style/login.css';
import { Box } from "@mui/material";
export default function Auth() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState(''); // password of the 
  const [username, setUsername] = useState(''); // username of the user
  const [Rmsg, setRMsg] = useState(''); // Registration message
  const [Lmsg, setLMsg] = useState(''); // Login message
  const [user, setUser] = useState(''); // User object after registration / login
  const [session, setSession] = useState(''); 
  const Login = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if(error){
      setLMsg(error.message)
    }else{
      setUser(data.user)
      setSession(data.session)
      
    }
  }
  return (
    <Box className="App" sx={{
      width: '20%',
      margin:'auto',
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
    }}>
     <h1 style={{margin:'auto', paddingBlock:'2rem' }} >Connexion</h1>
     <div>
     <p>Adresse mail:</p>
     <input type="email" style={{ width:'100%', height:'2rem' }}  onChange={(e) => setEmail(e.target.value)} placeholder="Entrez votre Adresse mail" />
     </div>
    
     <div>
    <p>Mot de passe</p>
    <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Entrez votre mot de passe"  style={{ width:'100%', height:'2rem' }} />
    </div>
    <br/>
      <button onClick={Login} style={{ width:'40%', margin:'auto', height:'2rem' }} > Se Connecter</button><br/>
    </Box>
  )
}