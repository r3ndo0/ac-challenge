// src/queries/useArticles.ts
import { useQuery, keepPreviousData, useMutation, useQueryClient } from '@tanstack/vue-query'
import { useRouter } from 'vue-router'
import type { paths } from '@/types/api'
import type { AxiosError } from 'axios'
import { publicInstance, privateInstance } from './useAxios'
import { computed, type Ref } from 'vue'
import { toast } from 'vue-sonner'
import { CustomToast } from './useToast'

type Articles200 = paths['/articles']['get']['responses'][200]['content']['application/json']
type Article200 = paths['/articles/{slug}']['get']['responses'][200]['content']['application/json']
type CreateArticle = paths['/articles']['post']
type CreateArticleBody = CreateArticle['requestBody']['content']['application/json']
type CreateArticleRes = CreateArticle['responses'][201]['content']['application/json']
type DeleteArticle = paths['/articles/{slug}']['delete']
type UpdateOp = paths['/articles/{slug}']['put']
type UpdatePayload = UpdateOp['requestBody']['content']['application/json']
type UpdateResponse = UpdateOp['responses'][200]['content']['application/json']
type DeleteArticleResponse = DeleteArticle['responses'][200] extends { content: any } ? never : void
async function fetchArticles(limit = 10, page = 0, author: Ref<string | undefined>) {
  const offset = page * limit

  const { data } = await privateInstance.get<Articles200>('/articles', {
    params: { author: author.value, limit, offset },
  })
  console.log(data)
  return data
}

export function useArticles(page = 0, limit = 10, author: Ref<string | undefined>) {
  return useQuery<Articles200, AxiosError>({
    queryKey: ['articles', page, limit, author],
    queryFn: () => fetchArticles(limit, page, author),
    placeholderData: keepPreviousData,
    enabled: computed(() => !!author.value),
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
      toast.success(CustomToast, {
        position: 'top-center',
        componentProps: {
          htmlContent: `<p><strong>Well done!</strong>: Article created successfuly</p>`,
        },
        style: {
          background: '#E3F6E9',
          boxShadow: '0 0 10px #2533433D',
          padding: '12px 16px',
          borderRadius: '4px',
          color: '#17B24A',
        },
      })
      router.push('/articles')
    },
  })
}

async function remove(slug: string): Promise<DeleteArticleResponse> {
  await privateInstance.delete(`/articles/${slug}`)
}

export function useDeleteArticle() {
  const qc = useQueryClient()

  return useMutation<DeleteArticleResponse, AxiosError, string>({
    mutationFn: remove,

    onSuccess() {
      qc.invalidateQueries({ queryKey: ['articles'] })
      toast.success(CustomToast, {
        position: 'top-center',
        componentProps: {
          htmlContent: `<p>Article deleted successfuly</p>`,
        },
        style: {
          background: '#E3F6E9',
          boxShadow: '0 0 10px #2533433D',
          padding: '12px 16px',
          borderRadius: '4px',
          color: '#17B24A',
        },
      })
    },
  })
}

async function fetchArticle(slug: string) {
  const { data } = await publicInstance.get<Article200>(`/articles/${slug}`)
  return data.article
}
export function useSingleArticle(slug: Ref<string | undefined>) {
  return useQuery<Article200['article'], AxiosError>({
    queryKey: ['article', slug],
    queryFn: () => fetchArticle(slug.value as string),
    enabled: computed(() => !!slug.value),
  })
}

async function putArticle(slug: string, payload: UpdatePayload) {
  const { data } = await privateInstance.put<UpdateResponse>(`/articles/${slug}`, payload)
  return data.article
}

export function useUpdateArticle() {
  const qc = useQueryClient()
  const router = useRouter()
  return useMutation<
    UpdateResponse['article'],
    AxiosError,
    { slug: string; article: UpdatePayload['article'] }
  >({
    mutationFn: ({ slug, article }) => putArticle(slug, { article }),

    onSuccess() {
      qc.invalidateQueries({ queryKey: ['articles'] })
      toast.success(CustomToast, {
        position: 'top-center',
        componentProps: {
          htmlContent: `<p><strong>Well done!</strong>: Article updated successfuly</p>`,
        },
        style: {
          background: '#E3F6E9',
          boxShadow: '0 0 10px #2533433D',
          padding: '12px 16px',
          borderRadius: '4px',
          color: '#17B24A',
        },
      })
      router.push('/articles')
    },
  })
}
