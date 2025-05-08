import axios from 'axios'
import type { paths } from '@/types/api'

// Helper type to extract request/response types from OpenAPI
type RequestParams<T extends keyof paths, M extends keyof paths[T]> = paths[T][M] extends {
  requestBody: { content: { 'application/json': infer D } }
}
  ? D
  : never

type ResponseData<T extends keyof paths, M extends keyof paths[T]> = paths[T][M] extends {
  responses: { 200: { content: { 'application/json': infer D } } }
}
  ? D
  : never

export const publicInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API,
  headers: { 'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest' },
})

// Typed POST wrapper
export async function typedPost<T extends keyof paths>(url: T, data: RequestParams<T, 'post'>) {
  const response = await publicInstance.post<ResponseData<T, 'post'>>(url, data)
  return response.data
}
