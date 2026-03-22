const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
require("dotenv").config();


const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const DreamRoute = require("./routes/DreamRoute");

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
const cors = require("cors");

app.use(cors({
    origin: [
        "http://localhost:8080",
        "https://dream-closet-5tyr.vercel.app"
    ],
    credentials: true
}));
app.use(express.json());

// Test route
app.get("/", (req, res) => {
    res.send("DreamCloset API running...");
});
const authRoutes = require("./routes/routeauth");

app.use("/api/auth", authRoutes);

// Dream routes
app.use("/api/dreams", DreamRoute);

// Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
