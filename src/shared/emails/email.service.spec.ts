import { Comment } from "../comments/comment.interface"
import { EmailService } from "./email.service"

describe('Email Service', () => {
    const emailSvc = new EmailService()
    const comment: Comment = {
        id: "foo",
        account: {
            id: "bar",
            username: "tester",
            email: "test@test.com",
            createdAt: new Date(),
        },
        author: {
            name: "John Doe",
            email: "john.doe@test.com",
            website: "http://johndoe.com"
        },
        postUrl: "http://test.com/post",
        text: "This is a test comment",
        postedAt: new Date(),
    }

    it('should include comment ID in the output', () => {
        const result = emailSvc.notifyOnSingleComment(
            comment,
            'https://foobar.com/dashboard/123'
        )

        expect(result.text).toContain(comment.id)
        expect(result.html).toContain(comment.id)
    })
})