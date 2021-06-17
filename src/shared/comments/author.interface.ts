import { IsEmail, IsNotEmpty, IsUrl } from "class-validator"

export interface Author {
  name: string
  email?: string
  website?: string
}

export class AuthorDto {
  @IsNotEmpty()
  name!: string

  @IsEmail()
  email?: string

  @IsUrl()
  website?: string
}