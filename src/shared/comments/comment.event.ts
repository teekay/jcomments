import { Account } from "../accounts/account.interface";
import { CommentDto } from "./comment.interface";

export interface CommentEventBody {
    account: Account;
    comment: CommentDto; // TODO this should not be the DTO
}

export class CommentEvent {
    contentType = 'application/json';

    constructor(public body: CommentEventBody) {}
}