import { AccountService } from './account.service'
import { CommentService } from '../comments/comment.service'
import { Inject } from '@nestjs/common'
import { Logger } from "nestjs-pino";
import PgBoss from 'pg-boss'

export class AccountCloser {
  constructor(
    @Inject('PG_BOSS') private readonly pgBoss: PgBoss,
    private readonly accountService: AccountService,
    private readonly commentService: CommentService,
    private readonly logger: Logger) {}

  async init(): Promise<void> {
    await this.pgBoss.subscribe('notify-on-account-closing', job => this.closeAccount(job.data))
  }

  private async closeAccount(data): Promise<void> {
    const { accountId } = data
    const account = await this.accountService.findById(accountId)
    if (!account) {
      this.logger.warn(`Unknown account ID ${accountId}, cannot close this account`)
      return
    }

    await this.commentService.deleteContentsForAccount(account)
    await this.accountService.closeAccount(account)
    this.logger.log(`Closed the account of ${account.username}`)
  }
  
}