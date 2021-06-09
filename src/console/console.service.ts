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

  createAccount = async (args: {username: string, password: string}): Promise<void> => {
    await this.accountService.create(args.username, args.password)
  }

  createToken = async (args: {account: string}): Promise<void> => {
    const account = await this.accountService.findById(args.account)
    if (!account) throw new Error(`No account found for id ${args.account}`)
    console.log('Account found')
    await this.tokenService.create(account)
  }

  revokeToken = async (args: {token: string}): Promise<void> => {
    const token = await this.tokenService.findById(args.token)
    if (!token) throw new Error(`Token ${args.token} not found`)
    await this.tokenService.revoke(token)
  }
}