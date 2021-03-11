import passport from 'passport';

module.exports = (app: any) => {
  // Google OAuth routes

  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email'],
    })
  );

  app.get(
    '/auth/google/redirect',
    passport.authenticate('google'),
    (req: any, res: any) => {
      console.log('hit the auth/google/redirect get route');
      // res.send(req.user);
      res.send('you reached the redirect URI');
    }
  );
};
