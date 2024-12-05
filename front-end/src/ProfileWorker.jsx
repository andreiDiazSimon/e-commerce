import React, { useState, useContext, useEffect } from 'react';
import { contextKo } from './LoginComponent';
import axios from 'axios'
const ProfileWorker = () => {
	console.clear()
	const contextDataResponseFromLogin = useContext(contextKo);
	console.log('useContext in ProfileWorker:', contextDataResponseFromLogin)

	let [fromResponseUpdateProfileData, setFromResponseUpdateProfileData] = useState(null)
	console.log('bigay ni backend from udpate data: ', fromResponseUpdateProfileData)

	// Initialize form data state
	const [formData, setFormData] = useState({
		aboutMe: '',  // Initialize About Me
		gender: '',
		phoneNumber: '',
		dateOfBirth: '',
		homeAddress: '',
	});
	const [isEditing, setIsEditing] = useState({
		gender: false,
		phoneNumber: false,
		dob: false,
		address: false,
		aboutMe: false,
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const profileData = {
			email: contextDataResponseFromLogin.userEmail,
			gender: formData.gender,
			phoneNumber: formData.phoneNumber,
			dob: formData.dateOfBirth,
			address: formData.homeAddress,
			aboutMe: formData.aboutMe
		};

		try {
			const response = await axios.put('http://localhost:9999/api/update-profile', profileData);
			alert('Profile updated successfully!');
			setFromResponseUpdateProfileData(response.data.updatedUser);
			console.log('Updated User:', response.data.updatedUser);
		} catch (error) {
			if (error.response) {
				alert(`Error: ${error.response.data.message}`);
			} else {
				console.error('Error updating profile:', error);
				alert('An unexpected error occurred.');
			}
		}
	};


	useEffect(() => {

		console.log(setFormData)
		const fetchProfileDetails = async () => {
			try {
				let response = await axios.get('http://localhost:9999/api/get_profile_details', {
					params: contextDataResponseFromLogin
				});
				// alert(JSON.stringify(response.data, null, 2));
				// Check if the response is not null and contains expected profile data
				if (response.data && response.data.gender != null) {
					setFromResponseUpdateProfileData(response.data);
				} else {
					setFromResponseUpdateProfileData(null);
				}
				console.log('get request sa profile details: ', response.data)
			} catch (error) {
				console.error('Error fetching profile details:', error);
				alert('Failed to fetch profile details.');
			}
		};

		fetchProfileDetails();
	}, [])


	let [stateSolelyForProfilePhoto, setStateSolelyForProfilePhoto] = useState(contextDataResponseFromLogin.profilePhoto)
	let [selectedPhotoForChangeProfilePhoto, setSelectedPhotoForChangeProfilePhoto] = useState(null)
	let handleChangeSelectFile = (e) => {
		setSelectedPhotoForChangeProfilePhoto(e.target.files[0])
	}

	let handleSelectFileClick = async () => {
		document.getElementById('ChangePhoto').click();
	};

	let handleFileUpload = async () => {
		let formData = new FormData();
		formData.append('email', contextDataResponseFromLogin.userEmail);
		formData.append('file', selectedPhotoForChangeProfilePhoto);
		try {
			let response = await axios.put('http://localhost:9999/api/update_profile_photo', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});
			setSelectedPhotoForChangeProfilePhoto(null)
			setStateSolelyForProfilePhoto(response.data.profile_photo)
			console.log('Response:', response.data);
		} catch (error) {
			console.error('Error uploading photo:', error);
		}
	}
	useEffect(() => {
		console.log(selectedPhotoForChangeProfilePhoto)
	})


	return (
		<div className="profile-container flex w-full h-screen bg-[#393E46] p-[1rem] gap-[1rem]">
			<input onChange={handleChangeSelectFile} type="file" name="file" id="ChangePhoto" className='hidden' />
			<div className="w-full bg-[#222831] p-[2rem] rounded-[2rem]">{/*BACKGROUND NA BLUEEEEE*/}
				<div className='flex justify-start align-center gap-[30px] mb-[30px]'>
					<div >
						<img
							className="rounded-[50%] w-[150px] h-[150px] object-cover object-center"
							src={stateSolelyForProfilePhoto}
							alt="alternate"
						/>
						{
							selectedPhotoForChangeProfilePhoto == null ? (
								<div
									className='transition-all text-[#b8b7b8] cursor-pointer mt-[10px] text-center italic font-[Poppins] hover:text-[white]'
									onClick={handleSelectFileClick}
								>
									Change Photo
								</div>
							) : (
								<div
									className='transition-all text-[#b8b7b8] cursor-pointer mt-[10px] text-center italic font-mono hover:text-[white]'
									onClick={handleFileUpload}
								>
									Upload Photo?
								</div>
							)
						}
					</div>
					<div className='flex flex-col justify-center align-center'>
						<div className='border-b-[1px] pb-[1.5rem] leading-[0.9] text-[#b8b7b8] text-[45px] font-sans italic mb-[10px] font-black text-center'>{contextDataResponseFromLogin.userName}</div>
						<div className=' text-[#b8b7b8] text-[15px] tracking-[30px]  text-center font-[Poppins]'>{contextDataResponseFromLogin.userType}</div>
					</div>
				</div>

				<div className="p-[30px] w-full h-auto bg-[#b8b7b8] rounded-[50px] ">
					<div className='text-[1.3em] text-[#16202c]'><span className='text-[Black] font-[Poppins]' >Email: </span><span className='font-black text-[1.2em] italic '>{contextDataResponseFromLogin.userEmail}</span></div>

					{fromResponseUpdateProfileData == null && (
						<form id="formProfileWorker" onSubmit={handleSubmit}>
							{/* About me textarea */}
							<div className='flex gap-[10px] mt-[1em]  w-[70%]'>
								<div className='mb-[1em]'>
									<div className='text-[1.3em] text-[black] font-[Poppins]'>About me</div>
									<textarea
									cols="100"
										id="text-area"
										name="aboutMe" // Add a name for form tracking
										value={formData.aboutMe} // Bind textarea to formData
										onChange={handleChange} // Handle change for updating state
										className="w-full  p-2 border-b-2 border-[#16202c] focus:border-b-0 focus:outline-none rounded-t-lg"
										placeholder="Write about yourself"
									/>
								</div>
							</div>

							{/* Gender selection */}
							<div className='mb-[1em] flex gap-[1rem]'>
								<label htmlFor="gender" className='text-[#16202c] font-[Poppins] italic'>Gender:</label>
								<label>
									<input
										type="radio"
										name="gender"
										value="Male"
										checked={formData.gender === 'Male'}
										onChange={handleChange}
										required
									/>
									<span className='text-[#16202c] font-[Poppins]'>Male</span>
								</label>
								<label>
									<input
										type="radio"
										name="gender"
										value="Female"
										checked={formData.gender === 'Female'}
										onChange={handleChange}
										required
									/>
									<span className='text-[#16202c] font-[Poppins]'>Female</span>
								</label>
								<label>
									<input
										type="radio"
										name="gender"
										value="Other"
										checked={formData.gender === 'Other'}
										onChange={handleChange}
										required
									/>
									<span className='text-[#16202c] font-[Poppins]'>Other</span>
								</label>
							</div>

							{/* Phone Number */}
							<div className='mb-[1em] flex gap-[1rem]'>
								<label htmlFor="phoneNumber" className='text-[#16202c] font-[Poppins]  '>Phone Number:</label>
								<input
									type="number"
									id="phoneNumber"
									name="phoneNumber"
									placeholder="Enter phone number"
									className="bg-transparent border-0 border-b-2 border-[#16202c] focus:border-[#16202c] focus:outline-none placeholder-[#16202c] text-[#16202c]"
									value={formData.phoneNumber}
									onChange={handleChange}
									required
								/>
							</div>

							{/* Date of Birth */}
							<div className='mb-[1em] flex gap-[1rem]'>
								<label htmlFor="dateOfBirth" className='text-[#16202c] font-[Poppins]'>Date of Birth:</label>
								<input
									type="date"
									id="dateOfBirth"
									name="dateOfBirth"
									value={formData.dateOfBirth}
									className="bg-transparent border-0 border-b-2 border-[#16202c] focus:border-[#16202c] focus:outline-none placeholder-[#16202c] text-[#16202c]"
									onChange={handleChange}
									required
								/>
							</div>

							{/* Home Address */}
							<div className='mb-[1em] flex gap-[1rem]'>
								<label htmlFor="homeAddress" className='text-[#16202c] font-[Poppins]'>Address:</label>
								<input
									type="text"
									id="homeAddress"
									name="homeAddress"
									placeholder="Enter home address"
									className="bg-transparent border-0 border-b-2 border-[#16202c] focus:border-[#16202c] focus:outline-none placeholder-[#16202c] text-[#16202c]"
									value={formData.homeAddress}
									onChange={handleChange}
									required
								/>
							</div>

							{/* Submit Button */}
							<div>
								<button type="submit" className='bg-[#16202c] text-[#e5e7eb] text-[1.2em] py-[1rem] px-[2rem] rounded-[20px]'>
									Submit
								</button>
							</div>
						</form>
					)}

					{fromResponseUpdateProfileData != null && (
						<div>
							<div className='text-[1.3em] text-[#16202c] '>
								Gender:
								<span className='font-black text-[1.2em] italic'>{fromResponseUpdateProfileData.gender}</span>
								<span className='text-blue-700 cursor-pointer ml-2'>Update</span>
							</div>
							<div className='text-[1.3em] text-[#16202c]'>
								Number:
								<span className='font-black text-[1.2em] italic'>{fromResponseUpdateProfileData.phone_number}</span>
								<span className='text-blue-700 cursor-pointer ml-2'>Update</span>
							</div>
							<div className='text-[1.3em] text-[#16202c]'>
								Date of Birth:
								<span className='font-black text-[1.2em] italic'>{fromResponseUpdateProfileData.dob}</span>
								<span className='text-blue-700 cursor-pointer ml-2'>Update</span>
							</div>
							<div className='text-[1.3em] text-[#16202c]'>
								Address:
								<span className='font-black text-[1.2em] italic'>{fromResponseUpdateProfileData.address}</span>
								<span className='text-blue-700 cursor-pointer ml-2'>Update</span>
							</div>
							<div className='text-[1.3em] text-[#16202c] mt-[1rem]'>
								<div className='flex flex-row items-center gap-2'>
									<div className='font-bold'>About Me</div>
									<div className='text-blue-500 cursor-pointer'>Update</div>
								</div>
								<div className='p-[1rem] bg-[white]'>{fromResponseUpdateProfileData.about_me}</div>
							</div>
						</div>
					)}
				</div>

			</div>

			<div className="w-full bg-[#222831] p-[1rem] rounded-[2rem] " >{/*BACKGROUND NA GRAYYYY*/}

				<h1 className="text-white text-center p-4">1 REVIEW (4.9)</h1>
				<div className='w-full bg-[white] text-[#1E201E] p-[1rem] rounded-[30px] shadow-xl'>
					<div className=''>
						<img src="" alt="" className='' />
						<div className=''>Joshua Paco</div>
					</div>
					<div className=''>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quos cupiditate quia nemo ipsa officia nam ut sint tempore incidunt consequatur.</div>
				</div>
			</div>
		</div>
	);
};

export default ProfileWorker;
