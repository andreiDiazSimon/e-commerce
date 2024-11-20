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
			return res.status(200).send(true);
		} else {
			console.log('user found but password not match: ', 'req.query ', req.query.password, ' and ', 'prisma ', user.user_email)
			return res.status(401).send('incorrect password');
		}
	} catch (error) {
		console.error('Error during login:', error);
		res.status(500).send('An error occurred during login');
	}
});






app.listen(port, () => {
	console.log(`Server running on port ${port}\n`);
});
