import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './src',

  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
  ],

  use: {
    baseURL: 'http://localhost:3000',
    // mostrar o browser na tela durante os testes
    headless: false,
  },
});
