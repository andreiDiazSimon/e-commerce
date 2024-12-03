import "./styles/Home.css";
import LoginComponent from "./LoginComponent";
import HomeUiWorker from "./HomeUiWorker";
import ProfileWorker from "./ProfileWorker";
import Browse from "./Browse";
import Chat from "./Chat";

import { useState } from "react";

export default function MainWorker() {
	let [showIto, setShowIto] = useState("home"); // Tracks the currently active component

	return (
		<div className="w-full">
			{/* Conditional rendering of the navbar */}
			{showIto !== "logout" && (
				<div className="flex justify-evenly items-center bg-gradient-to-r from-[#171717] to-[#444444] w-full">
					<div className="flex justify-center items-center mr-[500px]">
						<div className="w-[90px] h-[90px] bg-[url('./assets/logo.png')] bg-contain bg-no-repeat bg-center transition-all duration-300 hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]"></div>
					</div>

					{/* Navbar content */}
					<div className="flex gap-[70px] font-mono text-[1rem] italic">
						<div
							className="nav-item cursor-pointer"
							onClick={() => setShowIto("home")}
						>
							HOME
						</div>
						<div
							className="nav-item cursor-pointer"
							onClick={() => setShowIto("browse")}
						>
							BROWSE
						</div>
						<div
							className="nav-item cursor-pointer"
							onClick={() => setShowIto("profile")}
						>
							PROFILE
						</div>
						<div className="nav-item cursor-pointer" onClick={() => setShowIto("chat")}
						>CHAT</div>
						<div className="nav-item cursor-pointer">CONTACT</div>
						<div
							className="nav-item cursor-pointer"
							onClick={() => setShowIto("logout")}
						>
							LOGOUT
						</div>
					</div>
				</div>
			)}

			{/* Render components based on the state */}
			{showIto === "home" && <HomeUiWorker />}
			{showIto === "profile" && <ProfileWorker />}
			{showIto === "browse" && <Browse />}
			{showIto === "logout" && <LoginComponent />}
			{showIto === "chat" && <Chat />}
		</div>
	);
}
