import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import visaRoutes from "./routes/visaRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", visaRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
