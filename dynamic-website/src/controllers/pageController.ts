import { Request, Response } from 'express';
import { ContentService } from '../services/contentService';

export class PageController {
    private contentService: ContentService;

    constructor() {
        this.contentService = new ContentService();
    }

    public getDynamicPage(req: Request, res: Response) {
        const { slug } = req.params;
        const content = this.contentService.getAllContents()
            .find(c => c.slug === slug);

        if (!content) {
            return res.status(404).render('404');
        }

        res.render('pages/dynamic', {
            page: { title: content.title },
            content
        });
    }
}