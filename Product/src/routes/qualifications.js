import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { getAll, getById, insert, update, COLLECTIONS } from '../store/db.js';
import { authMiddleware } from '../services/authService.js';

const router = express.Router();

/**
 * GET /api/qualifications
 * List all qualification submissions
 */
router.get('/', authMiddleware, async (req, res) => {
  try {
    const submissions = await getAll(COLLECTIONS.SUBMISSIONS);
    // If teacher, only show their submissions
    if (req.user.role === 'teacher') {
      const teacherSubmissions = submissions.filter(s => s.teacherId === req.user.id);
      return res.status(200).json({ success: true, data: teacherSubmissions });
    }
    // Admin sees all
    res.status(200).json({ success: true, data: submissions });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
});

/**
 * POST /api/qualifications
 * Create a new qualification submission
 */
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { documents } = req.body;
    
    if (req.user.role !== 'teacher') {
      return res.status(403).json({ error: 'Forbidden', message: 'Hanya pengajar yang bisa membuat pengajuan' });
    }

    const newSubmission = {
      id: uuidv4(),
      teacherId: req.user.id,
      status: 'under_review',
      documents: documents || [],
      scores: { akademik: 0, pengalaman: 0, kompetensi: 0 },
      totalScore: 0,
      adminNotes: '',
      reviewedBy: null,
      submittedAt: new Date().toISOString(),
      reviewedAt: null,
      createdAt: new Date().toISOString()
    };

    const created = await insert(COLLECTIONS.SUBMISSIONS, newSubmission);
    res.status(201).json({ success: true, data: created });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
});

/**
 * PUT /api/qualifications/:id/status
 * Update submission status (Admin only)
 */
router.put('/:id/status', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden', message: 'Hanya admin yang bisa mengubah status' });
    }

    const { status, adminNotes } = req.body;
    const submission = await getById(COLLECTIONS.SUBMISSIONS, req.params.id);
    
    if (!submission) {
      return res.status(404).json({ error: 'Not Found', message: 'Pengajuan tidak ditemukan' });
    }

    const updated = await update(COLLECTIONS.SUBMISSIONS, req.params.id, {
      status,
      adminNotes: adminNotes || submission.adminNotes,
      reviewedBy: req.user.id,
      reviewedAt: new Date().toISOString()
    });

    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
});

export default router;
