import { Account } from "../accounts/account.interface"
import { Author, AuthorDto } from "./author.interface"
import { IsNotEmpty, IsNotEmptyObject, IsUrl, MaxLength, ValidateNested } from "class-validator"
import { NonEmptyString } from "../validation/non-empty-string.validator"
import { Type } from "class-transformer"

export interface CommentBase {
  postUrl: string
  text: string
  author: Author
  postedAt: Date
}

export interface CommentWithId extends CommentBase {
  id: string
}

/**
 * Describes a comment to a particular resource (URL)
 * owned by someone who signed up for the service
 */
export interface Comment extends CommentWithId {
  account: Account
}

export class CommentDto {
  @IsNotEmpty()
  @MaxLength(2048)
  @IsUrl()
  postUrl!: string
  
  @IsNotEmpty()
  @NonEmptyString({ message: 'comment cannot be an empty string or just white space'})
  text!: string
  
  @ValidateNested()
  @IsNotEmptyObject()
  @Type(() => AuthorDto)
  author!: AuthorDto
}
