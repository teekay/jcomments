import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { bootstrap } from "../src/azure"
import { TokenService } from "../src/shared/accounts/token.service";
import { CommentCreatedResult, CommentService } from "../src/shared/comments/comment.service"
import _ from 'lodash'
import moment from "moment";
import { HttpStatus } from "@nestjs/common";
import { isPostCommentRequest } from '../generated/PostCommentRequest.guard'

const commentsApi: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.')

    const app = await bootstrap()
    const commentService = app.get(CommentService)
    const tokenService = app.get(TokenService)
    const apiKey = req.headers['authorization']?.split(': ').pop()?.split(' ').pop() ?? _.get(req.body, 'token') ?? _.get(req.query, 'token')
    if (!apiKey) {
        context.res = {
            status: 400
        }
        return
    }
    const token = await tokenService.findById(apiKey)
    if (!token) {
        context.res = {
            status: 401
        }
        return
    }
    const { account } = token
    const comment = req.body
    if (!isPostCommentRequest(comment)) {
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
        context.res = { location: comment.postUrl }
      } else {
        context.res = { 
          status: HttpStatus.CREATED
        }
      }
  
      if (result === CommentCreatedResult.Flagged) {
        // no email notification for spam
        return
      }
  
      // TODO email notification as another Azure function triggered by ServiceBus
};

export default commentsApi