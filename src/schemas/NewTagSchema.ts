import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

const schema = z.object({
  tag: z
    .string({ required_error: 'Tag field is required' })
    .min(1, { message: 'Tag field is required' }),
})

export const NewTagSchema = toTypedSchema(schema)
