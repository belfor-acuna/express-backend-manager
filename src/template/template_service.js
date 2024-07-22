import Template from './template_entity.js';

export async function findTemplate(templateName) {
    try {
        const template = await Template.findOne({ title: templateName });
        if (template) {
            return { template, status: 200 };
        } else {
            return { error: "Template not found", status: 404 };
        }
    } catch (error) {
        return { error: error.message, status: 400 };
    }
}

export async function createTemplate(title,description,sections){
    try{
        const newTemplate = await Template.create({
            title,description,sections
        })
        return { message: "Template creado con éxito", templateId: newTemplate._id, status: 200};
    }catch(error){
        return { error: error.message, status: 400};
    }
}