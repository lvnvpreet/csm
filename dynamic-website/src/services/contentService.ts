import { Content } from '../models/content';

export class ContentService {
    private contents: Content[] = [];

    constructor() {
        // Initialize with some default content if needed
    }

    public getAllContents(): Content[] {
        return this.contents;
    }

    public getContentById(id: number): Content | undefined {
        return this.contents.find(content => content.id === id);
    }

    public createContent(newContent: Content): void {
        this.contents.push(newContent);
    }

    public updateContent(id: number, updatedContent: Content): boolean {
        const index = this.contents.findIndex(content => content.id === id);
        if (index !== -1) {
            this.contents[index] = updatedContent;
            return true;
        }
        return false;
    }

    public deleteContent(id: number): boolean {
        const index = this.contents.findIndex(content => content.id === id);
        if (index !== -1) {
            this.contents.splice(index, 1);
            return true;
        }
        return false;
    }
}