// src/api/auth.ts   (add this next to useRegister)

import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { publicInstance } from '@/composables/useAxios'
import type { paths } from '@/types/api'
import { toast } from 'vue-sonner'
import type { AxiosError, AxiosResponse } from 'axios'
import { useUserStore } from '@/stores/useUser'
import { useRouter } from 'vue-router'
import { useCookies } from '@vueuse/integrations/useCookies'
import { markRaw } from 'vue'
import { CustomToast } from './useToast'

/* ---------- Types ---------- */
type LoginUser = paths['/users/login']['post']
type LoginRequest = LoginUser['requestBody']['content']['application/json']
type LoginResponse = LoginUser['responses'][200]['content']['application/json']

/** RealWorld sends `{ errors: Record<string,string[]> }` for 422 validation errors */
interface ApiValidationError {
  errors: Record<string, string[]>
}
/* -------------------------------- */

export function useLogin() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const cookies = useCookies()

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
        toast.error('Unable to sign in. Please try again later.')
        return
      }

      /* show one toast for every message on every field */
      Object.entries(fieldErrors).forEach(([field, msgs]) =>
        msgs.forEach((msg) =>
          toast.error(markRaw(CustomToast), {
            position: 'top-center',
            componentProps: {
              htmlContent: `<p><strong>${field}</strong>: ${msg}</p>`,
            },
            style: {
              background: '#fae4e4',
              boxShadow: '0 0 10px #2533433D',
              padding: '12px 16px',
              borderRadius: '4px',
              color: '#d32f2f',
            },
          }),
        ),
      )
    },
  })
}
