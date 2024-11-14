import workerImg from './assets/worker.png'
import clientImg from './assets/client.png'
import loginBg from './assets/login-or-signin-bgi.png';
import logo from './assets/logo.png';
import './style.css'
import './styles/ChooseAccountType.css'

export default function ChooseAccountType() {
  return (
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
          <h2 style={{ color: 'white', marginBottom: '20px', fontFamily: 'Arial, sans-serif', fontWeight: '900' }}>SIGN IN</h2>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '30px', color: 'white' }}>Choose account type</div>


          <div className="card-container">
            <div className="card">
              <img src={workerImg} alt="Worker" className="card-image"></img >
              <div className="card-text">Worker</div>
            </div>

            <div className="card">
              <img src={clientImg} alt="Client" className="card-image"></img >
              <div className="card-text">Client</div>
            </div>
          </div>

          <div className="button-container">
            <button className="next-button">Next</button>
          </div>


          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
            <div style={{ color: 'white' }}>
              Back to
              <span style={{ marginLeft: '5px', fontWeight: 'bold' }}>
                <a href="#" style={{ color: 'white', textDecoration: 'underline', cursor: 'pointer' }}>
                  Login
                </a>
              </span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

