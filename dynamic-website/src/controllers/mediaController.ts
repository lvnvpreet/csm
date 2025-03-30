import { Request, Response } from 'express';
import { MediaService } from '../services/mediaService';

export class MediaController {
    private mediaService: MediaService;

    constructor() {
        this.mediaService = new MediaService();
    }

    public async uploadMedia(req: Request, res: Response) {
        try {
            if (!req.file) {
                return res.status(400).json({ message: 'No file uploaded' });
            }

            const result = await this.mediaService.uploadFile(req.file);
            res.json({
                url: result.secure_url,
                publicId: result.public_id
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    public async deleteMedia(req: Request, res: Response) {
        try {
            const { publicId } = req.params;
            const result = await this.mediaService.deleteFile(publicId);
            res.json({ success: result });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}