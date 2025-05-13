import { defineComponent, h } from 'vue'

// Generic toast component that accepts plain HTML content
export const CustomToast = defineComponent({
  props: {
    htmlContent: {
      type: String,
      required: true,
    },
  },
  setup({ htmlContent }) {
    return () =>
      h('div', {
        innerHTML: htmlContent, // Render the provided HTML content
      })
  },
})
