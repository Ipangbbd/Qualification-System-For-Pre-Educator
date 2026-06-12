import express from 'express';
import { getById, update, COLLECTIONS } from '../store/db.js';
import { authMiddleware } from '../services/authService.js';

const router = express.Router();

/**
 * PUT /api/assessments/:id/score
 * Berikan penilaian untuk pengajuan kualifikasi (Hanya Admin)
 */
router.put('/:id/score', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden', message: 'Hanya admin yang bisa memberikan nilai' });
    }

    const { scores } = req.body;
    if (!scores || typeof scores.akademik !== 'number' || typeof scores.pengalaman !== 'number' || typeof scores.kompetensi !== 'number') {
      return res.status(400).json({ error: 'Bad Request', message: 'Format skor tidak valid' });
    }

    const submission = await getById(COLLECTIONS.SUBMISSIONS, req.params.id);
    if (!submission) {
      return res.status(404).json({ error: 'Not Found', message: 'Pengajuan tidak ditemukan' });
    }

    // Hitung total score berdasarkan bobot (akademik 40%, pengalaman 30%, kompetensi 30%)
    const totalScore = (scores.akademik * 0.4) + (scores.pengalaman * 0.3) + (scores.kompetensi * 0.3);

    const updated = await update(COLLECTIONS.SUBMISSIONS, req.params.id, {
      scores,
      totalScore,
      reviewedBy: req.user.id,
      reviewedAt: new Date().toISOString()
    });

    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
});

export default router;
