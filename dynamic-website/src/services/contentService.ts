import { Content } from '../models/content';
import { AppDataSource } from '../config/db';

export class ContentService {
    private contentRepository = AppDataSource.getRepository(Content);

    public async getAllContents(): Promise<Content[]> {
        return await this.contentRepository.find();
    }

    public async getContentById(id: number): Promise<Content | null> {
        return await this.contentRepository.findOneBy({ id });
    }

    public async createContent(newContent: Partial<Content>): Promise<Content> {
        const content = this.contentRepository.create(newContent);
        return await this.contentRepository.save(content);
    }

    public async updateContent(id: number, updatedContent: Partial<Content>): Promise<boolean> {
        const result = await this.contentRepository.update(id, updatedContent);
        return result.affected ? result.affected > 0 : false;
    }

    public async deleteContent(id: number): Promise<boolean> {
        const result = await this.contentRepository.delete(id);
        return result.affected ? result.affected > 0 : false;
    }

    public async getContentCount(): Promise<number> {
        try {
            return await this.contentRepository.count();
        } catch (error) {
            console.error('Error getting content count:', error);
            throw error;
        }
    }
}