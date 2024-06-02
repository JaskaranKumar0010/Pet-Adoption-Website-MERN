import express from "express";
import { Pets } from "../models/pets.js";
import { User } from "../models/user.js";
import multer from "multer";
import fs from "fs";

const petRouter = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Post Adoption API
petRouter.post("/postadoption", upload.single("picture"), async (req, res) => {
  try {
    let picture = req.body.picture;

    if (!req.file && !picture) {
        picture = "./uploads/default_pet_thumbnail/default_pet_thumbnail.png";
    } else if (req.file) {
        picture = req.file.path;
    }

    const { petName, breed, gender, color, size, birthDate, location, owner } = req.body;
    const postedAT = new Date();

    const pet = new Pets({ petName, picture, breed, gender, color, size, birthDate, location, owner, postedAT });
    await pet.save();

    res.status(200).json({ message: "Adoption Posted Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Update Adoption API
petRouter.put("/updateadoption/:id", upload.single("image"), async (req, res) => {
  try {
    const { petName, breed, gender, color, size, birthDate, location } = req.body;
    let updateFields = { petName, breed, gender, color, size, birthDate, location };

    if (req.file) {
      const pet = await Pets.findById(req.params.id);
      if (pet && pet.picture !== "./uploads/default_pet_thumbnail/default_pet_thumbnail.png") 
        {
        try {
          fs.unlinkSync(pet.picture);
        } catch (err) {
          console.error("Error deleting image file:", err);
        }
      }
      updateFields.picture = req.file.path;
    }

    updateFields.postedAT = new Date();

    const pet = await Pets.findByIdAndUpdate(req.params.id, updateFields, {
      new: true,
    });

    if (!pet) {
      return res.status(404).json({ message: "Pet not found" });
    }

    res.status(200).json({ message: "Pet Adoption updated successfully", pet });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});


// Delete Pet Adoption
petRouter.delete("/deleteadoption/:id", async (req, res) => {
  try {
    const pet = await Pets.findByIdAndDelete(req.params.id);
    if (!pet) {
      return res.status(404).json({ message: "Pet not found" });
    }
    if (pet.picture !== "./uploads/default_pet_thumbnail/default_pet_thumbnail.png") {
      fs.unlinkSync(pet.picture);
    }

    const appliedBy = pet.appliedBy; // Assuming appliedBy is an array of user IDs
    if (appliedBy && appliedBy.length > 0) {
      await User.updateMany({ _id: { $in: appliedBy } },{ $pull: { adoptinglist: pet._id } });
    }

    res.status(200).json({ message: "Pet Adoption deleted successfully" });
  } catch (error) {
    console.error("Error deleting pet adoption:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Search APi using Title or PublishedDate
// blogRouter.get('/blog/filterBlogs', async (req, res) => {
//   const { title, publishedDate } = req.query;

//   try {
//     let filter = {};

//     if (title) {
//       filter.title = title;
//     }

//     if (publishedDate) {
//       filter.publishedDate = publishedDate;
//     }

//     const blogs = await Blog.find(filter);

//     res.status(200).json(blogs);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });



// Fetch Pets API
petRouter.get("/fetchpets", async (req, res) => {
  try {
    const pets = await Pets.find();
    res.status(200).json(pets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Fetch Single Pet Data by ID
petRouter.get("/:id", async (req, res) => {
  try {
    const pet = await Pets.findById(req.params.id);
    if (!pet) {
      return res.status(404).json({ message: "Pet not found" });
    }
    res.json(pet);
  } catch (error) {
    console.error("Error fetching pet:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Apply Adoption
petRouter.post("/updateappliedby/:petid", async (req, res) => {
  const petid = req.params.petid;
  const { userid } = req.body;

  try {
    const pet = await Pets.findById(petid);
    if (!pet) {
      return res.status(404).json({ message: "Pet not found" });
    }
    pet.appliedBy.push({ userid });
    await pet.save();
    res.status(200).json({ message: "Adoption Applied Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Fetch Multiple Pets Data
petRouter.post('/fetchPetsData', async (req, res) => {
  const petIds = req.query.petIds.split(','); // Expect a comma-separated string of pet IDs

  try {
    const pets = await Pets.find({ _id: { $in: petIds } }).select('_id picture petName birthDate breed location');
    res.status(200).json({ success: true, data: pets });
  } catch (error) {
    console.error("Error fetching pet data:", error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

export default petRouter;