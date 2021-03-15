import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import keys from '../config/keys';
import { IUser } from '../interfaces/IUser';
import User from '../models/user.model';
// import mongoose from 'mongoose'

// const User = mongoose.model('user')

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser((userId, done) => {
  User.findById(userId).then((user) => {
    done(null, user);
  });
});

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
        ).then((user) => {
          console.log('🚀 ~ accessToken', accessToken);
          done(null, user);

          // TODO: Need to return refreshToken and accessToken? Or does it happen automatically via done()?
          // return accessToken;
        });
      } catch (err) {
        console.log('Error running Google OAuth authentication', err);
        done(err, null);
      }
    }
  )
);
