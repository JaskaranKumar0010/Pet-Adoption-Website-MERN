import express from "express";
import { Blog } from "../models/blog.js";
import multer from "multer";
import fs from "fs";
import { applyMiddleware } from "../middleware/auth.js";

const blogRouter = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

blogRouter.post("/create-blog", applyMiddleware, upload.single("image"), async (req, res) => {
  try {
    let image = req.body.image;

    if (!req.file && !image) {
      image = "./images/default_card_thumbnail/default_card-thumbnail.png";
    } else if (req.file) {
      image = req.file.path;
    }

    const { title, description } = req.body;
    const date = new Date();

    const blog = new Blog({ title, description, image, date });
    await blog.save();

    res.status(200).json({ message: "Blog Posted Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Blog Search API
blogRouter.get("/blogsearch", async (req, res) => {
  const { keyword } = req.query;
  try {
    if (!keyword) {
      return res.json([]);
    }
    const blogs = await Blog.find({
      title: { $regex: keyword, $options: "i" },
    });
    res.status(200).json(blogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Search APi using Title or PublishedDate
blogRouter.get('/blog/filterBlogs', async (req, res) => {
  const { title, publishedDate } = req.query;

  try {
    let filter = {};

    if (title) {
      filter.title = title;
    }

    if (publishedDate) {
      filter.publishedDate = publishedDate;
    }

    const blogs = await Blog.find(filter);

    res.status(200).json(blogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


blogRouter.get("/fetchblogs", async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

blogRouter.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.json(blog);
  } catch (error) {
    console.error("Error fetching blog:", error);
    res.status(500).json({ message: "Server error" });
  }
});

blogRouter.put("/updateblog/:id", upload.single("image"), async (req, res) => {
  try {
    const { title, description } = req.body;
    let updateFields = { title, description };

    if (req.file) {
      const blog = await Blog.findById(req.params.id);
      if (
        blog &&
        blog.image !==
          "./images/default_card_thumbnail/default_card-thumbnail.png"
      ) {
        try {
          fs.unlinkSync(blog.image);
        } catch (err) {
          console.error("Error deleting image file:", err);
        }
      }

      updateFields.image = req.file.path;
    }

    updateFields.date = new Date();

    const blog = await Blog.findByIdAndUpdate(req.params.id, updateFields, {
      new: true,
    });

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json({ message: "Blog updated successfully", blog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

blogRouter.delete("/deleteblog/:id", async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    if (
      blog.image !==
      "./images/default_card_thumbnail/default_card-thumbnail.png"
    ) {
      fs.unlinkSync(blog.image);
    }
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// API to post comment
authRouter.post("/updateadoptingist/:id", async (req, res) => {
  const id = req.params.id; // Corrected
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

// To delete a comment
blogRouter.delete("/:blogid/:commentid", async (req, res) => {
  const blogId = req.params.blogid;
  const commentId = req.params.commentid;

  try {
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not Found." });
      
    }
    blog.comments.pull(commentId);
    await blog.save();
    res.json(blog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route for updating a comment
blogRouter.patch("/:blogid/:commentid", async (req, res) => {
  const blogId = req.params.blogid;
  const commentId = req.params.commentid;
  const { text } = req.body;

  try {
    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found." });
    }

    // Find the index of the comment in the comments array
    const commentIndex = blog.comments.findIndex(
      (comment) => comment._id.toString() === commentId
    );

    // Check if the comment exists in the blog
    if (commentIndex === -1) {
      return res.status(404).json({ message: "Comment not found." });
    }

    blog.comments[commentIndex].text = text;
    await blog.save();

    res.json(blog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});




export default blogRouter;