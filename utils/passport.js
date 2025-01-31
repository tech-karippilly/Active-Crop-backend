import Passport from "passport";
import GoogleStrategy from 'passport-google-oidc'
import dotenv from 'dotenv';
import { User } from "../models/index.js";
dotenv.config();


function createSatergyGoogle() {
    // Passport.use(new GoogleStrategy({
    //     clientID:process.env.GOOGLE_CLIENT_ID,
    //     clientSecret:process.env.GOOGLE_CLIENT_SECRET,
    //     callbackURL:'http://localhost:3000/api/auth/google/callback'
    // } ,(accessToken,refreshToken,profile,done)=>{
    //     return done(null,profile)
    // }))

    Passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://localhost:3000/api/auth/google/callback'
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            // Check if user exists in the database
            let user = await User.findOne({ googleId: profile.id });

            if (!user) {
                // Create a new user if not found
                user = await User.create({
                    googleId: profile.id,
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    avatar: profile.photos[0].value
                });
            }

            return done(null, user); // Pass the user to Passport
        } catch (err) {
            return done(err, null);
        }
    }));

    Passport.serializeUser((user, done) => {
        done(null, user.id); // Serialize only the user's ID
    });

    Passport.deserializeUser(async (id, done) => {
        // Fetch the user from your database using the ID
        // Replace `User.findById` with your actual database call
        const user = await User.findById(id)
        done(null, user);
    });

}

export default createSatergyGoogle




