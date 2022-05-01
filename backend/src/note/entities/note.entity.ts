import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('notes')
export class Note {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ type: 'varchar', length: 100 })
    title: string;
    @Column({ type: 'varchar', length: 255 })
    content: string;
    @Column({ type: 'varchar', length: 255 })
    categories: string;
    @Column({ type: 'varchar', length: 20 })
    updatedAt: string;
    @Column({ type: 'varchar', length: 20 })
    isArchived: string;
}