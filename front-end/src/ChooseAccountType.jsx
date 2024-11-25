import workerImg from './assets/worker.png';
import clientImg from './assets/client.png';
import loginBg from './assets/login-or-signin-bgi.png';
import logo from './assets/logo.png';
import './style.css';
import LoginComponent from './LoginComponent';
import Zeus from './Zeus';
import { useState } from 'react';

export default function ChooseAccountType() {
	const [showThis, setShowThis] = useState('ito');
	let [workerOrClient, setWorkerOrClient] = useState(null)
	const handleLoginClick = () => {
		setShowThis('login');
	};
	const handleNextClick = () => {
		if (workerOrClient == null) return alert('Pick an Account Type!')
		setShowThis('zeus');
	};


	return (
		<>
			{showThis === 'zeus' && <Zeus chosenUserType={workerOrClient} />}
			{showThis === 'login' && <LoginComponent />}
			{showThis === 'ito' && (
				<div
					style={{
						width: '100%',
						height: '100vh',
						backgroundImage: `url(${loginBg})`,
						backgroundSize: 'cover',
						backgroundPosition: 'center bottom',
						position: 'relative',
						display: 'flex',
						justifyContent: 'flex-end',
						alignItems: 'center',
					}}
				>
					<div
						style={{
							position: 'absolute',
							top: 0,
							left: 0,
							width: '100%',
							height: '100%',
							background: 'rgba(128, 128, 128, 0.4)',
						}}
					/>

					<div
						style={{
							position: 'absolute',
							top: 0,
							left: 0,
							width: '100%',
							height: '100%',
							background: 'linear-gradient(140deg, rgba(0, 0, 0, 0) 50%, #b6b6b7 50%)',
						}}
					/>

					<div className="relative z-[999] flex flex-col items-center justify-center mr-36">
						<div
							className="w-48 h-48 bg-contain bg-no-repeat bg-center"
							style={{
								backgroundImage: `url(${logo})`,
								filter: 'drop-shadow(0px 0px 10px rgba(255, 255, 255, 1))',
							}}
						></div>

						<div className="w-[450px] bg-[#1b1f2e] rounded-[40px] shadow-[30px_-30px_0px_rgba(27,31,46,0.5)] p-10 flex flex-col">
							<h2 className="text-white mb-5 font-bold text-xl">SIGN IN</h2>
							<div className="flex justify-center mb-8 text-white">Choose account type</div>

							<div className="flex justify-evenly gap-5 mb-6">
								<div
									className={` cursor-pointer rounded-[40px] p-5 flex flex-col items-center text-center transition-all duration-300 ${workerOrClient === 'worker' ? 'bg-white' : 'bg-[#63686f] hover:bg-white'}`}
									onClick={async () => {
										await setWorkerOrClient('worker')
										console.log(workerOrClient)
									}}
								>
									<img src={workerImg} alt="Worker" className="w-36 mb-2" />
									<div className={`text-${workerOrClient === 'worker' ? 'black' : 'white'}`}>Worker</div>
								</div>

								<div
									className={`cursor-pointer rounded-[40px] p-5 flex flex-col items-center text-center transition-all duration-300 ${workerOrClient === 'client' ? 'bg-white' : 'bg-[#63686f] hover:bg-white'
										}`}
									onClick={async () => {
										await setWorkerOrClient('client')

										console.log(workerOrClient)
									}}
								>
									<img src={clientImg} alt="Client" className="w-36 mb-2" />
									<div className={`text-${workerOrClient === 'client' ? 'black' : 'white'}`}>Client</div>
								</div>
							</div>

							<div className="flex justify-center mb-6">
								<button
									className="w-72 py-5 bg-[#63686f] rounded-[40px] text-white border-none cursor-pointer transition-all duration-300 hover:bg-[white] hover:text-black"
									onClick={handleNextClick}
								>
									Next
								</button>
							</div>

							<div className="flex justify-center items-center">
								<div className="text-white">
									Back to
									<span className="ml-1 font-bold">
										<a
											onClick={handleLoginClick}
											href="#"
											className="text-white underline cursor-pointer"
										>
											Login
										</a>
									</span>
								</div>
							</div>
						</div>
					</div>
				</div >
			)
			}
		</>
	);
}
