import mongoose from "mongoose";
import { MONGO_URI } from "../environment.js";

export default function connectDB() {
	return mongoose
		.connect(MONGO_URI)
		.then(async () => {
			console.log(`MongoDB contectada en la ruta: ${MONGO_URI}`);
			await registerModels();
			return true;
		})
		.catch((error) => {
			console.log(`MongoDB no pudo conectarse. Error: ${error}`);
			return false;
		});
}

async function registerModels() {
    await import('../../user/user_entity.js');
    await import('../../doc/document_entity.js');
    await import('../../template/template_entity.js');
}