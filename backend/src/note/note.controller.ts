import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { NoteDto } from './dtos/note.dto';
import { NoteService } from './note.service';

@ApiTags('Notes')
@Controller('notes')
export class NoteController {
    constructor(private readonly noteService: NoteService) {}

    @Get()
    async getMany() {
        const data = await this.noteService.getMany();
        return {
            message: 'Peticion correcta',
            data
        };
    }

    @Get(':id')
    getOne(@Param('id', ParseIntPipe) id: number) {
        return this.noteService.getById(id);
    }

    @Post()
    createOne(@Body() body: NoteDto) {
        return this.noteService.createOne(body);
    }

    @Put(':id')
    updateOne(@Param('id', ParseIntPipe) id: number, @Body() body: NoteDto) {
        return this.noteService.updateOne(id, body);
    }
    
    @Delete(':id')
    deleteOne(@Param('id', ParseIntPipe) id: number) {
        return this.noteService.deleteOne(id);
    }

}
