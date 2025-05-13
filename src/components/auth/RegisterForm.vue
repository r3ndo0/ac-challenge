<script setup lang="ts">
import { useForm } from 'vee-validate'
import RegularInput from '../ui/RegularInput.vue'
import { RegisterFormSchema } from '@/schemas/RegisterFormSchema'
import Button from '../ui/Button.vue'
import { useRegister } from '@/composables/useRegister'

const { handleSubmit } = useForm({
  validationSchema: RegisterFormSchema,
})
const { mutate, isPending } = useRegister()
const onSubmit = handleSubmit((values) => {
  mutate({ user: values })
})
</script>

<template>
  <form @submit="onSubmit" class="w-[480px] p-6 bg-white">
    <RegularInput name="username" label="Username" placeholder="sample text" as="input" />
    <RegularInput name="email" label="Email" placeholder="sample text" as="input" />
    <RegularInput
      type="password"
      name="password"
      label="Password"
      placeholder="sample text"
      as="input"
    />
    <Button :loading="isPending" :disabled="isPending" class="w-full mt-6">Sign Up</Button>
  </form>
</template>
