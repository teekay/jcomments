import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { bootstrap } from "../src/azure"
import { TokenService } from "../src/shared/accounts/token.service";
import { CommentService } from "../src/shared/comments/comment.service"
import _ from 'lodash'

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
    
    const url = decodeURIComponent(req.params['url'] ?? '');
    if (!url) {
        context.res = {
            status: 400,
            body: 'Missing parameter: url'
        }
        return
    }
    const comments = await commentService.commentsForUrl(token.account, url)

    context.res = {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        },
        body: comments
    }

};

export default commentsApi