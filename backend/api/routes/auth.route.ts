import passport from 'passport';

module.exports = (app: any) => {
  // Returns the current user, if logged in
  app.get('/auth/currentUser', (req: any, res: any) => {
    if (req.user) {
      res.send(req.user);
    } else {
      res.redirect('/auth/google/login');
    }
  });

  // Google OAuth routes
  app.get(
    '/auth/google/login',
    passport.authenticate('google', {
      scope: ['profile', 'email'],
    })
  );

  app.get(
    '/auth/google/redirect',
    passport.authenticate('google', { failureRedirect: '/auth/google/login' }),
    (req: any, res: any) => {
      console.log('hit the auth/google/redirect get route');
      // res.redirect('/auth/currentUser');
      // res.send(req.user);
      res.send('<script>window.close()</script>');
    }
  );

  app.get('/auth/logout', (req: any, res: any) => {
    console.log('loggin out the current user');
    req.logout();
    // TODO: Need to create a logout screen and redirect to it.
    // res.redirect('/logout')
    // res.redirect('/auth/google/login')
    // res.send(req.user);
    res.send('You have been logged out');
  });
};
