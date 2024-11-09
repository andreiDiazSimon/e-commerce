
import loginBg from './assets/login-or-signin-bgi.png';
import logo from './assets/logo.png';
import Button from '@mui/material/Button';
import { useState } from 'react';

export function LogiOrSignin() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
  };

  return (
    <>
      {/* Background section */}
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
        {/* Dark overlay for background */}
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

        {/* Gradient overlay */}
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

        {/* Main content container */}
        <div
          style={{
            zIndex: '999',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: '400px',
          }}
        >
          {/* Logo with drop shadow */}
          <div
            style={{
              width: '200px',
              height: '200px',
              backgroundImage: `url(${logo})`,
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              filter: 'drop-shadow(0px 0px 10px rgba(255, 255, 255, 1))', // White shadow
            }}
          ></div>

          {/* Login form container */}
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
            <h2 style={{ color: 'white', marginBottom: '20px' }}>LOGIN NOW</h2>

            {/* Email input */}
            <input
              type="email"
              id="email"
              placeholder="email"
              style={{
                padding: '12px',
                backgroundColor: 'white',
                borderRadius: '10px',
                color: 'black',
                fontSize: '16px',
                marginBottom: '20px',
              }}
            />

            {/* Password input with visibility toggle */}
            <div style={{ position: 'relative', marginBottom: '20px' }}>
              <input
                type={passwordVisible ? 'text' : 'password'}
                id="password"
                placeholder="password"
                style={{
                  padding: '12px',
                  backgroundColor: 'white',
                  borderRadius: '10px',
                  color: 'black',
                  fontSize: '16px',
                  width: '100%',
                  boxSizing: 'border-box',
                }}
              />
              {/* Password visibility toggle */}
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

            {/* Login button */}
            <Button variant="contained" style={{ marginBottom: '20px' }}>
              Login
            </Button>

            {/* Remember me and Forgot password section */}
            <div style={{ display: 'flex', justifyContent: 'space-evenly', width: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {/* Remember me checkbox */}
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={handleRememberMeChange}
                />
                <label htmlFor="rememberMe" style={{ color: 'white' }}>
                  Remember me
                </label>
              </div>

              {/* Forgot password link */}
              <div style={{ color: 'white', cursor: 'pointer' }}>
                <a href="#" style={{ textDecoration: 'none', color: 'white' }}>
                  Forgot password?
                </a>
              </div>
            </div>

            {/* No account and Sign In link */}
            <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
              <div style={{ color: 'white', fontSize: '16px' }}>No Account?</div>
              <div>
                <a href="#" style={{ fontWeight: '900', color: 'white', textDecoration: 'none', fontSize: '16px' }}>
                  Sign In
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default LogiOrSignin;

