import { useQuery } from '@tanstack/vue-query'

import type { paths } from '@/types/api'
import type { AxiosError } from 'axios'
import { privateInstance } from './useAxios'
import { useCookies } from '@vueuse/integrations/useCookies'
import { useRouter } from 'vue-router'

type CurrentUserResponse = paths['/user']['get']['responses'][200]['content']['application/json']

async function fetchCurrentUser() {
  const { data } = await privateInstance.get<CurrentUserResponse>('/user')
  return data.user
}

export function useCurrentUser() {
  const token = useCookies().get('token')

  const res = useQuery<CurrentUserResponse['user'], AxiosError>({
    queryKey: ['currentUser'],
    queryFn: fetchCurrentUser,
    enabled: !!token,
  })

  return res
}

export function useSignOut() {
  const router = useRouter()
  const cookies = useCookies()

  return () => {
    cookies.remove('token', { path: '/' })
    router.push('/login')
  }
}
