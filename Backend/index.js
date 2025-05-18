import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import path from "path";
dotenv.config();
import authRouter from "./routes/auth.js";
import petRouter from "./routes/pets.js";
const app = express();
const port = process.env.PORT || 8000;
app.use(cors());
app.use(express.json());
app.use("/auth", authRouter);
app.use("/pet", petRouter);
// app.use((req, res, next) => {
//   console.log(`${req.method} ${req.url}`);
//   next();
// });




const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Use join to concatenate directory paths
app.use('/profilepics', express.static(path.join(__dirname, 'profilepics')));

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(
      " ------------------------------------------------ Database is connected ----------------------------------------------- "
    );
  })
  .catch((error) => {
    console.log("Database is not connected", error);
  });

app.listen(port, () => {
  console.log(` Server is running on http://localhost:${port}`);
});
