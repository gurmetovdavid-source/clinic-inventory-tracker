import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#7C9A8B',
        secondary: '#6A9FD8',
        accent: '#C9A96E',
        danger: '#D27070',
      },
    },
  },
  plugins: [],
};

export default config;
