require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
console.log("ENV KEYS:", Object.keys(process.env));
console.log("MONGO_URI:", process.env.MONGO_URI);

const app = express();
app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
    res.send("Dream closet api running");
});
connectDB();


const port = 3000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);


});
