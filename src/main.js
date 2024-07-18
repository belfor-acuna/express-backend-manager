import express from "express";
import { port } from "./config/environment.js";
import cors from 'cors';
import connectDB from './config/mongo/mongo_config.js'
import authRoutes from './auth/auth_routes.js'

const app = express();
app.use(express.json());

const allowedOrigins = {
  origin: 'http://localhost:5173/'
};
app.use(cors({
  origin:allowedOrigins
}));

app.use('/api/v1/auth', authRoutes)
app.use(cors());

async function startServer() {
  const isConnected= await connectDB();
  if(isConnected){
    app.listen(port, () => {
      console.log(`Backend T2R2 escuchando en ${port}`);
    });
  }
  else{
    console.log(`Server did not start on ${PORT}`)
		process.exit();
  }
}

startServer();