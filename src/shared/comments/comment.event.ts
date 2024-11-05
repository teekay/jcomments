import { Account } from '../accounts/account.interface'
import { Comment } from './comment.interface'

export interface CommentEventBody {
  account: Account
  comment: Comment
}

export class CommentEvent {
  contentType = 'application/json'

  constructor(public body: CommentEventBody) {}
}
