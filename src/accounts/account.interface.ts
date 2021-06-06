export interface User {
  id: string
}

/**
 * Describes a user of a multi-tenant instance of JamComments
 */
export interface Account extends User {
  username: string
  password: string
  createdAt: Date
}