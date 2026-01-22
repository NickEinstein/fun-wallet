/** @type {import('tailwindcss').Config} */
export default {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Cool blue color palette
        brand: '#0ea5e9',
        primary: {
          DEFAULT: '#0f172a',
          foreground: '#f8fafc'
        },
        secondary: {
          DEFAULT: '#f1f5f9',
          foreground: '#0f172a'
        },
        accent: {
          DEFAULT: '#0ea5e9',
          foreground: '#ffffff'
        },
        muted: {
          DEFAULT: '#f1f5f9',
          foreground: '#64748b'
        },
        card: {
          DEFAULT: '#ffffff',
          foreground: '#0f172a'
        },
        border: '#e2e8f0',
        input: '#e2e8f0',
        ring: '#0ea5e9',
        background: '#ffffff',
        foreground: '#0f172a',
        destructive: {
          DEFAULT: '#ef4444',
          foreground: '#ffffff'
        },
        success: '#22c55e'
      },
      fontFamily: {
        display: ['Inter', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        card: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)'
      },
      backgroundImage: {
        'gradient-hero': 'linear-gradient(135deg, #f8fafc 0%, #e0f2fe 50%, #f0f9ff 100%)',
        'gradient-accent': 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
