import Template from './template_entity.js';

export async function findTemplate(templateId) {
    console.log("Buscando template con ID:", templateId);
    try {
        const template = await Template.findById(templateId);
        if (template) {
            console.log("Template encontrado:", template); 
            return { template:template, status: 200 };
        } else {
            return { error: "Template not found", status: 404 };
        }
    } catch (error) {
        console.error("Error al buscar el template:", error); 
        return { error: error.message, status: 400 };
    }
}


export async function createTemplate(title, description, sections) {
    try {
        const newTemplate = await Template.create({
            title,
            description,
            sections, 
        });
        return { message: "Template creado con éxito", templateId: newTemplate._id, status: 200 };
    } catch (error) {
        return { error: error.message, status: 400 };
    }
}


export async function getTemplates(){
    try{
        const templates = await Template.find();
        return {templates: templates, status:200};
    }catch(error){
        return { error: error.message, status: 400}
    }
}

export async function deleteTemplate(templateId) {
    try {
        const result = await Template.findByIdAndDelete(templateId);
        if (result) {
            return { message: "Template eliminado con éxito", status: 200 };
        } else {
            return { error: "Template no encontrado", status: 404 };
        }
    } catch (error) {
        return { error: error.message, status: 400 };
    }
}

export async function updateTemplate(templateId, title, description, sections) {
    try {
        const updatedTemplate = await Template.findByIdAndUpdate(
            templateId,
            {
                title,
                description,
                sections
            },
            { new: true } 
        );

        if (updatedTemplate) {
            return { message: "Template actualizado con éxito", status: 200 };
        } else {
            return { error: "Template no encontrado", status: 404 };
        }
    } catch (error) {
        return { error: error.message, status: 400 };
    }
}