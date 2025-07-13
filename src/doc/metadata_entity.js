// models/metadata_entity.js
import mongoose from 'mongoose';

const metadataSchema = new mongoose.Schema({
  fechaPublicacion: {
    type: String,
    required: false,
  },
  fechaCierre: {
    type: String,
    required: false,
  },
  montoEstimado: {
    type: Number,
    required: false,
  },
  organismoLicitante: {
    type: String,
    required: false,
  },
  codigoIdentificacion: {
    type: String,
    required: false,
  },
  tipoLicitacion: {
    type: String,
    required: false,
  },
  descripcionBreve: {
    type: String,
    required: false,
  },
  // Otros campos de metadata
});

export default metadataSchema;
