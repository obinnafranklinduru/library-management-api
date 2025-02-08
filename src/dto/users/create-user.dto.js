import {
  IsEmail,
  IsString,
  IsIn,
  MinLength,
  IsStrongPassword,
} from "class-validator";

export class CreateUserDto {
  @IsString()
  @MinLength(2)
  name;

  @IsEmail()
  email;

  @IsString()
  @MinLength(8)
  @IsStrongPassword()
  password;

  @IsIn(["Admin", "Librarian", "Member"])
  role;
}
