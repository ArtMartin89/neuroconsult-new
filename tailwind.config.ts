import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0C0C0C',
        foreground: '#E5E5E5',
        accent: '#007BFF',
        secondary: '#333333',
      },
    },
  },
  plugins: [],
}
export default config

