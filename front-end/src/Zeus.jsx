import loginBg from './assets/login-or-signin-bgi.png';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import logo from './assets/logo.png';
import Button from '@mui/material/Button';
import { useState } from 'react';
import LoginComponent from './LoginComponent';

import './style.css';

export function Zeus() {
	const [passwordVisible, setPasswordVisible] = useState(false);
	const [showThis, setShowThis] = useState('zeus');

	const togglePasswordVisibility = () => {
		setPasswordVisible(!passwordVisible);
	};


	const handleSignInClick = () => {
		setShowThis('loginsuccess');
		alert('ACCOUNT REGISTERED: NO LOGIC YET')
	};

	const handlebacktologin = () => {
		setShowThis('login');
	};

	return showThis === 'zeus' ? (
		<>
			<div
				className="w-full h-screen flex justify-end items-center relative"
				style={{
					backgroundImage: `url(${loginBg})`,
					backgroundSize: 'cover',
					backgroundPosition: 'center bottom',
					backgroundRepeat: 'no-repeat',
				}}
			>
				<div
					className="absolute top-0 left-0 w-full h-full"
					style={{
						background: 'rgba(128, 128, 128, 0.4)',
					}}
				/>
				<div
					className="absolute top-0 left-0 w-full h-full"
					style={{
						background: 'linear-gradient(140deg, rgba(0, 0, 0, 0) 50%, #b6b6b7 50%)',
					}}
				/>
				<div className="z-10 flex flex-col justify-center items-center mr-40">
					<div
						className="w-48 h-48 bg-contain bg-no-repeat bg-center filter drop-shadow-[0_0_10px_rgba(255,255,255,1)]"
						style={{ backgroundImage: `url(${logo})` }}
					></div>
					<div className="w-[450px] h-[450px] bg-[#1b1f2e] rounded-[40px] shadow-[30px_-30px_0px_rgba(27,31,46,0.5)] p-10 flex flex-col">
						<h2 className="text-white mb-5 text-xl font-bold font-poppins">SIGN UP</h2>
						<input
							type="text"
							id="Name"
							placeholder="Name"
							className="p-3 bg-white rounded-[20px] text-black text-sm mb-5"
						/>
						<input
							type="Email"
							id="Email"
							placeholder="Email"
							className="p-3 bg-white rounded-[20px] text-black text-sm mb-5"
						/>
						<div className="relative mb-5">
							<input
								type={passwordVisible ? 'text' : 'password'}
								id="password"
								placeholder="Password"
								className="p-3 bg-white rounded-[15px] text-black text-sm w-full box-border shadow-[10px_10px_10px_rgba(0,0,0,0.3)]"
							/>
							<span
								className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-lg text-gray-400"
								onClick={togglePasswordVisibility}
							>
								{passwordVisible ? <VisibilityOff /> : <Visibility />}
							</span>
						</div>
						<Button
							variant="contained"
							className="mb-5 font-poppins font-medium"
							onClick={handleSignInClick}
						>
							REGISTER
						</Button>
						<div className="flex justify-center items-center">
							<div className="text-white font-poppins font-medium">
								Back to
								<span className="ml-1 font-bold">
									<a
										href="#"
										onClick={handlebacktologin}
										className="text-white underline cursor-pointer font-poppins font-medium"
									>
										Login
									</a>
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	) : showThis === 'loginsuccess' ? (
		<LoginComponent />
	) : showThis === 'login' ? (
		<LoginComponent />
	) : null;
}

export default Zeus;
