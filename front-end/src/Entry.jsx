import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from 'axios'
import { useRef } from 'react';
export default function Entry() {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  const handleLogin = async () => {
    try {
      const username = usernameRef.current.value;
      const password = passwordRef.current.value;
      const response = await axios.post('http://localhost:9999/auth', { username, password });

      console.log(response.data);
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <>
      <div style={{
        padding: '40px',
        boxShadow: "0px 0px 20px rgba(139, 139, 139, 0.4)",
        display: "flex",
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: "20px",
        borderRadius: '30px'
      }}>
        <TextField id="filled-basic" label="username" variant="outlined" inputRef={usernameRef} />
        <TextField id="filled-basic" label="password" variant="outlined" inputRef={passwordRef} />
        <Button variant="contained" onClick={handleLogin}>Log In</Button>
      </div >
    </>
  )
}

