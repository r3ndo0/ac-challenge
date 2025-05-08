// src/api/auth.ts
import { useMutation } from '@tanstack/vue-query'
import { typedPost } from '@/composables/useAxios'
import type { paths } from '@/types/api'
import { toast } from 'vue-sonner'
import type { AxiosError } from 'axios'
import { useUserStore } from '@/stores/useUser'
import { useRouter } from 'vue-router'
import { useCookies } from '@vueuse/integrations/useCookies'

type RegisterUser = paths['/users']['post']
type RegisterRequest = RegisterUser['requestBody']['content']['application/json']
type RegisterResponse = RegisterUser['responses'][201]['content']['application/json']
type Register422Error = paths['/users']['post']['responses'][422]['content']['application/json']

export function useRegister() {
  const router = useRouter()
  const { setUser } = useUserStore()

  const cookies = useCookies()
  return useMutation<RegisterResponse, AxiosError<Register422Error>, RegisterRequest>({
    mutationFn: (data: RegisterRequest) => typedPost('/users', data),
    onSuccess: (data: RegisterResponse) => {
      setUser(data.user)
      cookies.set('token', data.user.token)
      router.push({ path: '/' })
    },
    // // chore : Handle 422 error
    // onError: (error: AxiosError<Register422Error>) => {
    //   const errorMessage = error.response?.data.errors.body[0]
    //   toast.error(error.response?.data.errors.body[0] || '')
    // },
  })
}
