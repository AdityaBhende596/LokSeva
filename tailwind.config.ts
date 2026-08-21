import type { Config } from 'tailwindcss';
const config: Config = { content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'], theme: { extend: { colors: { ink: '#10233f', mist: '#f6f7f3', blue: '#315f9f', sage: '#4d796b', line: '#dce2e6', amber: '#b57925' }, fontFamily: { sans: ['Arial', 'sans-serif'], display: ['Georgia', 'serif'] }, boxShadow: { soft: '0 14px 38px rgba(16,35,63,.08)', lift: '0 20px 45px rgba(16,35,63,.13)' } } }, plugins: [] };
export default config;
