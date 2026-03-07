import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  use: {
    baseURL: 'http://localhost:5173',
    headless: true,
  },
  webServer: [
    {
      command: 'npm run dev',
      port: 5173,
      reuseExistingServer: true,
    },
    {
      command: 'cd server && PORT=3001 npm run dev',
      port: 3001,
      reuseExistingServer: true,
    },
  ],
});