# Google Docs to Markdown Exporter

A local server that connects to Google Docs via OAuth, exports documents as markdown, and processes images through Cloudflare R2.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set up Google Cloud Project:
   - Go to [Google Cloud Console](https://console.cloud.google.com)
   - Create a new project
   - Enable the Google Docs API
   - Create OAuth 2.0 credentials
   - Download the credentials and save as `credentials.json` in the project root

3. Set up Cloudflare R2:
   - Create an R2 bucket
   - Get your R2 credentials
   - Add them to your `.env` file

4. Create a `.env` file with the following variables:
```
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
R2_ACCESS_KEY_ID=your_r2_access_key
R2_SECRET_ACCESS_KEY=your_r2_secret_key
R2_BUCKET_NAME=your_bucket_name
```

5. Run the development server:
```bash
npm run dev
```

## Project Structure

- `src/`
  - `index.ts` - Main server entry point
  - `config/` - Configuration files
  - `services/` - Core services (Google Docs, R2)
  - `routes/` - API routes
  - `utils/` - Utility functions
  - `types/` - TypeScript type definitions

## Features

- OAuth2 authentication with Google
- Google Docs to Markdown conversion
- Image processing and R2 upload
- Local development server 