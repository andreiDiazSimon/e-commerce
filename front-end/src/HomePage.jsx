
export default function HomePage() {
  const styles = {
    navbar: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: 'black',
      padding: '10px 20px',
    },
    logoContainer: {
      display: 'flex',
      justifyContent: 'left',
    },
    logo: {
      height: '40px',  // Adjust the size based on your logo
    },
    navItems: {
      display: 'flex',
      justifyContent: 'space-evenly',
      width: '40%',  // Adjust this width as needed
    },
    navLink: {
      color: 'white',
      textDecoration: 'none',
      fontSize: '16px',
      padding: '0 10px',
    },
    navLinkHover: {
      color: '#ddd',
    }
  };

  return (
    <div style={styles.navbar}>
      <div style={styles.logoContainer}>
        <img src="path-to-your-logo.png" alt="Logo" style={styles.logo} />
      </div>
      <div style={styles.navItems}>
        <a href="#" style={styles.navLink}>Home</a>
        <a href="#" style={styles.navLink}>Browse</a>
        <a href="#" style={styles.navLink}>Profile</a>
        <a href="#" style={styles.navLink}>Chat</a>
        <a href="#" style={styles.navLink}>Contact</a>
      </div>
    </div>
  );
}

