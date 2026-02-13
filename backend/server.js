const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
    res.send("Dream closet api running");
});
 
const port = 3000;

app.listen(port,() => {
    console.log(`server is running on port{port}`);

});
