This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, install the dependencies:

```bash
npm run install
```

Then, copy the content of the `.env.dist` file to `.env` and change it's contents to:

```env
NEXT_PUBLIC_API_URL="https://holafly-challenge-backend.onrender.com"
NEXT_API_URL="https://holafly-challenge-backend.onrender.com"
NEXTAUTH_SECRET="mysecret"
NEXTAUTH_URL="http://localhost:3000"
```

Lastly, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
