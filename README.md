<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/bundled/fitcheck

## Run Locally

**Prerequisites:**  Node.js (recommended: Node 20.19+ or 22 LTS)


1. Install dependencies (from this folder):
   `npm install`
2. Set your Gemini API key:
   - Copy `.env.example` to `.env`
   - Put your key in `GEMINI_API_KEY=...`
   - Get a key here: https://aistudio.google.com/app/apikey
3. Run the app:
   `npm run dev`
4. Open http://localhost:3000

If you change the `.env`, restart the dev server.

If you see an engine warning about Node version, please upgrade Node to 20.19+ or 22 LTS.
