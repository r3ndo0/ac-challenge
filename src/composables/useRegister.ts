// src/api/auth.ts
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { publicInstance } from '@/composables/useAxios'
import type { paths } from '@/types/api'
import type { AxiosError, AxiosResponse } from 'axios'
import { useRouter } from 'vue-router'
import { useCookies } from '@vueuse/integrations/useCookies'
import { useToast } from './useToast'

/* ---------- Types ---------- */
type RegisterUser = paths['/users']['post']
type RegisterRequest = RegisterUser['requestBody']['content']['application/json']
type RegisterResponse = RegisterUser['responses'][201]['content']['application/json']

interface ApiValidationError {
  errors: Record<string, string[]>
}

export function useRegister() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const cookies = useCookies()
  const { showError, showValidationError } = useToast()

  return useMutation<
    AxiosResponse<RegisterResponse>,
    AxiosError<ApiValidationError>,
    RegisterRequest
  >({
    mutationFn: (data) => publicInstance.post('/users', data),

    onSuccess: (data) => {
      queryClient.setQueryData(['currentUser'], data.data.user)
      cookies.set('token', data.data.user.token)
      router.push({ path: '/articles' })
    },

    onError: (error) => {
      console.log(error)
      const fieldErrors = error.response?.data?.errors
      if (!fieldErrors) {
        showError('An unexpected error occurred. Please try again.')
        return
      }

      Object.entries(fieldErrors).forEach(([field, messages]) => {
        messages.forEach((msg) => showValidationError(field, msg))
      })
    },
  })
}
