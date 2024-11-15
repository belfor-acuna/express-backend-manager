import * as templateServices from './template_service.js'

export async function createTemplate(req,res){
    const {title,description,sections} = req.body;

    const result = await templateServices.createTemplate(title,description,sections);
    if (result.status !== 200) {
        return res.status(result.status).json({ error: result.error });
    }
    res.status(200).json({ message: result.message, templateId: result.templateId });

}

export async function getTemplates(req,res){
    const result = await templateServices.getTemplates();
    try{
        return res.status(result.status).send({ ...result });
    } catch (error) {
        return { error: error.message, status: 400 }
    }

}

export async function getOneTemplate(req,res){
    const {templateId} = req.params;
    const result = await templateServices.findTemplate(templateId);
    try{
        return res.status(result.status).send({ ...result });
    } catch (error) {
        return { error: error.message, status: 400 }
    }

}

export async function deleteTemplate(req, res) {
    const { id } = req.params;

    const result = await templateServices.deleteTemplate(id);
    if (result.status !== 200) {
        return res.status(result.status).json({ error: result.error });
    }
    res.status(200).json({ message: result.message });
}
