import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
export default function Entry() {
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
        <TextField id="filled-basic" label="username" variant="outlined" />
        <TextField id="filled-basic" label="password" variant="outlined" />
        <Button variant="contained">Log In</Button>
      </div >
    </>
  )
}

