// src/queries/useTags.ts
import { useQuery } from '@tanstack/vue-query'

import type { paths } from '@/types/api'

import { privateInstance, publicInstance } from './useAxios'
import { useMutation, useQueryClient } from '@tanstack/vue-query'

import type { AxiosError } from 'axios'

interface AddTagPayload {
  tag: { name: string }
}
interface AddTagResponse {
  tag: { id: number; name: string }
}

type TagsResponse = paths['/tags']['get']['responses'][200]['content']['application/json']

async function fetchTags() {
  const { data } = await publicInstance.get<TagsResponse>('/tags')
  return data.tags
}

export function useTags() {
  return useQuery<string[], AxiosError>({
    queryKey: ['tags'],
    queryFn: fetchTags,
    staleTime: Infinity,
  })
}
async function postTag(payload: AddTagPayload) {
  const { data } = await privateInstance.post<AddTagResponse>('/tags', payload)
  return data.tag
}

export function useAddTag() {
  const queryClient = useQueryClient()

  return useMutation<AddTagResponse['tag'], AxiosError, AddTagPayload>({
    mutationFn: postTag,

    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['tags'] })
    },
  })
}
