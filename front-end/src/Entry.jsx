
import { useRef, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Home from './Home.jsx';
import axios from 'axios';

function Entry() {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status

  const handleCreateAccountClick = async () => {
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    try {
      const response = await axios.post('http://localhost:9999/auth/create', { username, password });

      if (response.data.mayGantongUsernameNa) {
        console.log('Username already exists!');
        alert('Username already exists!');
      } else if (response.data.nakaGawaNaNewAccount) {
        console.log('Account created successfully!');
        alert('Account created successfully!');
      }
    } catch (error) {
      console.error('Error creating account:', error.response?.data || error.message);
    }
  };

  const handleLoginClick = async () => {
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    try {
      const response = await axios.post('http://localhost:9999/auth/login', { username, password });

      if (response.data.gumana) {
        setIsLoggedIn(true);
      } else {
        alert('MALI USERNAME O PASSWORD');
      }
    } catch (error) {
      console.error('Error logging in:', error.response?.data || error.message);
    }
  };

  return (
    <>
      {!isLoggedIn ? (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          padding: '40px',
          borderRadius: '20px',
          boxShadow: '0px 0px 30px rgba(0, 0, 0, 0.2)',
          gap: '20px',
        }}>
          <TextField
            inputRef={usernameRef}
            id="outlined-username"
            label="Username"
            variant="outlined"
          />
          <TextField
            inputRef={passwordRef}
            id="outlined-password"
            label="Password"
            variant="outlined"
            type="password"
          />
          <Button variant="outlined" onClick={handleCreateAccountClick}>Create Account</Button>
          <Button variant="outlined" onClick={handleLoginClick}>Login</Button>
        </div>
      ) : (
        <Home />
      )}
    </>
  );
}

export default Entry;

