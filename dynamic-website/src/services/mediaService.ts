import { UploadApiResponse, v2 as cloudinary } from 'cloudinary';

export class MediaService {
    async uploadFile(file: Express.Multer.File): Promise<UploadApiResponse> {
        try {
            const result = await cloudinary.uploader.upload(file.path);
            return result;
        } catch (error) {
            throw new Error(`Failed to upload file: ${error.message}`);
        }
    }

    async deleteFile(publicId: string): Promise<boolean> {
        try {
            const result = await cloudinary.uploader.destroy(publicId);
            return result.result === 'ok';
        } catch (error) {
            throw new Error(`Failed to delete file: ${error.message}`);
        }
    }

    getPublicUrl(publicId: string): string {
        return cloudinary.url(publicId);
    }
}