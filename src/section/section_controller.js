import * as sectionService from '../section/section_service.js';

export async function updateSectionContent(req, res) {
    const { docId,sectionId, content } = req.body;
    const userId = req.user._id;
    try {
        const result = await sectionService.updateSectionContent(docId, userId, sectionId, content);
        return res.status(result.status).send({ ...result });
    } catch (error) {
        return { error: error.message, status: 400 }
    }
}

export async function updateSectionStatus(req, res) {
    const { status, sectionId,docId } = req.body;
    const userId = req.user._id;
    try {
        const result = await sectionService.updateSectionStatus(docId, userId, sectionId, status);
        return res.status(result.status).send({ ...result });

    } catch (error) {
        return { error: error.message, status: 400 }
    }
}