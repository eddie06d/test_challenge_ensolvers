import { IsString } from "class-validator";

export class NoteDto {
    @IsString()
    title: string;
    @IsString()
    content: string;
    @IsString()
    categories: string;
    @IsString()
    updatedAt: string;
    @IsString()
    isArchived: string;
}