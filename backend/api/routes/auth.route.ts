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


    // TODO: Still need work done on this. It's not logging in properly. Supposed to be working with OAuth and Google Firebase to redirect.
  // Google OAuth routes
  app.get(
    '/auth/google/login',
    passport.authenticate('google', {
      scope: ['profile', 'email'],
    }),(req: any, res: any) => {
      console.log('hit the auth/google/login get route', req.user);
      // res.redirect('/auth/currentUser');
      // res.send(req.user);
      res.send('<script>window.close()</script>');
    }
  );

  // TODO: Still need work done on this. It's not logging in properly. Supposed to be working with OAuth and Google Firebase to redirect.
  app.get(
    '/auth/google/redirect',
    passport.authenticate('google', {
      scope: ['profile', 'email'],
      failureRedirect: '/auth/google/login',
    }),
    (req: any, res: any) => {
      console.log('hit the auth/google/redirect get route', req.user);
      // res.redirect('/auth/currentUser');
      // res.redirect(`sendforhelp://my-host`);
      res.redirect(`sendforhelp://my-host/?user=${req.user}`);
      // res.send(req.user);
      // res.send('<script>window.close()</script>');
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
