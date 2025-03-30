import { Request, Response } from 'express';
import { ContentService } from '../services/contentService';

export class AdminController {
    private contentService: ContentService;

    constructor() {
        this.contentService = new ContentService();
    }

    public async getDashboard(req: Request, res: Response) {
        try {
            const contents = await this.contentService.getAllContents();
            res.render('admin/dashboard', { contents });
        } catch (error) {
            res.status(500).send('Server error');
        }
    }

    public async getEditor(req: Request, res: Response) {
        try {
            const contentId = parseInt(req.params.id);
            const content = await this.contentService.getContentById(contentId);
            if (!content) {
                return res.status(404).send('Content not found');
            }
            res.render('admin/editor', { content });
        } catch (error) {
            res.status(500).send('Server error');
        }
    }

    public async updateContent(req: Request, res: Response) {
        try {
            const contentId = parseInt(req.body.contentId);
            const success = await this.contentService.updateContent(contentId, req.body);
            if (success) {
                res.redirect('/admin/dashboard');
            } else {
                res.status(404).send('Content not found');
            }
        } catch (error) {
            res.status(500).send('Server error');
        }
    }
}

export default new AdminController();