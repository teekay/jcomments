/** Types generated for queries found in "src/api/api.sql" */
import { PreparedQuery } from '@pgtyped/runtime'

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
  usedParamSet: { token: true },
  params: [{ name: 'token', required: false, transform: { type: 'scalar' }, locs: [{ a: 87, b: 92 }] }],
  statement:
    'SELECT DISTINCT a.* FROM accounts a JOIN tokens t ON (a.id=t.account_id) WHERE t.token=:token AND t.revoked_at IS NULL',
}

/**
 * Query generated from SQL:
 * ```
 * SELECT DISTINCT a.* FROM accounts a JOIN tokens t ON (a.id=t.account_id) WHERE t.token=:token AND t.revoked_at IS NULL
 * ```
 */
export const loginFromToken = new PreparedQuery<ILoginFromTokenParams, ILoginFromTokenResult>(loginFromTokenIR)
