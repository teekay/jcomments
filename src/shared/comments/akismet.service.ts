import { AkismetClient } from 'akismet-api'
import { CommentBase } from './comment.interface'
import { Injectable } from '@nestjs/common'
import { Logger } from 'nestjs-pino'
import { SettingsParam } from '../accounts/settings.param'

@Injectable()
export class AkismetService {
  constructor(private readonly logger: Logger) {}

  async isCommentSpam(accountSettings: SettingsParam, comment: CommentBase, ipAddr: string): Promise<boolean | undefined> {
    const key = accountSettings.akismetKey
    const blog = accountSettings.blogUrl
    if (!key || !blog) return
    const akismet = new AkismetClient({ key, blog })
    try {
      return await akismet.checkSpam({
        content: comment.text,
        email: comment.author.email ?? '',
        url: comment.author.website ?? '',
        name: comment.author.name,
        type: 'comment',
        ip: ipAddr
      })
    } catch (oops) {
      this.logger.warn(`Could not reach Akismet`, (oops as Error)?.message)
      // TODO we have to let the account owner know if there are persistent problems with Akismet
      return
    }
  }

  async verifyKey(accountSettings: SettingsParam): Promise<boolean | undefined> {
    const key = accountSettings.akismetKey
    const blog = accountSettings.blogUrl
    if (!key || !blog) {
      return
    }
    const akismet = new AkismetClient({ key, blog })
    try {
      return await akismet.verifyKey(key)
    } catch (oops) {
      this.logger.warn(`Could not reach Akismet`, (oops as Error)?.message)
    }
    return
  }
}