import loginBg from './assets/login-or-signin-bgi.png';
import logo from './assets/logo.png';
import Button from '@mui/material/Button';
import { useState } from 'react';
import Zeus from './Zeus'; // Import Zeus component
import HomePage from './HomePage'; // Import HomePage component (or whatever your homepage component is)

export function LoginComponent() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showHomePage, setShowHomePage] = useState(false); // State to control homepage rendering
  const [showZeusComponent, setShowZeusComponent] = useState(false); // State to control Zeus component rendering

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
  };

  const handleLoginClick = () => {
    setShowHomePage(true); // When Login button is clicked, show homepage
  };

  const handleSignInClick = () => {
    setShowZeusComponent(true); // When Sign In link is clicked, show Zeus component
  };

  return (
    <>
        <div
          style={{
            width: "100%",
            height: "100vh",
            backgroundImage: `url(${loginBg})`,
            backgroundSize: "cover",
            backgroundPosition: 'center bottom',
            position: "relative",
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "rgba(128, 128, 128, 0.4)",
            }}
          />

          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "linear-gradient(140deg, rgba(0, 0, 0, 0) 50%, #b6b6b7 50%)",
            }}
          />

          <div
            style={{
              zIndex: '999',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: '150px',
            }}
          >
            <div
              style={{
                width: '200px',
                height: '200px',
                backgroundImage: `url(${logo})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                filter: 'drop-shadow(0px 0px 10px rgba(255, 255, 255, 1))',
              }}
            ></div>

            <div
              style={{
                width: '450px',
                height: '450px',
                backgroundColor: '#1b1f2e',
                borderRadius: '40px',
                boxShadow: '30px -30px 0px rgba(27, 31, 46,0.5)',
                padding: '40px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <h2 style={{ color: 'white', marginBottom: '20px',fontFamily: 'sans-serif', fontWeight: '900' }}>SIGN UP</h2>
              <input
                type="text"
                id="Name"
                placeholder="Name"
                style={{
                  padding: '12px',
                  backgroundColor: 'white',
                  borderRadius: '20px',
                  color: 'black',
                  fontSize: '16px',
                  marginBottom: '20px',
                }}
              />
              <input
                type="Email"
                id="Email"
                placeholder="Email"
                style={{
                  padding: '12px',
                  backgroundColor: 'white',
                  borderRadius: '20px',
                  color: 'black',
                  fontSize: '16px',
                  marginBottom: '20px',
                }}
              />


              <div style={{ position: 'relative', marginBottom: '20px' }}>
                <input
                  type={passwordVisible ? 'text' : 'password'}
                  id="Password"
                  placeholder="Password"
                  style={{
                    padding: '12px',
                    backgroundColor: 'white',
                    borderRadius: '20px',
                    color: 'black',
                    fontSize: '16px',
                    width: '100%',
                    boxSizing: 'border-box',
                  }}
                />
                <span
                  onClick={togglePasswordVisibility}
                  style={{
                    cursor: 'pointer',
                    fontSize: '18px',
                    color: '#ccc',
                    
                  }}
                >
                  {passwordVisible ? '...hide' : '...unhide'}
                </span> 
              </div>

              {/* Login Button */}
              <Button
                variant="contained"
                style={{ marginBottom: '20px' }}
                onClick={handleLoginClick} // Handle login button click
              >
                REGISTER
              </Button>   
                </div>
              </div>
            </div>  
    </>
  );
}

export default LoginComponent;
