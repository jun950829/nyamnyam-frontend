import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class', // class 기반 다크 모드 적용
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', "./stories/**/*.{js,ts,jsx,tsx,mdx}",],
  theme: {
    extend: {
      
    },
  },
  plugins: [],
};

export default config;