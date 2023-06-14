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
      
    }}>
     <h1 style={{ }} >Login</h1>
      email:<input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" /><br/>      Password:<input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Enter your Password" /><br/>
      <button onClick={Login}>Login</button><br/>
    </Box>
  )
}