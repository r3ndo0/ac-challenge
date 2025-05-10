import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

const schema = z.object({
  email: z.string({ required_error: 'Email field is required' }).email('Email format is wrong'),
  password: z
    .string({ required_error: 'Password field is required' })
    .min(8, 'Password must be at least 8 characters long'),
})

export const LoginFormSchema = toTypedSchema(schema)
