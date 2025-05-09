// src/api/auth.ts
import { useMutation } from '@tanstack/vue-query'
import { typedPost } from '@/composables/useAxios'
import type { paths } from '@/types/api'
import { toast } from 'vue-sonner'
import type { AxiosError } from 'axios'
import { useUserStore } from '@/stores/useUser'
import { useRouter } from 'vue-router'
import { useCookies } from '@vueuse/integrations/useCookies'
import { markRaw } from 'vue'
import { CustomToast } from './useToast'

type RegisterUser = paths['/users']['post']
type RegisterRequest = RegisterUser['requestBody']['content']['application/json']
type RegisterResponse = RegisterUser['responses'][201]['content']['application/json']
type Register422Error = paths['/users']['post']['responses'][422]['content']['application/json']

export function useRegister() {
  const router = useRouter()
  const { setUser } = useUserStore()
  const cookies = useCookies()

  return useMutation<RegisterResponse, AxiosError<any>, RegisterRequest>({
    mutationFn: (data: RegisterRequest) => typedPost('/users', data),
    onSuccess: (data: RegisterResponse) => {
      setUser(data.user)
      cookies.set('token', data.user.token)
      router.push({ path: '/' })
    },
    // The generated type for 422 errors (Register422Error) does not match the actual API response.
    // The API returns an object with dynamic keys (e.g., "email", "username") mapping to arrays of error messages.
    // To handle this, we are using `any` for the error type here and manually processing the error response.
    onError: (error: AxiosError<any>) => {
      const errors = error.response?.data.errors
      if (errors) {
        Object.entries(errors).forEach(([field, messages]: any) => {
          // const htmlContent = messages
          //   .map((message: string) => `<strong>${field}:</strong> ${message}`)
          //   .join('<br>') // Combine multiple messages with line breaks
          toast.error(markRaw(CustomToast), {
            position: 'top-center',
            componentProps: {
              htmlContent: `<p><strong>${field}</strong>${JSON.stringify(messages)}</p>`,
            },
            style: {
              background: '#fae4e4',
              boxShadow: '0 0 10px #2533433D',
              padding: '12px 16px 12px 16px',
              borderRadius: '4px',
              color: '#d32f2f',
            },
          })
        })
      } else {
        // showErrorToast('<strong>Error:</strong> An unexpected error occurred.')
      }
    },
  })
}
