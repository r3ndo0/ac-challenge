import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { publicInstance } from '@/composables/useAxios'
import type { paths } from '@/types/api'
import type { AxiosError, AxiosResponse } from 'axios'
import { useRouter } from 'vue-router'
import { useCookies } from '@vueuse/integrations/useCookies'
import { useToast } from './useToast'

type LoginUser = paths['/users/login']['post']
type LoginRequest = LoginUser['requestBody']['content']['application/json']
type LoginResponse = LoginUser['responses'][200]['content']['application/json']

interface ApiValidationError {
  errors: Record<string, string[]>
}

export function useLogin() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const cookies = useCookies()
  const { showError, showValidationError } = useToast()

  return useMutation<AxiosResponse<LoginResponse>, AxiosError<ApiValidationError>, LoginRequest>({
    mutationFn: (credentials) => publicInstance.post('/users/login', credentials),

    onSuccess: (data) => {
      queryClient.setQueryData(['currentUser'], data.data.user)
      cookies.set('token', data.data.user.token)
      router.push({ path: '/articles' })
    },

    onError: (error) => {
      const fieldErrors = error.response?.data?.errors
      if (!fieldErrors) {
        showError('Unable to sign in. Please try again later.')
        return
      }

      Object.entries(fieldErrors).forEach(([field, msgs]) =>
        msgs.forEach((msg) => showValidationError(field, msg)),
      )
    },
  })
}
