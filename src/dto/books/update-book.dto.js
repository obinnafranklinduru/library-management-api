import {
  IsOptional,
  IsISBN,
  IsDateString,
  IsMongoId,
  IsIn,
} from "class-validator";

export class UpdateBookDto {
  @IsOptional()
  @IsISBN(13)
  isbn;

  @IsOptional()
  @IsString()
  title;

  @IsOptional()
  @IsDateString()
  publishedDate;

  @IsOptional()
  @IsMongoId()
  author;

  @IsOptional()
  @IsIn(["Available", "Borrowed"])
  status;
}
