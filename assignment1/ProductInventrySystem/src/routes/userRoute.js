const {Router} = require("express");
const { signup, signin } = require("../controllers/userControllers");

const userRoute = Router();
userRoute.post('/signup', signup);
userRoute.post('/signin', signin);

module.exports = userRoute;