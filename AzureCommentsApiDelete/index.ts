import _ from 'lodash'
import { appContext } from '../src/azure'
import { AzureFunction, Context, HttpRequest } from '@azure/functions'
import { CommentService } from '../src/shared/comments/comment.service'
import { AuthService, HmacValidationResult } from '../src/shared/auth/auth.service'

const commentsApi: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  context.log.info('HTTP trigger function processing a request to delete a comment')

  const app = await appContext()
  const authService = app.get(AuthService)
  const commentService = app.get(CommentService)
  const timestamp = req.headers['x-timestamp'] as string
  const providedSignature = req.headers['x-signature'] as string
  const accountId = req.headers['x-account-id'] as string
  const commentId = req.params.commentId

  if (!timestamp || !providedSignature || !accountId) {
    context.log.warn('Missing auth headers :(')
    context.res = {
      status: 400,
    }

    return
  }

  const forDate = new Date()
  const signatureVerificationResult = await authService.isHmacSignatureValid(
    req,
    300,
    accountId,
    timestamp,
    providedSignature,
    forDate
  )

  // Verify the request is not too old (e.g., 5 minutes)
  if (signatureVerificationResult === HmacValidationResult.REQUEST_TOO_OLD) {
    const now = Math.floor(forDate.getTime() / 1000)
    context.log.warn(`Request too old: ${Math.abs(now - parseInt(timestamp))}s`)
    context.res = {
      status: 429,
    }

    return
  }

  await commentService.deleteSingleById(commentId)
  context.log.info(`Deleted comment ${commentId}`)

  context.res = {
    status: 201,
  }
}

export default commentsApi
