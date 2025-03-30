import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm"

@Entity()
export class Media {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    filename: string;

    @Column()
    publicId: string;

    @Column()
    url: string;

    @Column()
    mimeType: string;

    @Column()
    size: number;

    @Column()
    uploadedBy: string;

    @CreateDateColumn()
    createdAt: Date;
}