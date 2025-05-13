// src/api/auth.ts
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { publicInstance } from '@/composables/useAxios'
import type { paths } from '@/types/api'
import { toast } from 'vue-sonner'
import type { AxiosError } from 'axios'
import { useRouter } from 'vue-router'
import { useCookies } from '@vueuse/integrations/useCookies'
import { markRaw } from 'vue'
import { CustomToast } from './useToast'

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

  return useMutation<RegisterResponse, AxiosError<ApiValidationError>, RegisterRequest>({
    mutationFn: (data) => publicInstance.post('/users', data),

    onSuccess: (data) => {
      queryClient.setQueryData(['currentUser'], data.user)
      cookies.set('token', data.user.token)
      router.push({ path: '/articles' })
    },

    onError: (error) => {
      const fieldErrors = error.response?.data?.errors
      if (!fieldErrors) {
        toast.error('An unexpected error occurred. Please try again.')
        return
      }

      Object.entries(fieldErrors).forEach(([field, messages]) => {
        messages.forEach((msg) => {
          toast.error(markRaw(CustomToast), {
            position: 'top-center',
            componentProps: {
              htmlContent: `<p><strong>${field}</strong> ${msg}</p>`,
            },
            style: {
              background: '#fae4e4',
              boxShadow: '0 0 10px #2533433D',
              padding: '12px 16px',
              borderRadius: '4px',
              color: '#d32f2f',
            },
          })
        })
      })
    },
  })
}
