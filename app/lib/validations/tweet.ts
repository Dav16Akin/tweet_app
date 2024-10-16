import * as z from "zod"

export const TweetValidation = z.object({
    tweet: z.string().nonempty().min(3, {message: "Mininum of 3 Characters"}),
    accountId: z.string(),
})

export const CommentValidation = z.object({
    tweet: z.string().nonempty().min(3, {message: "Mininum of 3 Characters"}),
})