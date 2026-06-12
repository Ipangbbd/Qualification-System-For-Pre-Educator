import express from 'express';
import { registerUser, loginUser, authMiddleware } from '../services/authService.js';

const router = express.Router();

/**
 * POST /api/auth/register
 * Register a new user
 */
router.post('/register', async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Username, email, and password are required'
      });
    }

    const result = await registerUser(username, email, password, role);
    
    if (!result.success) {
      return res.status(400).json(result);
    }

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({
      error: 'Internal Server Error',
      message: error.message
    });
  }
});

/**
 * POST /api/auth/login
 * Login user and get JWT token
 */
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Username and password are required'
      });
    }

    const result = await loginUser(username, password);
    
    if (!result.success) {
      return res.status(401).json(result);
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      error: 'Internal Server Error',
      message: error.message
    });
  }
});

/**
 * GET /api/auth/verify
 * Verify JWT token
 */
router.get('/verify', authMiddleware, (req, res) => {
  res.status(200).json({
    valid: true,
    user: req.user
  });
});

export default router;
