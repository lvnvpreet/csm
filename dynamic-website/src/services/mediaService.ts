import { UploadApiResponse, v2 as cloudinary } from 'cloudinary';

export class MediaService {
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
}