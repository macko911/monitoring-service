## Digitoo monitoring service

This app lets you monitor selected URLs by periodically sending requests to them and storing responses that can be viewed in the browser using our frontend app.

### Getting started

First we need to install Node dependencies using our favourite packages manager, f.e.

```bash
yarn
# or
npm install
```

### Development

We have separate development servers for backend (using `nodemon` and `ts-node`) and frontend (using `Next.js`).

To start both servers simultaneously, run
```bash
yarn dev
# or
npm run dev
```

Front end is served at http://localhost:3000  
Back end is served at http://localhost:8080

We use `concurrently` package to run multiple npm scripts at the same time, ensuring cross-platform compatibility.

### Tests

```bash
yarn test
# or
npm test
```
