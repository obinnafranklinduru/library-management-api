import {
  IsOptional,
  IsString,
  IsEmail,
  IsIn,
  MinLength,
  IsStrongPassword,
} from "class-validator";

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  name;

  @IsOptional()
  @IsEmail()
  email;

  @IsOptional()
  @IsString()
  @MinLength(8)
  @IsStrongPassword()
  password;

  @IsOptional()
  @IsIn(["Admin", "Librarian", "Member"])
  role;
}
