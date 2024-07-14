import { AccountCloserPayload } from './account-closer-payload.interface'
import { AccountService } from '../../shared/accounts/account.service'
import { CommentService } from '../../shared/comments/comment.service'
import { Inject } from '@nestjs/common'
import { isAccountCloserPayload } from './account-closer-payload.interface.guard'
import { Logger } from 'nestjs-pino'
import PgBoss from 'pg-boss'
import { PgBossQueues } from '../../shared/queue/pgboss/queues'

export class AccountCloser {
  constructor(
    @Inject('PG_BOSS') private readonly pgBoss: PgBoss,
    private readonly accountService: AccountService,
    private readonly commentService: CommentService,
    private readonly logger: Logger
  ) {}

  async init(): Promise<void> {
    await this.pgBoss.work(PgBossQueues.AccountClosing, (job) => {
      const payload = job.data  
      if (!isAccountCloserPayload(payload)) {
        this.logger.error(`Unsupported payload ${JSON.stringify(payload)}`)
        return Promise.resolve()
      }  
      this.closeAccount(payload)
      return Promise.resolve()
    })
  }

  private async closeAccount(data: AccountCloserPayload): Promise<void> {
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
