import { AkismetClient } from 'akismet-api'
import { Comment } from './comment.interface'
import { Injectable } from '@nestjs/common'
import { Logger } from 'nestjs-pino'
import { SettingsParam } from '../accounts/settings.param'

@Injectable()
export class AkismetService {
  constructor(private readonly logger: Logger) {}

  async isCommentSpam(accountSettings: SettingsParam, comment: Comment) {
    const key = accountSettings.akismetKey
    const blog = accountSettings.blogUrl
    if (!key || !blog) return
    const akismet = new AkismetClient({ key, blog })
    try {
      return await akismet.checkSpam(comment)
    } catch (oops) {
      this.logger.warn(`Could not reach Akismet`, oops)
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
      this.logger.warn(`Could not reach Akismet`, oops)
    }
    return
  }
}