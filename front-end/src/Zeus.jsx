import React, { useState } from 'react'; 

export default function Zeus() {
  const [role, setRole] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleNextClick = () => {
    // You can handle the Next button click here, e.g., form validation or navigation
    console.log('Proceeding with:', { username, password, role });
  };

  const handleBackToLogin = () => {
    // Logic to go back to the login page
    console.log('Returning to login...');
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Sign In</h2>
      <div style={styles.formGroup}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={handleUsernameChange}
          style={styles.input}
          required
        />
      </div>
      <div style={styles.formGroup}>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
          style={styles.input}
          required
        />
      </div>
      <div style={styles.formGroup}>
        <p>Choose your role:</p>
        <label>
          <input
            type="radio"
            value="Worker"
            checked={role === 'Worker'}
            onChange={handleRoleChange}
          />
          Worker
        </label>
        <label>
          <input
            type="radio"
            value="Client"
            checked={role === 'Client'}
            onChange={handleRoleChange}
          />
          Client
        </label>
      </div>
      <div style={styles.buttonGroup}>
        <button onClick={handleBackToLogin} style={styles.backButton}>
          Back to Login
        </button>
        <button onClick={handleNextClick} style={styles.nextButton}>
          Next
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '400px',
    margin: '0 auto',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    fontSize: '1.5rem',
    marginBottom: '10px',
  },
  formGroup: {
    marginBottom: '15px',
  },
  input: {
    width: '100%',
    padding: '8px',
    marginBottom: '10px',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  backButton: {
    padding: '10px 20px',
    backgroundColor: '#ddd',
    color: '#333',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  nextButton: {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};
 
