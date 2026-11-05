import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';

const srcPath = folder =>
  fileURLToPath(new URL(`./src/${folder}`, import.meta.url));

export default defineConfig({
  plugins: [react()],
  base: '/goit-react-hw-08-phonebook/',
  resolve: {
    alias: {
      App: srcPath('App.jsx'),
      components: srcPath('components'),
      pages: srcPath('pages'),
      hooks: srcPath('hooks'),
      store: srcPath('store'),
      styled: srcPath('styled'),
    },
  },
});
