import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NoteDto } from './dtos/note.dto';
import { Note } from './entities/note.entity';

@Injectable()
export class NoteService {
    constructor(
        @InjectRepository(Note)
        private readonly noteRepository: Repository<Note>
    ) {}

    async getMany(): Promise<Note[]> {
        return await this.noteRepository.find();
    }

    async getById(id: number) {
        const note = await this.noteRepository.findOne({where: {id}});
        if(!note) throw new NotFoundException('Note does not exist');
        return note;
    }

    async createOne(dto: NoteDto) {
        const note = this.noteRepository.create(dto);
        return await this.noteRepository.save(note);
    }

    async updateOne(id: number, dto: NoteDto) {
        const note = await this.noteRepository.findOne({where:{id}});
        if(!note) throw new NotFoundException('Note does not exist');
        const editedNote = Object.assign(note, dto);
        return await this.noteRepository.save(editedNote);
    }

    async deleteOne(id: number) {
        return await this.noteRepository.delete(id);
    }
}
