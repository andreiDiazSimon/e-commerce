import './styles/Home.css'
import HPbg from './assets/home-page-background-image.png';

export default function Home() {
	return (
		<div className="w-full">

			{/* navbar Container */}
			<div className="flex justify-evenly items-center bg-gradient-to-r from-[#171717] to-[#444444] w-full">
				{/* Pogi (Logo) */}
				<div className="flex justify-center items-center mr-[500px]">
					<div className="w-[90px] h-[90px] bg-[url('./assets/logo.png')] bg-contain bg-no-repeat bg-center transition-all duration-300 hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]"></div>
				</div>

				{/* Content Container (Menu items) */}
				<div className="flex gap-[90px]">
					<div className="nav-item">HOME</div>
					<div className="nav-item">BROWSE</div>
					<div className="nav-item">PROFILE</div>
					<div className="nav-item">CHAT</div>
					<div className="nav-item">CONTACT</div>
				</div>
			</div>

			{/* Background Image (HPbg) */}
			<div
				className="w-full h-screen bg-cover bg-no-repeat bg-center"
				style={{
					backgroundImage: `url(${HPbg})`,
					filter: "blur(15px)",
				}}
			></div>
		</div>
	);
}
