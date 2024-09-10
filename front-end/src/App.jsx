
import React from 'react';
import axios from 'axios';

const App = () => {
  const handleClick = async () => {
    try {
      const response = await axios.post('http://localhost:9999/', {
        message: 'PINDOT GAGO'
      });

      console.log('Response from server:', response.data);
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };

  return (
    <div>
      <button onClick={handleClick}>CLICK ME</button>
    </div>
  );
};

export default App;

