const express = require("express");
const noteRouter = require("./src/routes/noteRoutes");
const userRouter = require("./src/routes/userRoutes");
const app = express();
const dotenv = require("dotenv")
const cors = require("cors")

dotenv.config();

const mongoose = require("mongoose")

// The request body is always in form of String
// This will parse the request body to json, so that we can access it directly
app.use(express.json())

// This middleware will add some headers in all our responses
app.use(cors());

app.use("/users", userRouter);
app.use("/note", noteRouter)

app.get("/", (req, res) => {
    res.send("Notes API from Abizer Rampurawala")
})

const PORT = process.env.PORT || 5000

mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URL)
.then(() => {
    app.listen(PORT, () => {
        console.log("Server listening on port no." + PORT)
    })
})
.catch((error) => {
    console.log(error);
})