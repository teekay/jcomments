import { IsEmail, IsNotEmpty } from 'class-validator'

export interface User {
  id: string
}

/**
 * Describes a user of a multi-tenant instance of JamComments
 */
export interface Account extends User {
  username: string
  email: string
  password: string
  createdAt: Date
}

export class AccountEmailDto {
  @IsNotEmpty()
  @IsEmail()
  email!: string
}
