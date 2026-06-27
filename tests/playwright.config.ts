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
    headless: true,
  },
});
