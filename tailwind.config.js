/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#070b14',
          900: '#0a0f1c',
          800: '#101828',
          700: '#182236',
          600: '#22304a',
        },
        paper: '#e8ecf4',
        muted: '#8b97ad',
        heat: {
          cold: '#2c7bb6',
          cool: '#abd9e9',
          mid: '#ffdd57',
          warm: '#fdae61',
          hot: '#e8112d',
        },
      },
      fontFamily: {
        display: ['Archivo', 'system-ui', 'sans-serif'],
        body: ['"IBM Plex Sans"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      backgroundImage: {
        'heat-gradient':
          'linear-gradient(90deg, #2c7bb6 0%, #abd9e9 25%, #ffdd57 50%, #fdae61 75%, #e8112d 100%)',
      },
      keyframes: {
        blink: { '0%, 100%': { opacity: 1 }, '50%': { opacity: 0 } },
        pulseDot: {
          '0%': { transform: 'scale(1)', opacity: 0.9 },
          '70%': { transform: 'scale(2.6)', opacity: 0 },
          '100%': { transform: 'scale(2.6)', opacity: 0 },
        },
      },
      animation: {
        blink: 'blink 1s step-end infinite',
        pulseDot: 'pulseDot 2.4s ease-out infinite',
      },
    },
  },
  plugins: [],
}
