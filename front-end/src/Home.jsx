
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import "./styles/entry.css";

export default function Home() {
  const [category, setCategory] = useState('');

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    <div className="navbar">
      <div className="left-container">
        <TextField id="outlined-basic" label="search" variant="outlined" />
        <FormControl variant="standard" className="category-select">
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={category}
            label="Category"
            onChange={handleChange}
          >
            <MenuItem value="healthcare">Healthcare</MenuItem>
            <MenuItem value="technology">Technology</MenuItem>
            <MenuItem value="education">Education</MenuItem>
            <MenuItem value="design">Design</MenuItem>
            <MenuItem value="marketing">Marketing</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" className="search-button">SEARCH</Button>
      </div>
      <Button variant="contained" className="login-button">Login</Button>
    </div>
  );
}

