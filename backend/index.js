import "dotenv/config.js";
import express from "express";
import cors from "cors";
import connectDB from "./service/db.js";
import authRoutes from "./auth/authRoutes.js";
import userRoutes from "./auth/userRoutes.js";
import assessmentRoutes from "./auth/assessmentRoutes.js";
import retirementRoutes from "./auth/retirementRoutes.js";

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;

// Define basic route
app.get('/', (req, res) => {
    res.send('Express is running successfully!');
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/assessment", assessmentRoutes);
app.use("/api/retirement-analysis", retirementRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is live at http://localhost:${PORT}`);
});
