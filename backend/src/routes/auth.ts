import { Router, Request, Response } from 'express';
import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github2';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import { logger } from '../utils/logger';

const router = Router();

// Configure GitHub Strategy
passport.use(new GitHubStrategy({
    clientID: config.github.clientId,
    clientSecret: config.github.clientSecret,
    callbackURL: config.github.callbackUrl,
  },
  async (accessToken: string, refreshToken: string, profile: any, done: any) => {
    try {
      // TODO: Find or create user in database
      const user = {
        id: profile.id,
        email: profile.emails?.[0]?.value,
        username: profile.username,
        displayName: profile.displayName,
        avatarUrl: profile.photos?.[0]?.value,
        githubId: profile.id,
      };
      done(null, user);
    } catch (error) {
      done(error);
    }
  }
));

// Configure Google Strategy
passport.use(new GoogleStrategy({
    clientID: config.google.clientId,
    clientSecret: config.google.clientSecret,
    callbackURL: config.google.callbackUrl,
  },
  async (accessToken: string, refreshToken: string, profile: any, done: any) => {
    try {
      // TODO: Find or create user in database
      const user = {
        id: profile.id,
        email: profile.emails?.[0]?.value,
        username: profile.displayName?.replace(/\s+/g, '').toLowerCase(),
        displayName: profile.displayName,
        avatarUrl: profile.photos?.[0]?.value,
        googleId: profile.id,
      };
      done(null, user);
    } catch (error) {
      done(error);
    }
  }
));

// Serialize user
passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

// Deserialize user
passport.deserializeUser(async (id: string, done) => {
  try {
    // TODO: Fetch user from database
    done(null, { id });
  } catch (error) {
    done(error);
  }
});

// GitHub OAuth routes
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  (req: Request, res: Response) => {
    // Generate JWT token
    const token = jwt.sign(
      { id: (req.user as any).id, email: (req.user as any).email, role: 'user' },
      config.jwtSecret,
      { expiresIn: '7d' }
    );
    res.redirect(`${config.appUrl}/auth/callback?token=${token}`);
  }
);

// Google OAuth routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req: Request, res: Response) => {
    // Generate JWT token
    const token = jwt.sign(
      { id: (req.user as any).id, email: (req.user as any).email, role: 'user' },
      config.jwtSecret,
      { expiresIn: '7d' }
    );
    res.redirect(`${config.appUrl}/auth/callback?token=${token}`);
  }
);

// Logout
router.post('/logout', (req: Request, res: Response) => {
  req.logout(() => {
    res.json({ message: 'Logged out successfully' });
  });
});

// Get current user
router.get('/me', (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  res.json(req.user);
});

export default router;
