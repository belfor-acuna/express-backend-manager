import express from "express";
import { port } from "./config/environment.js";
import cors from 'cors';
import connectDB from './config/mongo/mongo_config.js';
import authRoutes from './auth/auth_routes.js';
import docRoutes from './doc/document_routes.js';
import templateRoutes from './template/template_routes.js';
import sectionRoutes from './section/section_routes.js';
import imageRoutes from './images/image_routes.js';

const app = express();
app.use(express.json());

const allowedOrigins = {
  origin: 'http://localhost:4173/'
};
app.use(cors({
  origin:allowedOrigins
}));

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/doc',docRoutes);
app.use('/api/v1/template', templateRoutes);
app.use('/api/v1/section', sectionRoutes)
app.use('/api/v1/images', imageRoutes)
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