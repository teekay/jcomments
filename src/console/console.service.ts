import _ from 'lodash'
import { Injectable } from '@nestjs/common';
import { ConsoleService } from 'nestjs-console';
import { AccountService } from '../accounts/account.service';
import { TokenService } from '../accounts/token.service';

@Injectable()
export class CliService {
  constructor(private readonly consoleService: ConsoleService,
    private readonly accountService: AccountService,
    private readonly tokenService: TokenService) {
    const cli = this.consoleService.getCli();
    if (!cli) throw new Error('Could not get the console')

    // create a single command (See [npm commander arguments/options for more details])
    this.consoleService.createCommand({
        command: 'account:create',
        description: 'Creates a new account',
        options: [{
          flags: '-u --username <username>',
          required: true
        }, {
          flags: '-e --email <email>',
          required: true
        }, {
          flags: '-p --password <password>',
          required: true
        }]
      },
      this.createAccount,
      cli // attach the command to the cli
    );
    
    this.consoleService.createCommand({
        command: 'token:create',
        description: 'Creates a new token',
        options: [{
          flags: '-a --account <account ID>',
          required: true
        }]
      },
      this.createToken,
      cli
    );

    this.consoleService.createCommand({
        command: 'token:revoke',
        description: 'Revokes an existing token',
        options: [{
          flags: '-t --token <token>',
          required: true
        }]
      },
      this.revokeToken,
      cli
    );

  }

  createAccount = async (args: {username: string, email: string, password: string}): Promise<void> => {
    await this.accountService.create(args.username, args.email, args.password)
    const account = await this.accountService.findByUsername(args.username)
    if (!account) {
      throw new Error("Account not created")
    }
    console.log(`Account created. ID: ${account.id}`)
  }

  createToken = async (args: {account: string}): Promise<void> => {
    const account = await this.accountService.findById(args.account)
    if (!account) throw new Error(`No account found for id ${args.account}`)
    await this.tokenService.create(account)
    const token = await this.accountService.token(account)
    if (!token) {
      throw new Error('Token not created')
    }
    console.log(`Token created: ${token.token}`)
  }

  revokeToken = async (args: {token: string}): Promise<void> => {
    const token = await this.tokenService.findById(args.token)
    if (!token) throw new Error(`Token ${args.token} not found`)
    await this.tokenService.revoke(token)
  }
}