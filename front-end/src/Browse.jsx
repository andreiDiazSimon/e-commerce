import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { contextKo } from './LoginComponent'

export default function Browse() {
	console.clear();
	let context = useContext(contextKo);
	console.log('useContext: ', context);

	// The current logged-in user's info is available in context
	const currentUserId = context.userId;

	const [workerAccounts, setWorkerAccounts] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const [selectedProfile, setSelectedProfile] = useState(null);

	const handleViewProfile = (profile) => {
		setSelectedProfile(profile);
		setShowModal(!showModal);
	};

	const handleMessage = async () => {
		if (!selectedProfile) return;

		const messageData = {
			sender_id: currentUserId,
			receiver_id: selectedProfile.user_id,
			message: "Are you available?",
		};

		try {
			const response = await axios.post("http://localhost:9999/api/messages", messageData);
			alert('Message Sent!')
		} catch (err) {
			console.error("Error sending message:", err);
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get("http://localhost:9999/api/worker_accounts");
				console.log(response);
				// Filter out the current logged-in user by their user_id
				const filteredWorkerAccounts = response.data.worker_accounts.filter(
					(worker) => worker.user_id !== currentUserId
				);
				setWorkerAccounts(filteredWorkerAccounts);
			} catch (err) {
				console.log(err);
			}
		};

		fetchData();
	}, [currentUserId]);

	return (
		<div className=" bg-gradient-to-r from-[#000000bf] w-[100%] h-[100vh]">
			<div className="flex flex-wrap">
				{workerAccounts.map((current, index) => (
					<div
						key={index}
						className="rounded-lg bg-[#0000002e] text-[#eaeaea] w-[250px] h-[250px] flex flex-col justify-center items-center m-[0.5rem]"
					>
						<img
							className="border rounded-full object-cover object-center w-[50%] h-[50%] overflow-hidden"
							src={`http://localhost:9999/photos/${current.user_profile_photo_path}`}
							alt={current.user_name}
						/>
						<div className="text-[1rem] font-bold">{current.user_name}</div>
						<div className="font-thin">{current.address}</div>
						<input
							className=" text-gray-900 bg-gray-100 hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 me-2 mb-2 cursor-pointer"
							type="button"
							value="View Profile"
							onClick={() => handleViewProfile(current)}
						/>
					</div>
				))}
			</div>

			{showModal && selectedProfile && (
				<div className="bg-[#0000007d] w-[100%] h-[100%] fixed top-0 left-0 z-[9999]">
					<div className="absolute top-0 left-0 w-[100%] h-[100%] bg-white p-[1rem]">
						<div className="overflow-auto p-[2rem]">
							<h1>id: {selectedProfile.user_id}</h1>
							<img
								className="rounded-full object-cover w-[150px] h-[150px] mx-auto mt-[1rem] shadow-lg"
								src={`http://localhost:9999/photos/${selectedProfile.user_profile_photo_path}`}
								alt="Profile Photo"
							/>
							<h2 className="text-[2rem] font-bold mb-[1rem]">
								{selectedProfile.user_name}
							</h2>
							<div className="font-medium mt-[1rem]">
								<p>
									<strong>Email:</strong> {selectedProfile.user_email}
								</p>
								<p>
									<strong>Phone:</strong> {selectedProfile.phone_number}
								</p>
								<p>
									<strong>Address:</strong> {selectedProfile.address}
								</p>
								<p>
									<strong>Gender:</strong> {selectedProfile.gender}
								</p>
								<p>
									<strong>DOB:</strong>{" "}
									{new Date(selectedProfile.dob).toLocaleDateString()}
								</p>
								<div>
									<strong>About Me:</strong>
									<div className="bg-[#eaeaea] p-[1rem]">
										{selectedProfile.about_me}
									</div>
								</div>
							</div>
							<div className="flex justify-between mt-[1rem]">
								<input
									className="cursor-pointer bg-[#171717] text-white p-[1rem] rounded-lg"
									type="button"
									value="Message Me!"
									onClick={handleMessage}
								/>
								<input
									className="cursor-pointer bg-[#171717] text-white p-[1rem] rounded-lg"
									type="button"
									value="Back"
									onClick={() => setShowModal(!showModal)}
								/>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
