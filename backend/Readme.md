# backend API readme for SendForHelp.

1. `npm install`
2. Add new file to backend/config/dbConsts.ts. It should be based on the exampleDbConsts.ts file but need to add the DB password and cluster name.
3. `npm start`
4. Run ngrok by running `ngrok http 8000`.
5. Copy the ngrok 'forwarding' port (for example `http://98380aba1507.ngrok.io`). and paste it in the fetcher as the route.