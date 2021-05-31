import { IsEmail, IsNotEmpty } from "class-validator"

export interface Author {
  name: string;
  email?: string;
}

export class AuthorDto {
  @IsNotEmpty()
  name!: string

  @IsEmail()
  email?: string
}