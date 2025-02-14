import dotenv from "dotenv";

dotenv.config();
const port = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const MY_EMAIL = process.env.MY_EMAIL;

export {port,MONGO_URI,CLIENT_ID,CLIENT_SECRET,REDIRECT_URI,REFRESH_TOKEN,MY_EMAIL}