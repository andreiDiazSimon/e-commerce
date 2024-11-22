// server.js (Node.js Express Server)
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const app = express();

const port = 9999;

app.use(bodyParser.json());
app.use(cors());

// model users {
//   user_id       Int    @id @default(autoincrement())
//   user_type     String
//   user_name     String
//   user_email    String @unique
//   user_password String
// }

app.post('/create-account', async (req, res) => {
	const { chosenUserType, Name, Email, password } = req.body;

	console.log('Account to Create:', req.body);

	try {
		await prisma.users.create({
			data: {
				user_type: chosenUserType,
				user_name: Name,
				user_email: Email,
				user_password: password,
			},
		});

		res.status(200).json({ message: 'Account created successfully' });
	} catch (e) {
		if (e.code === 'P2002' && e.meta.target === 'users_user_email_key') {
			console.error('Duplicate email error:');
			res.status(400).json({
				message: 'The email address is already registered. Please use a different email.',
			});
		} else {
			console.error('Error creating user:', e);
			res.status(500).json({
				message: 'An error occurred while creating the account.',
				error: e.message,
			});
		}
	}
});



app.get('/login', async (req, res) => {
	try {
		console.log('Received credentials from login: ', req.query, '\n');

		const user = await prisma.users.findUnique({
			where: {
				user_email: req.query.email,
			},
		});

		console.log('Return value of Prisma for querying the unique email column: ', user);

		if (!user) {
			console.log('user not found in the prisma query')
			return res.status(404).send('Account does not exists');
		}

		if (req.query.password === user.user_password) {
			console.log('user found and password match: ', 'req.query ', req.query.email, ' and ', 'prisma ', user.user_email)
			return res.status(200).send({
				accountType: user.user_type,
				name: user.user_name,
				email: user.user_email
			});
		} else {
			console.log('user found but password not match: ', 'req.query ', req.query.password, ' and ', 'prisma ', user.user_email)
			return res.status(401).send('incorrect password');
		}
	} catch (error) {
		console.error('Error during login:', error);
		res.status(500).send('An error occurred during login');
	}
});







// PUT /api/update-profile
app.put('/api/update-profile', async (req, res) => {
	const { email, gender, phoneNumber, dob, address } = req.body;

	if (!email) {
		return res.status(400).json({ message: 'Email is required to update the profile.' });
	}

	try {
		const updatedUser = await prisma.users.update({
			where: { user_email: email },
			data: {
				gender: gender || undefined, // Only update if provided
				phone_number: phoneNumber || undefined,
				dob: dob ? new Date(dob) : undefined, // Convert to Date if provided
				address: address || undefined,
			},
		});
		console.log('profile details upadated!: ', updatedUser)
		res.status(200).json({
			message: 'Profile updated successfully.',
			updatedUser, // Return updated user details for confirmation
		});
	} catch (error) {
		if (error.code === 'P2025') {
			// Handle case when no user is found
			return res.status(404).json({ message: 'User not found.' });
		}
		console.error('Error updating profile:', error);
		res.status(500).json({ message: 'An error occurred while updating the profile.' });
	}
});



// Updated backend route for updating profile details
app.put('/api/update-profile', async (req, res) => {
	const { email, gender, phoneNumber, dob, address } = req.body;

	try {
		// Find the user by email and update their profile
		const updatedUser = await prisma.users.update({
			where: {
				user_email: email, // Use email from the request body
			},
			data: {
				gender,
				phone_number: phoneNumber,
				dob: new Date(dob), // Make sure to format date properly
				address,
			},
		});

		res.status(200).json({ updatedUser }); // Send the updated user back in the response
	} catch (error) {
		console.error('Error updating profile:', error);
		res.status(500).send({ message: 'Error updating profile details' });
	}
});

// Backend route for getting profile details
app.get('/api/get_profile_details', async (req, res) => {
	try {
		const { userEmail } = req.query; // Get email from query params

		const profile_details = await prisma.users.findUnique({
			where: {
				user_email: userEmail, // Use userEmail from the query string
			},
		});

		if (!profile_details) {
			return res.status(404).send({ message: 'User not found' });
		}

		const profileDetailsResponse = {
			gender: profile_details.gender,
			phone_number: profile_details.phone_number,
			dob: profile_details.dob,
			address: profile_details.address,
		};

		res.status(200).json(profileDetailsResponse);
	} catch (error) {
		console.error('Error fetching profile details:', error);
		res.status(500).send({ message: 'Error fetching profile details' });
	}
});


app.listen(port, () => {
	console.log(`Server running on port ${port}\n`);
});
