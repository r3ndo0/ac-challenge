import { useQuery } from '@tanstack/vue-query'

import type { paths } from '@/types/api'
import type { AxiosError } from 'axios'
import { privateInstance } from './useAxios'
import Cookies from 'universal-cookie'
import { useCookies } from '@vueuse/integrations'

type CurrentUserResponse = paths['/user']['get']['responses'][200]['content']['application/json']

async function fetchCurrentUser() {
  const { data } = await privateInstance.get<CurrentUserResponse>('/user')
  return data.user
}

export function useCurrentUser() {
  const token = useCookies().get('token')

  return useQuery<CurrentUserResponse['user'], AxiosError>({
    queryKey: ['currentUser'],
    queryFn: fetchCurrentUser,
    enabled: !!token,
  })
}
