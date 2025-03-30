import { Request, Response } from 'express';
import { ContentService } from '../services/contentService';
import { Content } from '../models/content';

export class PageController {
    private contentService: ContentService;

    constructor() {
        this.contentService = new ContentService();
    }

    public async getDynamicPage(req: Request, res: Response) {
        try {
            const { slug } = req.params;
            const contents = await this.contentService.getAllContents();
            const content = contents.find((c: Content) => c.slug === slug);

            if (!content) {
                return res.status(404).render('404');
            }

            res.render('pages/dynamic', {
                page: { title: content.title },
                content
            });
        } catch (error) {
            console.error('Error getting dynamic page:', error);
            res.status(500).send('Server error');
        }
    }
}