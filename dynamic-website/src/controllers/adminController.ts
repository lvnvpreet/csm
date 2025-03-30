import { Request, Response } from 'express';
import { ContentService } from '../services/contentService';

export class AdminController {
    private contentService: ContentService;

    constructor() {
        this.contentService = new ContentService();
    }

    public getDashboard(req: Request, res: Response) {
        const contents = this.contentService.getAllContents();
        res.render('admin/dashboard', { contents });
    }

    public getEditor(req: Request, res: Response) {
        const contentId = parseInt(req.params.id);
        const content = this.contentService.getContentById(contentId);
        res.render('admin/editor', { content });
    }

    public async updateContent(req: Request, res: Response) {
        const contentId = parseInt(req.body.contentId);
        const updatedContent = req.body;
        updatedContent.updatedAt = new Date();
        
        const success = this.contentService.updateContent(contentId, updatedContent);
        if (success) {
            res.redirect('/admin/dashboard');
        } else {
            res.status(404).send('Content not found');
        }
    }
}

export default new AdminController();