import { Author } from "./author.interface";

export interface Comment {
  postUrl: string
  text: string
  author: Author
}