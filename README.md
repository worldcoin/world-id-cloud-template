# World ID Next.js Template

This is a template repository for creating a new project using Next.js, TailwindCSS, and the [World ID SDK](https://id.worldcoin.org). This template isn't intended for use cases that require on-chain verification, but rather for use cases that leverage off-chain web backend verification.

## Getting Started

First, set the correct Node.js version using `nvm` and run the development server:

```bash
nvm use 18
pnpm i && pnpm dev
```

Copy `.env.example` to `.env.local` and add your World ID App ID and Action Name to the appropriate variables.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This template includes an API route to verify the proof returned by the IDKit widget at `/api/verify`. Edit `src/app/api/verify/route.ts` to handle any backend functions you need to perform.

You can start editing the page by modifying `src/app/Worldcoin.tsx`. The page auto-updates as you edit the file. Edit the `onSuccess` function to define frontend behavior once the proof has been verified.

The `src/app/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js and World ID, take a look at the following resources:

-   [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
-   [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
-   [World ID Documentation](https://docs.worldcoin.org/) - learn about World ID features and API.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
