import { isEmail, isString } from "class-validator";

export class LoginDto {
  @isEmail()
  email;

  @isString()
  password;
}
