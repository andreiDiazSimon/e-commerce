import loginBg from './assets/login-or-signin-bgi.png';
import logo from './assets/logo.png';
import Button from '@mui/material/Button';
import { useState } from 'react';
import ChooseAccountType from './ChooseAccountType'
import Home from './Home'
import { Visibility, VisibilityOff } from '@mui/icons-material';

export function LoginComponent() {
	const [passwordVisible, setPasswordVisible] = useState(false);
	const [rememberMe, setRememberMe] = useState(false);
	const [showHomePage, setShowHomePage] = useState(false);
	const [showChooseAccountTypeComponent, setShowChooseAccountTypeComponent] = useState(false);

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
		setShowChooseAccountTypeComponent(true);
	};

	return (
		<>
			{!showHomePage && !showChooseAccountTypeComponent ? (
				<div
					className="w-full h-screen flex justify-end items-center relative"
					style={{
						backgroundImage: `url(${loginBg})`,
						backgroundSize: "cover",
						backgroundPosition: 'center bottom',
					}}
				>
					{/* Overlay (inline styles) */}
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

					{/* Gradient (inline styles) */}
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

					<div className="z-10 flex flex-col justify-center items-center mr-40">
						<div
							className="w-48 h-48 bg-contain bg-no-repeat bg-center filter drop-shadow-[0_0_10px_rgba(255,255,255,1)]"
							style={{ backgroundImage: `url(${logo})` }}
						></div>

						<div className="w-[450px] h-[450px] bg-[#1b1f2e] rounded-[40px] shadow-[30px_-30px_0px_rgba(27,31,46,0.5)] p-10 flex flex-col">
							<h2 className="text-white mb-5 text-xl font-bold font-poppins">LOGIN NOW</h2>

							<input
								type="Email"
								id="email"
								placeholder="Email"
								className="p-3 bg-white rounded-[15px] text-black text-sm mb-5 box-shadow-[10px_10px_10px_rgba(0,0,0,0.3)]"
							/>

							<div className="relative mb-5">
								<input
									type={passwordVisible ? 'text' : 'password'}
									id="password"
									placeholder="Password"
									className="p-3 bg-white rounded-[15px] text-black text-sm w-full box-sizing[border-box] shadow-[10px_10px_10px_rgba(0,0,0,0.3)]"
								/>
								<span
									onClick={togglePasswordVisibility}
									className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-lg text-gray-400"
								>
									{passwordVisible ? <VisibilityOff /> : <Visibility />}
								</span>
							</div>

							<Button
								variant="contained"
								className="mb-5 font-poppins font-medium"
								onClick={handleLoginClick}
							>
								Login
							</Button>

							<div className="flex justify-between items-center">
								<div className="flex items-center gap-2">
									<input
										type="checkbox"
										id="rememberMe"
										checked={rememberMe}
										onChange={handleRememberMeChange}
										className="text-white"
									/>
									<label htmlFor="rememberMe" className="text-white text-sm font-poppins font-medium">
										Remember me
									</label>
								</div>

								<div className="text-white cursor-pointer">
									<a href="#" className="text-white underline text-sm font-poppins font-medium">
										Forgot password?
									</a>
								</div>
							</div>

							<div className="mt-8 flex justify-center items-center gap-3">
								<div className="text-white text-sm font-poppins font-medium">No Account?</div>
								<div>
									<a
										href="#"
										onClick={handleSignInClick}
										className="text-white font-bold text-sm text-poppins"
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
			) : showChooseAccountTypeComponent ? (
				<ChooseAccountType />
			) : <ChooseAccountType />}
		</>
	);
}

export default LoginComponent;
