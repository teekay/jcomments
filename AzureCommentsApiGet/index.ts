import _ from 'lodash'
import { AzureFunction, Context, HttpRequest } from '@azure/functions'
import { appContext } from '../src/azure'
import { CommentInFormat } from '../src/shared/comments/formatted-comment'
import { CommentService, SortOrder } from '../src/shared/comments/comment.service'
import { ContentFilteringService } from '../src/shared/comments/content-filtering-service'
import moment from 'moment'
import { TokenService } from '../src/shared/accounts/token.service'

const commentsApi: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  context.log('JamComments - fetch comments for a URL')

  const app = await appContext()
  const commentService = app.get(CommentService)
  const tokenService = app.get(TokenService)
  const contentFilter = app.get(ContentFilteringService)

  const apiKey =
    req.headers['authorization']?.split(': ').pop()?.split(' ').pop() ??
    _.get(req.body, 'token') ??
    _.get(req.query, 'token')
  if (!apiKey) {
    context.res = {
      status: 400,
    }
    return
  }
  const token = await tokenService.findById(apiKey)
  if (!token) {
    context.res = {
      status: 401,
    }
    return
  }
  const { account } = token
  const { format, since, fromDate, sort } = req.query
  const maybeDate = moment(fromDate)
  const sortOrder = sort === 'desc' ? SortOrder.Desc : SortOrder.Asc
  const url = decodeURIComponent(req.query['url'] ?? '')
  const comments = url
    ? await commentService.commentsForUrl(account, url, {
        afterId: since,
        fromDate: fromDate && maybeDate.isValid() ? maybeDate.toDate() : undefined,
      })
    : await commentService.commentsForAccount(account, sortOrder)

  context.res = {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: comments.map((c) => new CommentInFormat(c, contentFilter).toFormat(format)),
  }
}

export default commentsApi
