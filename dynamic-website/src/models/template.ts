import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm"

@Entity()
export class Template {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column('text')
    html: string;

    @Column('text')
    css: string;

    @Column('text', { nullable: true })
    js: string;

    @Column()
    isActive: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}