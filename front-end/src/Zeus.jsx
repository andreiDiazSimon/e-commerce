import loginBg from './assets/login-or-signin-bgi.png';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import logo from './assets/logo.png';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import LoginComponent from './LoginComponent';
import axios from 'axios';


import './style.css';

export function Zeus({ chosenUserType }) {
	const [passwordVisible, setPasswordVisible] = useState(false);
	const [showThis, setShowThis] = useState('zeus');

	const [formData, setFormData] = useState({
		chosenUserType,
		Name: '',
		Email: '',
		password: ''
	});


	const handleInputChange = (e) => {
		const { id, value } = e.target;
		setFormData((prevState) => ({
			...prevState,
			[id]: value
		}));
	};

	const togglePasswordVisibility = () => {
		setPasswordVisible(!passwordVisible);
	};


	const handleSignInClick = async () => {
		if (!formData.Name || !formData.Email || !formData.password) {
			alert('Please fill in all the fields!');
			return;
		}

		const formattedMessage = `Register Account?\n
        Account Type: ${formData.chosenUserType}
		Name: ${formData.Name}
		Email: ${formData.Email}
		Password: ${formData.password}`
			;
		alert(formattedMessage);


		try {
			const response = await axios.post('http://localhost:9999/create-account', formData);

			if (response.status === 200) {
				console.log(response)
				alert('Account created successfully!');
				setShowThis('loginsuccess');
			}
		} catch (error) {
			console.error(error)
			alert(error.response.data.message);
		}
	};

	const handlebacktologin = () => {
		setShowThis('login');
	};


	// FOR TESTING
	useEffect(() => {
		console.log(formData)
	})


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
							onChange={handleInputChange}

						/>
						<input
							type="Email"
							id="Email"
							placeholder="Email"
							className="p-3 bg-white rounded-[20px] text-black text-sm mb-5"
							onChange={handleInputChange}

						/>
						<div className="relative mb-3">
							<input
								type={passwordVisible ? 'text' : 'password'}
								id="password"
								placeholder="Password"
								className="p-3 bg-white rounded-[20px] text-black text-sm w-full box-border shadow-[10px_10px_10px_rgba(0,0,0,0.3)]"
								onChange={handleInputChange}
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
							className="font-poppins font-bold "
							onClick={handleSignInClick}
						>
							REGISTER
						</Button>
						<div className="flex justify-center items-center">
							<div className="text-white font-poppins font-medium mt-[10px]">
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
