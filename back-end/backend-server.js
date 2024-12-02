// server.js (Node.js Express Server)
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const app = express();

const port = 9999;

app.use(express.json());
app.use(cors());

//create uploads dir kung wala
const uploadDir = "./uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

let upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}_${file.originalname}`); // Unique file name
    },
  }),
});

app.post("/create-account", upload.single("file"), async (req, res) => {
  const { chosenUserType, Name, Email, password } = req.body;
  console.log("request file: ", req.file);
  console.log("request body: ", req.body);

  try {
    await prisma.users.create({
      data: {
        user_type: chosenUserType,
        user_name: Name,
        user_email: Email,
        user_password: password,
        user_profile_photo_path: req.file.filename,
      },
    });
    res.status(200).send({ message: "Account created successfully" });
  } catch (e) {
    if (e.code === "P2002" && e.meta.target === "users_user_email_key") {
      console.error("Duplicate email error:");
      res.status(400).send({
        message:
          "The email address is already registered. Please use a different email.",
      });
    } else {
      console.error("Error creating user:", e);
      res.status(500).send({
        message: "An error occurred while creating the account.",
        error: e.message,
      });
    }
  }
});

app.get("/login", async (req, res) => {
  try {
    console.log("Received credentials from login: ", req.query, "\n");

    const user = await prisma.users.findUnique({
      where: {
        user_email: req.query.email,
      },
    });

    console.log(
      "Return value of Prisma for querying the unique email column: ",
      user
    );

    if (!user) {
      console.log("user not found in the prisma query");
      return res.status(404).send("Account does not exists");
    }

    if (req.query.password === user.user_password) {
      console.log(
        "user found and password match: ",
        "req.query ",
        req.query.email,
        " and ",
        "prisma ",
        user.user_email
      );

      // Construct URL for the profile photo
      const profilePhotoUrl = user.user_profile_photo_path
        ? `http://localhost:9999/photos/${user.user_profile_photo_path}`
        : `http://localhost:9999/photos/default.jpg`;

      console.log(profilePhotoUrl);
      return res.status(200).send({
        accountType: user.user_type,
        name: user.user_name,
        email: user.user_email,
        profilePhoto: profilePhotoUrl,
      });
    } else {
      console.log(
        "user found but password not match: ",
        "req.query ",
        req.query.password,
        " and ",
        "prisma ",
        user.user_email
      );
      return res.status(401).send("incorrect password");
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send("An error occurred during login");
  }
});

app.use("/photos", express.static("uploads"));

app.put("/api/update-profile", async (req, res) => {
  const { email, gender, phoneNumber, dob, address } = req.body;

  if (!email) {
    return res
      .status(400)
      .json({ message: "Email is required to update the profile." });
  }

  try {
    const updatedUser = await prisma.users.update({
      where: {
        user_email: email,
      },
      data: {
        gender: gender || undefined,
        phone_number: phoneNumber || undefined,
        dob: dob ? new Date(dob) : undefined,
        address: address || undefined,
      },
    });

    res.status(200).json({
      message: "Profile updated successfully.",
      updatedUser,
    });
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ message: "User not found." });
    }
    console.error("Error updating profile:", error);
    res
      .status(500)
      .json({ message: "An error occurred while updating the profile." });
  }
});

app.get("/api/get_profile_details", async (req, res) => {
  try {
    const { userEmail } = req.query;

    const profile_details = await prisma.users.findUnique({
      where: {
        user_email: userEmail,
      },
    });

    if (!profile_details) {
      return res.status(404).send({ message: "User not found" });
    }

    const profileDetailsResponse = {
      gender: profile_details.gender,
      phone_number: profile_details.phone_number,
      dob: profile_details.dob,
      address: profile_details.address,
    };

    res.status(200).json(profileDetailsResponse);
  } catch (error) {
    console.error("Error fetching profile details:", error);
    res.status(500).send({ message: "Error fetching profile details" });
  }
});

let update = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}_${file.originalname}`);
    },
  }),
});

app.put(
  "/api/update_profile_photo",
  update.single("file"),
  async (req, res) => {
    let { email } = req.body;
    if (!req.file) {
      return res.status(400).send({ message: "No file uploaded" });
    }
    try {
      const updatePhotoOfUser = await prisma.users.update({
        where: {
          user_email: email,
        },
        data: {
          user_profile_photo_path: req.file.filename,
        },
      });
      // Construct URL for the profile photo
      const profilePhotoUrl = updatePhotoOfUser.user_profile_photo_path
        ? `http://localhost:9999/photos/${updatePhotoOfUser.user_profile_photo_path}`
        : `http://localhost:9999/photos/default.jpg`;

      console.log(req.body);
      console.log(req.file);
      console.log(updatePhotoOfUser);
      res.status(200).send({
        profile_photo: profilePhotoUrl,
      });
    } catch (e) {
      console.log(e);
    }
  }
);

app.get("/api/worker_accounts", async (req, res) => {
  const workerAccounts = await prisma.users.findMany({
    select: {
      user_id: true,
      user_type: true,
      user_name: true,
      user_email: true,
      phone_number: true,
      dob: true,
      address: true,
      gender: true,
      user_profile_photo_path: true,
    },
  });
  console.log(workerAccounts);
  res.send({ worker_accounts: workerAccounts }); 
});

app.listen(port, () => {
  console.log(`Server running on port ${port}\n`);
});
