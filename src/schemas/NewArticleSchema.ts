import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

const schema = z.object({
  title: z
    .string({ required_error: 'title field is required' })
    .trim()
    .min(1, { message: 'title field is required' }),
  description: z
    .string({ required_error: 'description field is required' })
    .trim()
    .min(1, { message: 'description field is required' }),
  body: z
    .string({ required_error: 'body field is required' })
    .trim()
    .min(1, { message: 'body field is required' }),
})

export type NewArticle = z.infer<typeof schema>

export const NewArticleSchema = toTypedSchema(schema)
