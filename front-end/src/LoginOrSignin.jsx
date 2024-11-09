
import loginBg from './assets/login-or-signin-bgi.png';

export function LogiOrSignin() {
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
            background: "linear-gradient(140deg, rgba(0, 0, 0, 0) 50%, rgba(128, 128, 128, 1) 50%)",
          }}
        />




      </div>
    </>
  );
}

export default LogiOrSignin;

