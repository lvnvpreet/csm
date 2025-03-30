import { Request, Response } from 'express';
import { ContentService } from '../services/contentService';
import { TemplateService } from '../services/templateService';

export class AdminController {
    private contentService: ContentService;
    private templateService: TemplateService;

    constructor() {
        this.contentService = new ContentService();
        this.templateService = new TemplateService();
    }

    public async getDashboard(req: Request, res: Response) {
        try {
            const contents = await this.contentService.getAllContents();
            res.render('admin/dashboard', { 
                title: 'Admin Dashboard',
                page: 'dashboard',
                contents 
            });
        } catch (error) {
            console.error("Dashboard error:", error);
            res.status(500).send('Server error');
        }
    }

    public async getContentList(req: Request, res: Response) {
        try {
            const contents = await this.contentService.getAllContents();
            res.render('admin/content/list', { 
                title: 'Content Management',
                page: 'content',
                contents 
            });
        } catch (error) {
            console.error("Content list error:", error);
            res.status(500).send('Server error');
        }
    }

    public async getContentEditor(req: Request, res: Response) {
        try {
            const contentId = parseInt(req.params.id);
            const content = contentId ? 
                await this.contentService.getContentById(contentId) : 
                null;
            
            const templates = await this.templateService.getAllTemplates();
            
            res.render('admin/content/editor', { 
                title: content ? 'Edit Content' : 'New Content',
                page: 'content',
                content,
                templates 
            });
        } catch (error) {
            console.error("Content editor error:", error);
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
            console.error("Save content error:", error);
            res.status(500).send('Server error');
        }
    }

    public async deleteContent(req: Request, res: Response) {
        try {
            const contentId = parseInt(req.params.id);
            await this.contentService.deleteContent(contentId);
            res.redirect('/admin/content');
        } catch (error) {
            console.error("Delete content error:", error);
            res.status(500).send('Server error');
        }
    }

    // This method doesn't appear to be used correctly in your routes
    public async updateContent(req: Request, res: Response) {
        try {
            const contentId = parseInt(req.body.contentId);
            const content = {
                title: req.body.title,
                body: req.body.body
            };
            
            await this.contentService.updateContent(contentId, content);
            res.redirect('/admin/content');
        } catch (error) {
            console.error("Update content error:", error);
            res.status(500).send('Server error');
        }
    }
}

export default new AdminController();