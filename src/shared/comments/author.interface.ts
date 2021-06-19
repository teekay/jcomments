import { IsEmail, IsNotEmpty, IsUrl, MaxLength, ValidateIf } from "class-validator"
import { OnlyPlainText } from "../validation/plain-text.validator"

export interface Author {
  name: string
  email?: string
  website?: string
}

export class AuthorDto {
  @IsNotEmpty()
  @MaxLength(512)
  @OnlyPlainText({ message: 'Name cannot contain any markup or special characters' })
  name!: string

  @ValidateIf(o => o?.email?.length > 0)
  @IsEmail()
  @MaxLength(512)
  email?: string

  @ValidateIf(o => o?.website?.length > 0)
  @IsUrl()
  @MaxLength(1024)
  website?: string
}