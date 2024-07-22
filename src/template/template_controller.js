import * as templateServices from './template_service.js'

export async function createTemplate(req,res){
    const {title,description,sections} = req.body;

    const result = await templateServices.createTemplate(title,description,sections);
    if (result.status !== 200) {
        return res.status(result.status).json({ error: result.error });
    }
    res.status(200).json({ message: result.message, templateId: result.templateId });

}