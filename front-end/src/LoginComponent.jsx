import loginBg from './assets/login-or-signin-bgi.png';
import logo from './assets/logo.png';
import Button from '@mui/material/Button';
import { useState } from 'react';
import Zeus from './Zeus'; // Import Zeus component
import ChooseAccountType from './ChooseAccountType'
import Home from './Home'
import { Visibility, VisibilityOff } from '@mui/icons-material';


export function LoginComponent() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showHomePage, setShowHomePage] = useState(false); 
  const [showZeusComponent, setShowZeusComponent] = useState(false); 

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
  };

  const handleLoginClick = () => {
    setShowHomePage(true); 
  };

  const handleSignInClick = () => {
    setShowZeusComponent(true); 
  };

  return (
    <>
      {!showHomePage && !showZeusComponent ? (
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
              <h2 style={{ color: 'white', marginBottom: '20px', fontFamily: 'Poppins', fontWeight: '900'}}>LOGIN NOW</h2>

              <input
                type="Email"
                id="email"
                placeholder="Email"
                style={{
                  padding: '12px',
                  backgroundColor: 'white',
                  borderRadius: '15px',
                  color: 'black',
                  fontSize: '16px',
                  marginBottom: '20px',
                  boxShadow: '10px 10px 10px rgba(0,0,0,0.3)',
                }}
              />

              <div style={{ position: 'relative', marginBottom: '20px' }}>
                <input
                  type={passwordVisible ? 'text' : 'password'}
                  id="password"
                  placeholder="Password"
                  style={{
                    padding: '12px',
                    backgroundColor: 'white',
                    borderRadius: '15px',
                    color: 'black',
                    fontSize: '16px',
                    width: '100%',
                    boxSizing: 'border-box',
                    boxShadow: '10px 10px 10px rgba(0,0,0,0.3)',
                  }}
                />
                <span
              onClick={togglePasswordVisibility}
               style={{
                cursor: 'pointer',
                fontSize: '18px',
                color: 'black',
                position: 'absolute',
                top: '50%',
                right: '10px',
                transform: 'translateY(-39%)',
                
               }}
>
                {passwordVisible ? <VisibilityOff /> : <Visibility />}
              </span>
              </div>

            
              <Button
                variant="contained"
                style={{ marginBottom: '20px', fontFamily:'Poppins', fontWeight:'400'}}
                onClick={handleLoginClick}
              >
                Login
              </Button>

              <div style={{ display: 'flex', justifyContent: 'space-evenly', width: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <input
                    type="checkbox"
                    id="rememberMe"
                    checked={rememberMe}
                    onChange={handleRememberMeChange}
                  />
                  <label htmlFor="rememberMe" style={{ color: 'white',  fontFamily:'Poppins', fontWeight:'500'}}>
                    Remember me
                  </label>
                </div>

                <div style={{ color: 'white', cursor: 'pointer' }}>
                  <a href="#" style={{ textDecoration: 'none', color: 'white',  fontFamily:'Poppins', fontWeight:'500'}}>
                    Forgot password?
                  </a>
                </div>
              </div>

              <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
                <div style={{ color: 'white', fontSize: '16px', fontFamily:'Poppins', fontWeight:'500' }}>No Account?</div>
                <div>
                  <a
                    href="#"
                    onClick={handleSignInClick}
                    style={{ fontWeight: '900', color: 'white', textDecoration: 'none', fontSize: '16px', fontFamily:'Poppins', fontWeight:'bold'  }}
                  >
                    Sign In
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : showHomePage ? (
        <Home />
      ) : showZeusComponent ? ( 
        <Zeus />
      ) : <Zeus />}
    </>
  );
}

export default LoginComponent;
