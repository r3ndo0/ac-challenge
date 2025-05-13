<script setup lang="ts">
import { useForm } from 'vee-validate'
import RegularInput from '../ui/RegularInput.vue'
import AcButton from '../ui/AcButton.vue'
import { LoginFormSchema } from '@/schemas/LoginFormSchema'
import { useLogin } from '@/composables/useLogin'

const { handleSubmit } = useForm({
  validationSchema: LoginFormSchema,
})
const { mutate, isPending } = useLogin()
const onSubmit = handleSubmit((values) => {
  mutate({ user: values })
})
</script>

<template>
  <form @submit="onSubmit" class="md:w-[480px] rounded-lg w-[350px] p-4 md:p-6 bg-white">
    <RegularInput name="email" label="Email" placeholder="sample text" as="input" />
    <RegularInput
      type="password"
      name="password"
      label="Password"
      placeholder="sample text"
      as="input"
    />
    <AcButton :loading="isPending" :disabled="isPending" class="w-full mt-6">Sign In</AcButton>

    <div class="mt-3 text-center text-sm text-neutral-fg1">
      Don’t have an account?
      <router-link class="text-pt-info font-semibold" to="/register">Sign up now</router-link>
    </div>
  </form>
</template>
