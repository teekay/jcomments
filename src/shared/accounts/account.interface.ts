import { IsEmail, IsNotEmpty } from 'class-validator'

export interface User {
  id: string
}

/**
 * Describes a user of a multi-tenant instance of JamComments
 /** @see {isAccount} ts-auto-guard:type-guard
*/
export interface Account extends User {
  username: string
  email: string
  createdAt: Date | string
}

export class AccountEmailDto {
  @IsNotEmpty()
  @IsEmail()
  email!: string
}
