import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/',
});

// https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   base: process.env.NODE_ENV === 'production' ? '/reactMitchell/' : '/',
// });