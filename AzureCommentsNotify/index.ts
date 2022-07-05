import { AzureFunction, Context } from '@azure/functions';
import { isCommentEvent } from '../generated/CommentEvent.guard'
import { appContext } from '../src/azure';
import { ConfigService } from '../src/shared/config/config.service';
import { EmailService } from '../src/shared/emails/email.service';
import { SendMailService } from '../src/shared/emails/sendmail.service';

const commentEventHandler: AzureFunction = async function (context: Context, eventBody: unknown): Promise<void> {
  if (!isCommentEvent(eventBody)) {
    throw new Error(`Unexpected event body: ${JSON.stringify(eventBody)}`)
  }

  const app = await appContext()
  const sendMailService = app.get(SendMailService)
  const configService = app.get(ConfigService)
  const emailService = app.get(EmailService)
  const { account, comment } = eventBody
  const email = emailService.notifyOnSingleComment(comment, `${configService.adminUrl()}/dashboard`)
  context.log(`Notifying ${account.email} on comment posted`)

  await sendMailService.send(configService.mailgunSender(), account.email, email.subject, email.html, email.text)
}

export default commentEventHandler