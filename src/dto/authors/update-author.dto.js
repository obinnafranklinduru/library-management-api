import { IsString, IsDateString, IsOptional } from "class-validator";

export class UpdateAuthorDto {
  @IsOptional()
  @IsString()
  name;

  @IsOptional()
  @IsString()
  bio;

  @IsOptional()
  @IsDateString()
  birthdate;
}
