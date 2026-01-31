import { Router, Request, Response } from 'express';
import { AuthRequest } from '../middleware/auth';

const router = Router();

// Get user profile
router.get('/profile', async (req: AuthRequest, res: Response) => {
  try {
    // TODO: Fetch from database
    res.json({
      id: req.user?.id,
      email: req.user?.email,
      role: req.user?.role,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

// Update user profile
router.put('/profile', async (req: AuthRequest, res: Response) => {
  try {
    const updates = req.body;
    // TODO: Update in database
    res.json({
      ...updates,
      id: req.user?.id,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

export default router;
