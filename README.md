## Getting Started

First, run the development server:

```bash
npm i
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Configuration

```
# .env.local

# OpenAI - https://platform.openai.com/
OPENAI_API_KEY=string

# Pinecone - https://www.pinecone.io/
PINECONE_API_KEY=string
PINECONE_ENVIRONMENT=asia-northeast1-gcp
PINECONE_INDEX_NAME=jobvectors
```


## Docker

If you're using/testing docker on local:
```
docker build -t jobboard .
docker run -p 3000:80 --env-file=.env.local jobboard
```
