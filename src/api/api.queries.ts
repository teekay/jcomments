/** Types generated for queries found in "src/api/api.sql" */
import { PreparedQuery } from '@pgtyped/query'

/** 'LoginFromToken' parameters type */
export interface ILoginFromTokenParams {
  token: string | null | void
}

/** 'LoginFromToken' return type */
export interface ILoginFromTokenResult {
  created_at: Date
  email: string
  id: string
  password: Buffer
  username: string
}

/** 'LoginFromToken' query type */
export interface ILoginFromTokenQuery {
  params: ILoginFromTokenParams
  result: ILoginFromTokenResult
}

const loginFromTokenIR: any = {
  name: 'LoginFromToken',
  params: [
    {
      name: 'token',
      required: false,
      transform: { type: 'scalar' },
      codeRefs: { used: [{ a: 115, b: 119, line: 2, col: 88 }] },
    },
  ],
  usedParamSet: { token: true },
  statement: {
    body: 'SELECT DISTINCT a.* FROM accounts a JOIN tokens t ON (a.id=t.account_id) WHERE t.token=:token AND t.revoked_at IS NULL',
    loc: { a: 27, b: 144, line: 2, col: 0 },
  },
}

/**
 * Query generated from SQL:
 * ```
 * SELECT DISTINCT a.* FROM accounts a JOIN tokens t ON (a.id=t.account_id) WHERE t.token=:token AND t.revoked_at IS NULL
 * ```
 */
export const loginFromToken = new PreparedQuery<ILoginFromTokenParams, ILoginFromTokenResult>(loginFromTokenIR)
