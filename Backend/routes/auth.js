import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/user.js";
import { Pets } from "../models/pets.js";
import multer from "multer";
import mongoose from "mongoose";

const authRouter = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "profilepics/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const profilepics = multer({ storage: storage });

// SignUp API
authRouter.post("/signup", async (req, res) => {
  try {
    const { userName, email, password, confirmPassword } = req.body;
    const phoneNumber = "";
    const country = "";
    const state = "";
    const city = "";

    const profilephoto = "profilepics/default_profile_pic/default_pfp.jpg";
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(204).json({ message: "User already exists" });
    }
    if (password !== confirmPassword) {
      return res.status(201).json({ message: "Passwords do not match" });
    }

    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltRounds);
    const user = new User({
      userName,
      email,
      password: hashPassword,
      profilephoto,
      phoneNumber,
      country,
      state,
      city,
    });

    await user.save();
    res.status(200).json({ message: "Signup successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// LogIn API
authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    let existinguser = await User.findOne({ email });
    if (!existinguser) {
      return res.status(204).json({ message: "User doesn't exist" });
    }
    const matchPassword = await bcrypt.compare(password, existinguser.password);
    if (!matchPassword) {
      return res.status(201).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { userID: existinguser._id },
      process.env.JWT_SECRET_KEY
    );
    return res
      .status(200)
      .json({ message: "Login successful", token, existinguser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Fetch Profile Data
authRouter.get("/profiledata/:id", async (req, res) => {
  const userID = req.params.id;

  try {
    if (!mongoose.Types.ObjectId.isValid(userID)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
    const user = await User.findById(userID);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res
      .status(200)
      .json({ message: "User details received successfully", user });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error getting user details", error });
  }
});

// Update User Profile Photo
authRouter.put("/profilephoto/:id",profilepics.single("profilephoto"),
  async (req, res) => {
    try {
      const id = req.params.id;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }

      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      if (
        user &&
        user.profilephoto !== "profilepics/default_profile_pic/default_pfp.jpg"
      ) {
        try {
          fs.unlinkSync(user.profilephoto);
        } catch (err) {
          console.error("Error deleting image file:", err);
        }
      }

      // Update user's profile photo
      user.profilephoto = req.file.path.replace(/\\/g, "/");

      await user.save();

      res.status(200).json({ message: "Profile photo updated", user });
    } catch (err) {
      console.error("Error updating profile photo", err);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

// Update User Profile Data
authRouter.put("/updateprofiledata/:id", async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const { userName, email, phoneNumber, country, state, city } = req.body;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.userName = userName;
    user.email = email;
    user.phoneNumber = phoneNumber;
    user.country = country;
    user.state = state;
    user.city = city;
    await user.save();
    res.json(user);
  } catch (err) {
    console.error("Error in updating profile", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// API For Applying Adoption
authRouter.post("/updateadoptinglist/:id", async (req, res) => {
  const id = req.params.id;
  const { petid } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.adoptinglist.push({ petid });
    await user.save();
    res.status(200).json({ message: "Adoption Applied Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Fetch Multiple Users Data
authRouter.get("/fetchUsersData", async (req, res) => {
  const userIds = req.query.userIds.split(","); // Expect a comma-separated string of user IDs

  try {
    const users = await User.find({ _id: { $in: userIds } }).select(
      "_id userName email phoneNumber city state profilephoto"
    );
    res
      .status(200)
      .json({ message: "Users details received successfully", users });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error getting users details", error });
  }
});

// Enable Chat
authRouter.put("/enableChat", async (req, res) => {
  const { petId, applicantId } = req.body;

  try {
    const pet = await Pets.findOneAndUpdate({ _id: petId, "appliedBy.userid": applicantId },
      { $set: { "appliedBy.$.chatEnabled": true } },
      { new: true }
    );

    const user = await User.findOneAndUpdate({ _id: applicantId, "adoptinglist.petid": petId },
      { $set: { "adoptinglist.$.chatEnabled": true } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!pet) {
      return res.status(404).json({ message: "Pet not found" });
    }

    res.status(200).json({ message: "Chat enabled successfully", user });
  } catch (error) {
    console.error("Error enabling chat:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});


// Approve Applicant Request
authRouter.put("/approveApplicant", async (req, res) => {
  const { petId, applicantId } = req.body;

  try {
    const updatedPet = await Pets.findByIdAndUpdate(petId,{ $pull: { appliedBy: { userid: applicantId } } },{ new: true });

    const user = await User.findById(applicantId);

    if (user) {
      user.adoptinglist = user.adoptinglist.filter(item => item.petid !== petId);
      user.approvedlist.push({ petid: petId });
      await user.save();
    }

    if (!updatedPet) {
      return res.status(404).json({ message: "Pet not found" });
    }
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({message: "Applicant approved successfully", updatedPet });
  } catch (error) {
    console.error("Error approving applicant:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// Reject Applicant Request
authRouter.put("/rejectApplicant", async (req, res) => {
  const { petId, applicantId } = req.body;

  try {
    const updatedPet = await Pets.findByIdAndUpdate(petId,{ $pull: { appliedBy: { userid: applicantId } } },{ new: true });

    const user = await User.findById(applicantId);

    if (user) {
      user.adoptinglist = user.adoptinglist.filter(item => item.petid !== petId);
      user.rejectedlist.push({ petid: petId });
      await user.save();
    }

    if (!updatedPet) {
      return res.status(404).json({ message: "Pet not found" });
    }
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({message: "Applicant rejected successfully", updatedPet });
  } catch (error) {
    console.error("Error removing applicant:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

export default authRouter;
