import { Request, Response } from 'express';
import { TemplateService } from '../services/templateService';

export class TemplateController {
    private templateService: TemplateService;

    constructor() {
        this.templateService = new TemplateService();
    }

    public async getTemplates(req: Request, res: Response) {
        try {
            const templates = await this.templateService.getAllTemplates();
            res.render('admin/templates/list', { templates });
        } catch (error) {
            res.status(500).send('Server error');
        }
    }

    public async getTemplateEditor(req: Request, res: Response) {
        try {
            const templateId = parseInt(req.params.id);
            const template = templateId ? 
                await this.templateService.getTemplateById(templateId) : 
                null;
            res.render('admin/templates/template-editor', { template });  // Updated path
        } catch (error) {
            res.status(500).send('Server error');
        }
    }

    public async saveTemplate(req: Request, res: Response) {
        try {
            const templateId = parseInt(req.body.templateId);
            const templateData = {
                name: req.body.name,
                html: req.body.html,
                css: req.body.css,
                js: req.body.js,
                isActive: req.body.isActive === 'true'
            };

            if (templateId) {
                await this.templateService.updateTemplate(templateId, templateData);
            } else {
                await this.templateService.createTemplate(templateData);
            }
            res.redirect('/admin/templates');
        } catch (error) {
            res.status(500).send('Server error');
        }
    }
}