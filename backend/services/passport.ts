import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import keys from '../config/keys';
import User from '../models/user.model';

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret,
      callbackURL: '/auth/google/redirect',
      // proxy: true,
    },
    (accessToken: any, refreshToken: any, profile: any, done: any) => {
      try {
        User.findOneAndUpdate(
          { googleId: profile.id },
          {
            googleId: profile.id,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            // TODO: Need to replace this with real age. Need to add google scope for birthday.
            age: 25,
            email: profile.emails[0].value,
          },
          { upsert: true, new: true }
        ).then((existingUser) => {
          console.log("🚀 ~ ).then ~ existingUser", existingUser)
          done(null, existingUser);
        });
      } catch (err) {
        console.log('Error running Google OAuth authentication', err);
      }
    }

    // function (
    //   accessToken: any,
    //   refreshToken: any,
    //   profile: any,
    //   cb: (arg0: null, arg1: any) => any
    // ) {
    //   return cb(null, profile);
    // }
  )
);
