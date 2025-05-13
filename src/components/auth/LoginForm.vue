<script setup lang="ts">
import { useForm } from 'vee-validate'
import RegularInput from '../ui/RegularInput.vue'
import Button from '../ui/Button.vue'
import { useRegister } from '@/composables/useRegister'
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
  <form @submit="onSubmit" class="w-[480px] p-6 bg-white">
    <RegularInput name="email" label="Email" placeholder="sample text" as="input" />
    <RegularInput
      type="password"
      name="password"
      label="Password"
      placeholder="sample text"
      as="input"
    />
    <Button :loading="isPending" :disabled="isPending" class="w-full mt-6">Sign In</Button>
  </form>
</template>
