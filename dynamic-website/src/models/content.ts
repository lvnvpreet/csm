import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm"

@Entity()
export class Content {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title!: string;

    @Column('text')
    body!: string;

    @Column()
    author!: string;

    @Column()
    template!: string;

    @Column()
    slug!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    constructor(partial: Partial<Content> = {}) {
        Object.assign(this, partial);
    }
}

export class ContentModel {
    constructor(public content: Content) {}
}