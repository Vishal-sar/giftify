module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        glow: '0 12px 40px rgba(59, 130, 246, 0.18)',
      },
      backgroundImage: {
        'gradient-hero': 'radial-gradient(circle at top, rgba(249, 115, 22, 0.12), transparent 36%), linear-gradient(180deg, #fff 0%, #f8fafc 100%)',
      },
    },
  },
  plugins: [],
};
