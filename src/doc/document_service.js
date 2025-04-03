import { findTemplate } from '../template/template_service.js';
import Doc from './document_entity.js';

export async function createDoc(userId, title, templateName) {
    const { template, error, status } = await findTemplate(templateName);
  
    if (status !== 200) {
      return { error, status };
    }
  
    try {
      const newDoc = await Doc.create({
        title: title,
        template: template._id,
        owner: userId,
        sections: template.sections,
        metadata: {
        },
      });
      return { message: 'Documento creado con éxito', docId: newDoc._id, status: 200 };
    } catch (error) {
      return { error: error.message, status: 400 };
    }
  }

  export async function getMyDocs(userId) {
    try {
      const docs = await Doc.find({ owner: userId })
      return { docs, status: 200 };
    } catch (error) {
      return { error: error.message, status: 400 };
    }
  }
  

export async function getDocById(docId, userId) {
    try {
        const doc = await Doc.findOne({ owner: userId, _id: docId });
        return { doc: doc, status: 200 };
    } catch (error) {
        return { error: error.message, status: 400 };
    }
}

export async function deleteDoc( docId, userId){
    try{
        const doc = await Doc.findOne({ owner: userId, _id: docId });
        if (!doc) {
            return { error: 'Documento no encontrado', status: 404 };
        }else{
            await Doc.deleteOne({ owner: userId, _id: docId });
            return { message: 'Documento eliminado con éxito', status: 200 };
        }
    }
    catch(error){
        return {error: error.message, status:400}

    }
}

export async function updateColor(docId,userId,color){
    try{
        const doc = await Doc.findOne({owner:userId, _id:docId});
        doc.color = color;
        await doc.save();
        return {message: `Color de documento actualizado con éxito`, status: 200}
    }catch(error){
        return {error: error.message, status:400}
    }
}

export async function updateTitle(docId,userId,title){
    try{
        const doc = await Doc.findOne({owner:userId, _id:docId});
        doc.title = title;
        await doc.save();
        return {message: `Titulo de documento actualizado con éxito`, status: 200}
    }catch(error){
        return {error: error.message, status:400}
    }
}


export async function getMetadata(docId, userId) {
  try {
      const doc = await Doc.findOne({ owner: userId, _id: docId });
      if (!doc) {
          return { error: 'Documento no encontrado', status: 404 };
      }
      // Inicializar metadata si está ausente
      if (!doc.metadata) {
          doc.metadata = {};
          await doc.save();
      }
      return { metadata: doc.metadata, status: 200 };
  } catch (error) {
      return { error: error.message, status: 400 };
  }
}

// Actualizar la metadata de un documento
export async function updateMetadata(docId, userId, metadata) {
  try {
      const doc = await Doc.findOne({ owner: userId, _id: docId });
      if (!doc) {
          return { error: 'Documento no encontrado', status: 404 };
      }
      // Inicializar metadata si está ausente
      if (!doc.metadata) {
          doc.metadata = {};
      }
      // Actualizar los campos de metadata
      doc.metadata = {
          ...doc.metadata,
          ...metadata,
      };
  
      await doc.save();
      return { message: 'Metadata actualizada con éxito', status: 200 };
  } catch (error) {
      return { error: error.message, status: 400 };
  }
}

