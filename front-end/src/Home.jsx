import './styles/Home.css'
import logo from './assets/logo.png';
import HPbg from './assets/HPbg.jpg';
export default function Home(){

    return  <div style={{width:'100%'}}>
        
        <div className="main-container">
    
   
   <div style={{
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
   }}>
 <div className="pogi"></div>
 </div>
   
    <div className="content-container">
      <div className="item">HOME</div>
      <div className="item">BROWSE</div>
      <div className="item">PROFILE</div>
      <div className="item">CHAT</div>
      <div className="item">CONTACT</div>
    </div>
  </div>
  


<div style={{
    width:'100%',
    height:'100vh',
    backgroundImage: `url(${HPbg})`,
    backgroundRepeat:'no-repeat',
    backgroundSize:'cover',
    backgroundPosition:'center left',
    filter: "brightness(25%) blur(5px) grayscale(15) ",
    


}}>

</div>


        </div>



}