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
            res.render('admin/dashboard', { 
                title: 'Admin Dashboard',
                contents 
            });
        } catch (error) {
            res.status(500).send('Server error');
        }
    }

    public async getContentList(req: Request, res: Response) {
        try {
            const contents = await this.contentService.getAllContents();
            res.render('admin/content/list', { 
                title: 'Content Management',
                contents 
            });
        } catch (error) {
            res.status(500).send('Server error');
        }
    }

    public async getContentEditor(req: Request, res: Response) {
        try {
            const contentId = parseInt(req.params.id);
            const content = contentId ? 
                await this.contentService.getContentById(contentId) : 
                null;
            res.render('admin/content/editor', { 
                title: content ? 'Edit Content' : 'New Content',
                content 
            });
        } catch (error) {
            res.status(500).send('Server error');
        }
    }

    public async saveContent(req: Request, res: Response) {
        try {
            const contentId = parseInt(req.body.contentId);
            const contentData = {
                title: req.body.title,
                body: req.body.body,
                author: req.user?.email || 'Anonymous',
                template: req.body.template,
                slug: req.body.slug
            };

            if (contentId) {
                await this.contentService.updateContent(contentId, contentData);
            } else {
                await this.contentService.createContent(contentData);
            }
            res.redirect('/admin/content');
        } catch (error) {
            res.status(500).send('Server error');
        }
    }

    public async deleteContent(req: Request, res: Response) {
        try {
            const contentId = parseInt(req.params.id);
            await this.contentService.deleteContent(contentId);
            res.redirect('/admin/content');
        } catch (error) {
            res.status(500).send('Server error');
        }
    }
}

export default new AdminController();