// src/queries/useArticles.ts
import { useQuery, keepPreviousData, useMutation, useQueryClient } from '@tanstack/vue-query'
import { useRouter } from 'vue-router'

import type { paths } from '@/types/api'
import type { AxiosError } from 'axios'
import { publicInstance, privateInstance } from './useAxios'

type Articles200 = paths['/articles']['get']['responses'][200]['content']['application/json']
type CreateArticle = paths['/articles']['post']
type CreateArticleBody = CreateArticle['requestBody']['content']['application/json']
type CreateArticleRes = CreateArticle['responses'][201]['content']['application/json']

async function fetchArticles(limit = 10, page = 0) {
  const offset = page * limit

  const { data } = await publicInstance.get<Articles200>('/articles', {
    params: { limit, offset },
  })

  return data
}

export function useArticles(page = 0, limit = 10) {
  return useQuery<Articles200, AxiosError>({
    queryKey: ['articles', page, limit],
    queryFn: () => fetchArticles(limit, page),
    placeholderData: keepPreviousData,
  })
}

async function postArticle(payload: CreateArticleBody) {
  const { data } = await privateInstance.post<CreateArticleRes>('/articles', payload)
  return data.article
}

export function useCreateArticle() {
  const router = useRouter()
  const queryClient = useQueryClient()

  return useMutation<CreateArticleRes['article'], AxiosError, CreateArticleBody>({
    mutationFn: postArticle,

    onSuccess: (newArticle) => {
      queryClient.invalidateQueries({ queryKey: ['articles'] })
      queryClient.invalidateQueries({ queryKey: ['articles', 'feed'] })

      queryClient.setQueryData(['article', newArticle.slug], newArticle)

      // router.push({ name: 'article', params: { slug: newArticle.slug } })
    },
  })
}
