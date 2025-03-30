import { Template } from '../models/template';
import { AppDataSource } from '../config/db';

export class TemplateService {
    private templateRepository = AppDataSource.getRepository(Template);

    public async getAllTemplates(): Promise<Template[]> {
        return await this.templateRepository.find();
    }

    public async getTemplateById(id: number): Promise<Template | null> {
        return await this.templateRepository.findOneBy({ id });
    }

    public async createTemplate(templateData: Partial<Template>): Promise<Template> {
        const template = this.templateRepository.create(templateData);
        return await this.templateRepository.save(template);
    }

    public async updateTemplate(id: number, templateData: Partial<Template>): Promise<boolean> {
        const result = await this.templateRepository.update(id, templateData);
        return result.affected ? result.affected > 0 : false;
    }

    public async deleteTemplate(id: number): Promise<boolean> {
        const result = await this.templateRepository.delete(id);
        return result.affected ? result.affected > 0 : false;
    }
}