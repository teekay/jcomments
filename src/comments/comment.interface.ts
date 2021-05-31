import { IsNotEmpty } from "class-validator";
import { Account } from "../accounts/account.interface";
import { Author, AuthorDto } from "./author.interface";

export interface CommentBase {
  postUrl: string
  text: string
  author: Author
  postedAt: Date
}

/**
 * Describes a comment to a particular resource (URL)
 * owned by someone who signed up for the service
 */
export interface Comment extends CommentBase {
  account: Account
}

export class CommentDto {
  @IsNotEmpty()
  postUrl!: string;
  
  @IsNotEmpty()
  text!: string;
  
  @IsNotEmpty()
  author!: AuthorDto
  }
