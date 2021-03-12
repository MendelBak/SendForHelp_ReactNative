import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import keys from '../config/keys';
import { IUser } from '../interfaces/IUser';
import User from '../models/user.model';
// import mongoose from 'mongoose'

// const User = mongoose.model('user')

passport.serializeUser((user: any, done) => {
  console.log("🚀 ~ passport.serializeUser ~ user", user)
  done(null, user.id);
});

passport.deserializeUser((userId, done) => {
  console.log("🚀 ~ passport.deserializeUser ~ userId", userId)
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
          console.log('🚀 ~ ).then ~ existingUser', user);
          done(null, user);
        });
      } catch (err) {
        console.log('Error running Google OAuth authentication', err);
      }
    }
  )
);
