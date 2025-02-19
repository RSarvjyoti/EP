const express = require("express");
const {config} = require("dotenv");
const connectDB = require("./src/config/db");
const userRoute = require("./src/routes/userRoute");
config();

const app = express();

const PORT = process.env.PORT || 9080
const MONGO_URL = process.env.MONGO_URL

app.use(express.json());
app.use('/api/auth', userRoute);

app.listen(PORT, async () => {
    connectDB(MONGO_URL);
    console.log(`Server is running at http://localhost:${PORT}`);
});