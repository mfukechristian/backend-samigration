import express from "express";
import dotenv from "dotenv";
import visaRoutes from "./routes/visaRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON
app.use(express.json());

// Define routes
app.use("/api", visaRoutes);

// Start the server

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
