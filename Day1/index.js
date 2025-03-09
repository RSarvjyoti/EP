const express = require("express");
const {config} = require("dotenv");
const connectDB = require("./src/config/db");
config();
const CORS = require("cors");

const taskRoute = require("./src/routes/task.route");
const authRoute = require("./src/routes/auth.route");

const app = express();
const PORT = process.env.PORT || 8090
const MONGO_URL = process.env.MONGO_DB

app.use(express.json());
app.use(CORS());
app.use("/api/task", taskRoute);
app.use('/api/auth', authRoute);

app.get('/', (req, res) => {
    res.send("This is home route", req.ip, req.method);
})


app.listen(PORT, async () => {
    console.log(`Server is running at http://localhost:${PORT}`);
    connectDB(MONGO_URL);
})