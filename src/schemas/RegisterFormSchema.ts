import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

const schema = z.object({
  username: z
    .string({ required_error: 'Username field is required' })
    .min(3, 'Username must be at least 3 characters long'),

  email: z.string({ required_error: 'Email field is required' }).email('Email format is wrong'),
  password: z
    .string({ required_error: 'Password field is required' })
    .min(8, 'Password must be at least 8 characters long'),
})

export const RegisterFormSchema = toTypedSchema(schema)
