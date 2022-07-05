import _ from 'lodash'
import { AccountService } from "../src/shared/accounts/account.service";
import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { appContext } from "../src/azure"
import { CommentCreatedResult, CommentService } from "../src/shared/comments/comment.service"
import { HttpStatus } from "@nestjs/common";
import { isPostCommentRequest } from '../generated/PostCommentRequest.guard'
import moment from "moment";
import { parse } from 'qs'
import { Queue } from '../src/shared/queue/queue.interface';
import { TokenService } from "../src/shared/accounts/token.service";

const commentsApi: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.')

    const app = await appContext()
    const commentService = app.get(CommentService)
    const accountService = app.get(AccountService)
    const tokenService = app.get(TokenService)
    const jobQueue = app.get(Queue)
    const body = bodyPerContentType(req)
    const apiKey = req.headers['authorization']?.split(': ').pop()?.split(' ').pop() ?? _.get(body, 'token') ?? _.get(req.query, 'token')
    if (!apiKey) {
        context.log.warn('Missing API key :(')
        context.log.info(body)
        context.res = {
            status: 400
        }
        return
    }
    const token = await tokenService.findById(apiKey)
    if (!token) {
        context.log.warn(`Bad token ${token}`)
        context.res = {
            status: 401
        }
        return
    }
    const { account } = token


    const comment = {... body }
    if (!isPostCommentRequest(comment)) {
        context.log.warn(`Bad payload:`, body)
        context.res = {
            status: 400
        }
        return
    }

    const result = await commentService.create(account, {
        ... comment,
        postedAt: moment().utc().toDate()
      }, req.headers['x-forwarded-for'])
  
      if (req.headers['content-type'] !== 'application/json') {
        // assuming the request comes from the web page -> redirect back
        context.log.info(`redirecting to ${comment.postUrl}`)
        context.res = { 
          status: 302,
          headers: {
            Location: comment.postUrl
          }
        }
      } else {
        context.res = { 
          status: HttpStatus.CREATED
        }
      }
  
      if (result === CommentCreatedResult.Flagged) {
        // no email notification for spam
        return
      }
  
      // send email notification as another Azure function triggered by ServiceBus
      try {
        const emailSettings = await accountService.emailSettingsFor(account)
        if (emailSettings?.notifyOnComments) {
          // notify
          context.log('Scheduling an email notification about a new comment')
          jobQueue.publish({ account, comment })
        }
      } catch (oops) {
        context.log.warn(`Trouble scheduling email notification: ${(oops as Error)?.message}`)
      }
};

function bodyPerContentType(req: HttpRequest) {
  const contentType = req.headers['content-type'];
  switch(contentType) {
    case 'application/x-www-form-urlencoded':
      return parse(req.rawBody)
    case 'application/json':
      return req.body
    default:
      throw new Error(`Unhandled content type ${contentType}`)
  }
}

export default commentsApi