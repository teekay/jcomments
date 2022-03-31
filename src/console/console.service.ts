import _ from 'lodash'
import { AccountService } from '../shared/accounts/account.service'
import { Client } from 'pg'
import { CommentBase } from '../shared/comments/comment.interface'
import { CommentService, JsonDump } from '../shared/comments/comment.service'
import { ConsoleService } from 'nestjs-console'
import { Inject, Injectable } from '@nestjs/common'
import { migrate } from 'postgres-migrations'
import { randCatchPhrase, randQuote, randSlug, randUrl, randUser } from '@ngneat/falso'
import { TokenService } from '../shared/accounts/token.service'
@Injectable()
export class CliService {
  constructor(
    @Inject('PG_CLIENT') private client: Client,
    private readonly consoleService: ConsoleService,
    private readonly accountService: AccountService,
    private readonly commentService: CommentService,
    private readonly tokenService: TokenService
  ) {
    const cli = this.consoleService.getCli()
    if (!cli) throw new Error('Could not get the console')

    // create a single command (See [npm commander arguments/options for more details])
    this.consoleService.createCommand(
      {
        command: 'account:create',
        description: 'Creates a new account',
        options: [
          {
            flags: '-u --username <username>',
            required: true,
          },
          {
            flags: '-e --email <email>',
            required: true,
          },
          {
            flags: '-p --password <password>',
            required: true,
          },
        ],
      },
      this.createAccount,
      cli // attach the command to the cli
    )

    this.consoleService.createCommand(
      {
        command: 'token:create',
        description: 'Creates a new token',
        options: [
          {
            flags: '-a --account <account ID>',
            required: true,
          },
        ],
      },
      this.createToken,
      cli
    )

    this.consoleService.createCommand(
      {
        command: 'token:revoke',
        description: 'Revokes an existing token',
        options: [
          {
            flags: '-t --token <token>',
            required: true,
          },
        ],
      },
      this.revokeToken,
      cli
    )

    this.consoleService.createCommand(
      {
        command: 'db:migrate',
        description: 'Migrates the database',
      },
      this.migrate,
      cli
    )

    this.consoleService.createCommand(
      {
        command: 'db:seed',
        description: 'Seeds the database with sample data',
        options: [
          {
            flags: '-a --account <account ID>',
            required: true,
          },
          {
            flags: '-n --num <number of comments>',
            defaultValue: 10,
          },
          {
            flags: '-s --spam <number of spam comments>',
            defaultValue: 5,
          },
        ],
      },
      this.seed,
      cli
    )
  }

  createAccount = async (args: { username: string; email: string; password: string }): Promise<void> => {
    await this.accountService.create(args.username, args.email, args.password)
    const account = await this.accountService.findByUsername(args.username)
    if (!account) {
      throw new Error('Account not created')
    }
    console.log(`Account created. ID: ${account.id}`)
  }

  createToken = async (args: { account: string }): Promise<void> => {
    const account = await this.accountService.findById(args.account)
    if (!account) throw new Error(`No account found for id ${args.account}`)
    await this.tokenService.create(account)
    const token = await this.accountService.token(account)
    if (!token) {
      throw new Error('Token not created')
    }
    console.log(`Token created: ${token.token}`)
  }

  revokeToken = async (args: { token: string }): Promise<void> => {
    const token = await this.tokenService.findById(args.token)
    if (!token) throw new Error(`Token ${args.token} not found`)
    await this.tokenService.revoke(token)
  }

  migrate = async (): Promise<void> => {
    try {
      await migrate({ client: this.client }, `${__dirname}/../../sql/migrations`)
      console.log('Migrated')
    } catch (oops) {
      console.warn('Migration failed')
      throw oops
    }
  }

  seed = async (args: { account: string; num: number; spam: number }): Promise<void> => {
    const account = await this.accountService.findById(args.account)
    if (!account) throw new Error(`No account found for id ${args.account}`)
    const now = new Date()
    const comments = _.range(0, args.num).map((i: number) => {
      const postDate = new Date(now)
      postDate.setDate(postDate.getDate() - i)
      const commenter = randUser()
      const comment: JsonDump = {
        page_url: `https://example.com/blog/${randSlug()}`,
        page_title: randCatchPhrase(),
        text: randQuote(),
        author: `${commenter.firstName} ${commenter.lastName}`,
        email: commenter.email,
        website: randUrl(),
        posted_at: postDate.toISOString(),
      }
      return comment
    })
    await this.commentService.import(account, comments)
    console.log(`Seeded ${comments.length} comments`)

    const promises = _.range(0, args.spam).map((i: number) => {
      const postDate = new Date(now)
      postDate.setDate(postDate.getDate() - i)
      const commenter = randUser()
      const comment: CommentBase = {
        postUrl: `https://example.com/blog/${randSlug()}`,
        postTitle: randCatchPhrase(),
        text: randQuote(),
        author: {
          name: `${commenter.firstName} ${commenter.lastName}`,
          email: commenter.email,
          website: randUrl(),
        },
        postedAt: postDate,
      }

      return this.commentService.createWithOption(account, comment, true)
    })
    await Promise.all(promises)
    console.log(`Seeded ${promises.length} SPAM comments`)
  }
}
