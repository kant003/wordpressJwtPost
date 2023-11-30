import type {Config} from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      content: {
        flagES: 'url("/icons/es.svg")',
        flagGL: 'url("/icons/es-ga.svg")',
        flagEN: 'url("/icons/gb.svg")'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      },
      fontFamily: {
        satoshi: ['Satoshi', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        sans: ['Inter var', 'sans-serif']
      }
    }
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')]
}
export default config
