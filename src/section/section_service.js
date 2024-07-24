import { getDocById } from '../doc/document_service.js';
import SectionStatus from './enum/section_status.js';

export async function updateSectionContent(docId, userId, sectionId, content) {
    const { doc: document, error, status } = await getDocById(docId, userId);

    if (status !== 200) {
        return { error, status };
    }

    const section = getSectionById(sectionId, document);

    if (!section) {
        return { error: "Sección no encontrada", status: 404 };
    }

    section.content = content;
    section.status = SectionStatus.EDITING;
    try {
        await document.save();
        return { message: "Contenido de la sección actualizado con éxito", status: 200 };
    } catch (error) {
        return { error: error.message, status: 400 };
    }
}

export async function updateSectionStatus(docId, userId, sectionId, status) {
    const { doc: document, error, status: docStatus } = await getDocById(docId, userId);

    if (docStatus !== 200) {
        return { error, status: docStatus };
    }

    const section = getSectionById(sectionId, document);

    if (!section) {
        return { error: "Sección no encontrada", status: 404 };
    }

    section.status = status;

    try {
        await document.save();
        return { message: "Estado de la sección actualizado con éxito", status: 200 };
    } catch (error) {
        return { error: error.message, status: 400 };
    }
}

function getSectionById(sectionId, document) {
    return document.sections.find(section => section.id.toString() === sectionId.toString());
}
