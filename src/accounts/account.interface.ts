/**
 * Describes a user of a multi-tenant instance of JamComments
 */
export interface Account {
  id: string
  username: string
  password: string
  createdAt: Date
}