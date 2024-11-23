import React, { useState, useContext, useEffect } from 'react';
import { contextKo } from './LoginComponent';
import axios from 'axios'
const ProfileWorker = () => {
	const contextDataResponseFromLogin = useContext(contextKo);
	console.log('context ito, log from ProfileWorker:', contextDataResponseFromLogin)

	let [fromResponseUpdateProfileData, setFromResponseUpdateProfileData] = useState(null)
	console.log('bigay ni backend from udpate data: ', fromResponseUpdateProfileData)

	// Initialize form data state
	const [formData, setFormData] = useState({
		gender: '',
		phoneNumber: '',
		dateOfBirth: '',
		homeAddress: ''
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
		<div className="profile-container flex w-full h-screen ">
			<input onChange={handleChangeSelectFile} type="file" name="file" id="ChangePhoto" className='hidden' />
			<div className="w-full bg-[#16202c] p-[30px]">{/*BACKGROUND NA BLUEEEEE*/}
				<div className='flex justify-center align-center gap-[30px] mb-[30px]'>
					<div>
						<img
							className="rounded-[50%] w-[200px] h-[200px] object-cover object-center"
							src={stateSolelyForProfilePhoto}
							alt="alternate"
						/>
						{
							selectedPhotoForChangeProfilePhoto == null ? (
								<div
									className='transition-all text-[#b8b7b8] cursor-pointer mt-[10px] text-center italic font-mono hover:text-[white]'
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
						<div className='leading-[0.9] text-[#b8b7b8] text-[50px] font-sans mb-[20px] font-black text-center'>{contextDataResponseFromLogin.userName}</div>
						<div className=' text-[#b8b7b8] text-[15px] font-mono font-thin italic tracking-[10px] mb-[20px] text-center'>{contextDataResponseFromLogin.userType}</div>
					</div>
				</div>

				<div className="p-[30px] w-full bg-[#b8b7b8] rounded-[50px] ">
					<div className='text-[1.3em] text-[#16202c]'>Email: <span className='font-black text-[1.2em] italic'>{contextDataResponseFromLogin.userEmail}</span></div>

					{fromResponseUpdateProfileData == null && (<form id="formProfileWorker" onSubmit={handleSubmit}>
						<div className='flex gap-[10px] mt-[1em] mb-[1em]'>
							<label htmlFor="gender" className='text-[#16202c] '>Gender:</label>
							<label>
								<input
									type="radio"
									name="gender"
									value="Male"
									checked={formData.gender === 'Male'}
									onChange={handleChange}
									className='text-[white] '
									required
								/>
								<span className='text-[#16202c]'>Male</span>
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
								<span className='text-[#16202c] '>Female</span>
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
								<span className='text-[#16202c]'>Other</span>
							</label>
						</div>

						<div className='mb-[1em]'>
							<label htmlFor="phoneNumber" className='text-[#16202c]'>Phone Number: </label>
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

						<div className='mb-[1em]'>
							<label htmlFor="dateOfBirth" className='text-[#16202c]'>Date of Birth: </label>
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

						<div className='mb-[1em]'>
							<label htmlFor="homeAddress" className='text-[#16202c]'>Address: </label>
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

						<div>
							<button type="submit" className='bg-[#16202c] text-[#e5e7eb] text-[1.2em] p-[20px] rounded-[20px]'>Submit</button>
						</div>
					</form>)}

					{fromResponseUpdateProfileData != null && (
						<div>
							<div className='text-[1.3em] text-[#16202c]'>Gender: <span className='font-black text-[1.2em] italic'>{fromResponseUpdateProfileData.gender}</span> </div>
							<div className='text-[1.3em] text-[#16202c]'>Number: <span className='font-black text-[1.2em] italic'>{fromResponseUpdateProfileData.phone_number}</span></div>
							<div className='text-[1.3em] text-[#16202c]'>Data of Birth: <span className='font-black text-[1.2em] italic'>{fromResponseUpdateProfileData.dob}</span></div>
							<div className='text-[1.3em] text-[#16202c]'>Address: <span className='font-black text-[1.2em] italic'>{fromResponseUpdateProfileData.address}</span></div>
						</div>

					)}
				</div>

			</div>

			<div className="w-full bg-[#b8b7b8]">{/*BACKGROUND NA GRAYYYY*/}

				<h1 className="text-white text-center p-4">gray Section</h1>
			</div>
		</div>
	);
};

export default ProfileWorker;
