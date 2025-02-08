import { IsString, IsDateString, IsOptional } from "class-validator";

export class CreateAuthorDto {
  @IsString()
  name;

  @IsOptional()
  @IsString()
  bio;

  @IsOptional()
  @IsDateString()
  birthdate;
}
