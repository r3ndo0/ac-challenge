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
  <form @submit="onSubmit" class="md:w-[480px] rounded-lg w-[350px] p-4 md:p-6 bg-white">
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
    <div class="mt-3 text-center text-sm text-neutral-fg1">
      Have an account?
      <router-link class="text-pt-info font-semibold" to="/login">Sign in</router-link>
    </div>
  </form>
</template>
