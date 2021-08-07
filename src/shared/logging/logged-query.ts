import _ from 'lodash'
import { PreparedQuery } from '@pgtyped/query';

export function interpretedQuery(query: PreparedQuery<any, any>, params: Record<string, string>): string {
  const templatedSql = _.get(query, 'query.statement.body') as string ?? ''
  const keys = _.keys(params) ?? []
  let sql = templatedSql;
  for (const key of keys) {
    sql = sql.replace(`:${key}`, params[key])
  }

  return sql
}