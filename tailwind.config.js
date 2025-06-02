// tailwind.config.ts
// import { Config } from 'tailwindcss' // Not needed in JS files

const config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
       fontFamily: {
        heading: 'var(--font-heading)',
        body: 'var(--font-body)',
        code: 'var(--font-code)',
      },
    },
  },
  plugins: [],
}

export default config
