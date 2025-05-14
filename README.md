# Arvancloud Challenge – Vue 3 Dashboard

A responsive dashboard for managing RealWorld-style articles.
Built with **Vue 3 + Vite + TypeScript**, declarative data-fetching via **TanStack Query**, and fully typed forms with **Vee-Validate + Zod**.

---

## ✨ Features

|                            | Desktop | Mobile |
| -------------------------- | :-----: | :----: |
| Auth (login / register)    |   ✔︎   |  ✔︎   |
| Persist session via cookie |   ✔︎   |  ✔︎   |
| CRUD articles              |   ✔︎   |  ✔︎   |
| Pagination (route-based)   |   ✔︎   |  ✔︎   |
| Responsive table ⇢ cards   |   ✔︎   |  ✔︎   |
| Edit / Delete modal        |   ✔︎   |  ✔︎   |
| Global toasts              |   ✔︎   |  ✔︎   |

---

## 🔧 Tech stack & why

| Package                      | Why it was chosen                                                                                                    |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| **Vue 3 + TypeScript**       | Composition-API for small, self-contained composables; excellent DX with `<script setup>` and `vue-tsc` type-checks. |
| **Vite**                     | Instant HMR and out-of-the-box TypeScript; zero config for Tailwind.                                                 |
| **@tanstack/vue-query (v5)** | Server-state cache, request deduplication, optimistic updates, and refetch controls – no need for Vuex/Pinia.        |
| **vee-validate 4 + zod**     | Schema-driven validation**and** runtime parsing; Zod schemas double as TypeScript types (`z.infer`).                 |
| **axios**                    | Explicit request/response typing; separate**public** and **private** instances with auth interceptor.                |
| **@vueuse/core**             | Cookie utilities (`useCookies`), click-outside, debounce, etc.                                                       |
| **headlessui/vue**           | Accessible dialog & menu primitives; Tailwind-first styling.                                                         |
| **tailwindcss 4**            | Utility-first styles, mobile-first breakpoints,` @apply` in `<style scoped>`.                                        |
| **vue-sonner**               | Non-blocking toast notifications with custom JSX/html slots.                                                         |
| **eslint + prettier**        | Auto-fix + format on save; strict eslint-vue-typescript preset.                                                      |

---

## ⚠️ API deviations

- **`api.d.ts` ≠ backend output** –The generated OpenAPI types miss `body` in the article preview and mis-shape
  validation errors.&nbsp;&nbsp;→ Patched with intersection types or `AxiosError<any>` in the few affected hooks.
- **Tags are immutable** –
  The canonical RealWorld spec has **no `PUT /articles` for `tagList`**.
  UI allows adding tags at _create_ time; update form hides tag controls.

---

## 🚀 Running locally

```bash
# install deps (<= Node 22)
yarn

# start dev server
yarn dev   # http://localhost:5173

# type-check only
yarn type-check

# lint & format
yarn lint
yarn format

# production build / preview
yarn build
yarn preview
```
