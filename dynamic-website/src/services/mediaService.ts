import { UploadApiResponse, v2 as cloudinary } from 'cloudinary';
import { AppDataSource } from '../config/db';

export interface MediaItem {
    id: number;
    filename: string;
    filepath: string;
    mimetype: string;
    size: number;
    uploaded_by: number;
    created_at: Date;
}

export class MediaService {
    private db = AppDataSource;

    public async uploadFile(file: Express.Multer.File): Promise<UploadApiResponse> {
        try {
            return await cloudinary.uploader.upload(file.path);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
            throw new Error(`Failed to upload file: ${errorMessage}`);
        }
    }

    public async deleteFile(publicId: string): Promise<boolean> {
        try {
            const result = await cloudinary.uploader.destroy(publicId);
            return result.result === 'ok';
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
            throw new Error(`Failed to delete file: ${errorMessage}`);
        }
    }

    getPublicUrl(publicId: string): string {
        return cloudinary.url(publicId);
    }

    public async getMediaCount(): Promise<number> {
        try {
            const result = await this.db.query('SELECT COUNT(*) as count FROM media');
            // Add null check and provide default value
            return result?.rows?.[0]?.count || 0;
        } catch (error) {
            console.error('Error getting media count:', error);
            return 0;
        }
    }

    public async getAllMedia(): Promise<MediaItem[]> {
        try {
            const result = await this.db.query('SELECT * FROM media ORDER BY created_at DESC');
            return result.rows;
        } catch (error) {
            console.error('Error getting all media:', error);
            throw error;
        }
    }

    public async getMediaById(id: number): Promise<MediaItem | null> {
        try {
            const result = await this.db.query('SELECT * FROM media WHERE id = $1', [id]);
            return result.rows[0] || null;
        } catch (error) {
            console.error('Error getting media by id:', error);
            throw error;
        }
    }

    public async createMedia(data: Omit<MediaItem, 'id' | 'created_at'>): Promise<MediaItem> {
        try {
            const result = await this.db.query(
                `INSERT INTO media (filename, filepath, mimetype, size, uploaded_by)
                 VALUES ($1, $2, $3, $4, $5)
                 RETURNING *`,
                [data.filename, data.filepath, data.mimetype, data.size, data.uploaded_by]
            );
            return result.rows[0];
        } catch (error) {
            console.error('Error creating media:', error);
            throw error;
        }
    }

    public async deleteMedia(id: number): Promise<void> {
        try {
            await this.db.query('DELETE FROM media WHERE id = $1', [id]);
        } catch (error) {
            console.error('Error deleting media:', error);
            throw error;
        }
    }
}