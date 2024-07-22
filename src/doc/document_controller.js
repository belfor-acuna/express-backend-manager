import * as docService from './document_service.js';

export async function createdoc(req, res) {
    const { title, template } = req.body;
    const userId = req.user._id;
    try {
        const result = await docService.createDoc(userId,title, template);
        return res.status(result.status).send({ ...result });

    }
    catch {
        return res.status(500).send({ error: error.message });
    }
}

export async function getMyDocs(req,res){
    const userId = req.user._id;
    try{
        const result = await docService.getMyDocs(userId);
        return res.status(result.status).send({...result});
    }
    catch {
        return res.status(500).send({ error: error.message });
    }
}