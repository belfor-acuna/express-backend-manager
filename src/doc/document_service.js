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
          sections:template.sections
      });
      return { message: "Documento creado con éxito", docId: newDoc._id, status: 200 };
  } catch (error) {
      return { error: error.message, status: 400 };
  }
}

export async function getMyDocs(userId){
    try{
        const docs = await Doc.find({owner:userId});
        return {docs : docs, status:200};
    }catch(error){
        return { error: error.message, status:400}
    }
}