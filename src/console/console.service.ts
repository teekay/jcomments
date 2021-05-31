import _ from 'lodash'
import { Injectable } from '@nestjs/common';
import { ConsoleService } from 'nestjs-console';
import { AccountService } from '../accounts/account.service';

@Injectable()
export class CliService {
  constructor(private readonly consoleService: ConsoleService, private readonly accountService: AccountService) {
    // get the root cli
    const cli = this.consoleService.getCli();
    if (!cli) throw new Error('Could not get the console')

    // create a single command (See [npm commander arguments/options for more details])
    this.consoleService.createCommand({
        command: 'account:create',
        description: 'Creates a new account',
        options: [{
          flags: '-u --username <username>'
        }, {
          flags: '-p --password <password>'
        }]
      },
      this.createAccount,
      cli // attach the command to the cli
    );
  }

  createAccount = async (args: {username: string, password: string}) => {
    await this.accountService.create(args.username, args.password)
  }
}