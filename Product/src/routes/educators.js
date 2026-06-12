import express from 'express';
import { getAll, getById, update, COLLECTIONS } from '../store/db.js';
import { authMiddleware } from '../services/authService.js';

const router = express.Router();

/**
 * GET /api/educators
 * List all teacher profiles
 */
router.get('/', authMiddleware, async (req, res) => {
  try {
    const profiles = await getAll(COLLECTIONS.TEACHER_PROFILES);
    res.status(200).json({ success: true, data: profiles });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
});

/**
 * GET /api/educators/:id
 * Get a specific teacher profile
 */
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const profile = await getById(COLLECTIONS.TEACHER_PROFILES, req.params.id);
    if (!profile) {
      return res.status(404).json({ error: 'Not Found', message: 'Profil tidak ditemukan' });
    }
    res.status(200).json({ success: true, data: profile });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
});

/**
 * PUT /api/educators/:id
 * Update a specific teacher profile
 */
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const profile = await getById(COLLECTIONS.TEACHER_PROFILES, req.params.id);
    if (!profile) {
      return res.status(404).json({ error: 'Not Found', message: 'Profil tidak ditemukan' });
    }

    // Only admin or the profile owner can update
    if (req.user.role !== 'admin' && profile.userId !== req.user.id) {
      return res.status(403).json({ error: 'Forbidden', message: 'Anda tidak memiliki akses' });
    }

    const updatedProfile = await update(COLLECTIONS.TEACHER_PROFILES, req.params.id, {
      ...req.body,
      updatedAt: new Date().toISOString()
    });

    res.status(200).json({ success: true, data: updatedProfile });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
});

export default router;
