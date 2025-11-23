import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
// FIX: Added import for fileURLToPath to correctly resolve __dirname in ES modules.
import { fileURLToPath } from 'url';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    // Determine if we are building for GitHub Pages
    const isGitHubPages = process.env.GITHUB_PAGES === 'true';

    return {
      // Set the base path for assets. For GitHub Pages, this typically needs to be the repository name.
      // Assumes repository name is 'academic-homepage'. Adjust if your repo name is different.
      base: isGitHubPages ? '/academic-homepage/' : '/',
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          // FIX: Replaced __dirname with path.dirname(fileURLToPath(import.meta.url))
          '@': path.resolve(path.dirname(fileURLToPath(import.meta.url)), '.'),
        }
      }
    };
});
