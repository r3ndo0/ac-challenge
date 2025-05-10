import axios from 'axios'

/* Base URL comes from your Vite env config */
const BASE_URL = import.meta.env.VITE_BACKEND_API as string

/* ---------- Public: no auth header ---------- */
export const publicInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
})

/* ---------- Private: automatically adds Authorization ---------- */
export const privateInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
})

privateInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token') // or use cookies / Pinia
  if (token) {
    config.headers.Authorization = `Token ${token}`
  }
  return config
})
