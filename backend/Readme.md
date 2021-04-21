# backend API readme for SendForHelp.

1. Navigate into the /backend directory and run `npm install`
2. Add new file to backend/config/dbConsts.ts. It should be based on the exampleDbConsts.ts file but need to add the DB password and cluster name.
3. `npm start`
4. Run ngrok by running `ngrok http 8000` (ngrok is currently located in my /Downloads directory)
5. Copy the ngrok 'forwarding' port (for example `http://98380aba1507.ngrok.io`). and paste it in the fetcher as the route.

<!-- Good tutorial on installing server on new EC2 instance -->
https://ourcodeworld.com/articles/read/977/how-to-deploy-a-node-js-application-on-aws-ec2-server
## Connecting via SSH to AWS linux server
- Navigate to directory holding my AWS `.pem` keyfile. 
- Run `ssh -i "awsKeyPair.pem" ubuntu@ec2-54-242-127-157.compute-1.amazonaws.com` in linux terminal or Windows using PUTTY.

