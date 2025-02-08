import { IsISBN, IsDateString, IsMongoId, IsIn } from "class-validator";

export class CreateBookDto {
  @IsISBN(13)
  isbn;

  @IsString()
  title;

  @IsDateString()
  publishedDate;

  @IsMongoId()
  author;

  @IsIn(["Available", "Borrowed"])
  status;
}
