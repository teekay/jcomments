import { CommentEventBody } from '../comments/comment.event'

export abstract class Queue {
  abstract publish(event: CommentEventBody): Promise<void>

  abstract stop(): Promise<void>
}
