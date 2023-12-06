import type { Preview } from '@storybook/react'

import '@/styles/app.css'
import '@/styles/gradient.css'
import '@/styles/periphery.css'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
