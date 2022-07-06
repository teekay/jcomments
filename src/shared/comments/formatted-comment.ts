import { CommentBase } from './comment.interface'
import { ContentFilteringService } from './content-filtering-service'

export class CommentInFormat {
  constructor(
    private readonly comment: CommentBase,
    private readonly contentFilteringService: ContentFilteringService
  ) {}

  public toFormat(format?: string): CommentBase {
    let formatted = this.comment.text
    switch (format) {
      case 'markdown': {
        formatted = this.contentFilteringService.toMarkdown(this.comment.text)
        break
      }
      case 'html': {
        formatted = this.contentFilteringService.toHtml(this.comment.text)
        break
      }
      case 'text': {
        formatted = this.contentFilteringService.toPlainText(this.comment.text)
      }
    }
    return {
      ...this.comment,
      text: formatted,
    }
  }
}
