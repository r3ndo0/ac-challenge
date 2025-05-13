import { defineComponent, h } from 'vue'
import { toast } from 'vue-sonner'
import { markRaw } from 'vue'

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

// Toast configuration
const toastConfig = {
  position: 'top-center' as const,
  style: {
    background: '#fae4e4',
    boxShadow: '0 0 10px #2533433D',
    padding: '12px 16px',
    borderRadius: '4px',
    color: '#d32f2f',
  },
}

const successToastConfig = {
  ...toastConfig,
  style: {
    ...toastConfig.style,
    background: '#E3F6E9',
    color: '#17B24A',
  },
}

// Toast utility functions
export const useToast = () => {
  const showError = (message: string) => {
    toast.error(message, toastConfig)
  }

  const showValidationError = (field: string, message: string) => {
    toast.error(markRaw(CustomToast), {
      ...toastConfig,
      componentProps: {
        htmlContent: `<p><strong>${field}</strong>: ${message}</p>`,
      },
    })
  }

  const showSuccess = (message: string) => {
    toast.success(message, successToastConfig)
  }

  const showSuccessWithHtml = (htmlContent: string) => {
    toast.success(markRaw(CustomToast), {
      ...successToastConfig,
      componentProps: {
        htmlContent,
      },
    })
  }

  return {
    showError,
    showValidationError,
    showSuccess,
    showSuccessWithHtml,
  }
}
