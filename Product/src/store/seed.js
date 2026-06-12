// ============================================================
// SEED.JS — Data awal / dummy untuk database
// Dijalankan sekali saat pertama kali aplikasi dibuka
// ============================================================

import { v4 as uuidv4 } from 'uuid';
import { insert, markInitialized, isInitialized, COLLECTIONS } from './db.js';

const now = () => new Date().toISOString();

// ─── Seed Data ───────────────────────────────────────────────

const adminId = uuidv4();
const teacher1Id = uuidv4();
const teacher2Id = uuidv4();
const teacher3Id = uuidv4();

const profile1Id = uuidv4();
const profile2Id = uuidv4();
const profile3Id = uuidv4();

const submission1Id = uuidv4();
const submission2Id = uuidv4();
const submission3Id = uuidv4();

const SEED_USERS = [
  {
    id: adminId,
    name: 'Admin Sistem',
    email: 'admin@kualifikasi.id',
    password: 'admin123',
    role: 'admin',
    createdAt: now(),
  },
  {
    id: teacher1Id,
    name: 'Siti Rahayu',
    email: 'siti@kualifikasi.id',
    password: 'guru123',
    role: 'teacher',
    createdAt: now(),
  },
  {
    id: teacher2Id,
    name: 'Budi Santoso',
    email: 'budi@kualifikasi.id',
    password: 'guru123',
    role: 'teacher',
    createdAt: now(),
  },
  {
    id: teacher3Id,
    name: 'Dewi Permatasari',
    email: 'dewi@kualifikasi.id',
    password: 'guru123',
    role: 'teacher',
    createdAt: now(),
  },
];

const SEED_PROFILES = [
  {
    id: profile1Id,
    userId: teacher1Id,
    fullName: 'Siti Rahayu, S.Pd.',
    nip: '19920514 201801 2 001',
    institution: 'Universitas Negeri Jakarta',
    subject: 'Matematika',
    education: 'S1',
    experience: 4,
    phone: '081234567890',
    address: 'Jl. Cempaka Putih No. 12, Jakarta Pusat',
    photoUrl: null,
    createdAt: now(),
    updatedAt: now(),
  },
  {
    id: profile2Id,
    userId: teacher2Id,
    fullName: 'Budi Santoso, M.Pd.',
    nip: '19880220 201501 1 002',
    institution: 'Universitas Pendidikan Indonesia',
    subject: 'Bahasa Indonesia',
    education: 'S2',
    experience: 8,
    phone: '082345678901',
    address: 'Jl. Anggrek Raya No. 45, Bandung',
    photoUrl: null,
    createdAt: now(),
    updatedAt: now(),
  },
  {
    id: profile3Id,
    userId: teacher3Id,
    fullName: 'Dewi Permatasari, S.Pd.',
    nip: '19950308 202001 2 003',
    institution: 'Universitas Gadjah Mada',
    subject: 'IPA',
    education: 'S1',
    experience: 2,
    phone: '083456789012',
    address: 'Jl. Melati No. 7, Yogyakarta',
    photoUrl: null,
    createdAt: now(),
    updatedAt: now(),
  },
];

const SEED_SUBMISSIONS = [
  {
    id: submission1Id,
    teacherId: teacher1Id,
    status: 'approved',
    documents: [
      {
        id: uuidv4(),
        type: 'ijazah',
        name: 'Ijazah_S1_Siti.pdf',
        fileUrl: '',
        uploadedAt: now(),
      },
      {
        id: uuidv4(),
        type: 'sk_mengajar',
        name: 'SK_Mengajar_Siti.pdf',
        fileUrl: '',
        uploadedAt: now(),
      },
      {
        id: uuidv4(),
        type: 'sertifikat',
        name: 'Sertifikat_Kompetensi_Siti.pdf',
        fileUrl: '',
        uploadedAt: now(),
      },
    ],
    scores: {
      akademik: 85,
      pengalaman: 75,
      kompetensi: 80,
    },
    totalScore: 81,
    adminNotes: 'Pengajar memenuhi semua syarat kualifikasi dengan nilai memuaskan.',
    reviewedBy: adminId,
    submittedAt: new Date(Date.now() - 7 * 86400000).toISOString(),
    reviewedAt: new Date(Date.now() - 5 * 86400000).toISOString(),
    createdAt: new Date(Date.now() - 10 * 86400000).toISOString(),
  },
  {
    id: submission2Id,
    teacherId: teacher2Id,
    status: 'under_review',
    documents: [
      {
        id: uuidv4(),
        type: 'ijazah',
        name: 'Ijazah_S2_Budi.pdf',
        fileUrl: '',
        uploadedAt: now(),
      },
      {
        id: uuidv4(),
        type: 'sk_mengajar',
        name: 'SK_Mengajar_Budi.pdf',
        fileUrl: '',
        uploadedAt: now(),
      },
    ],
    scores: {
      akademik: 0,
      pengalaman: 0,
      kompetensi: 0,
    },
    totalScore: 0,
    adminNotes: '',
    reviewedBy: null,
    submittedAt: new Date(Date.now() - 2 * 86400000).toISOString(),
    reviewedAt: null,
    createdAt: new Date(Date.now() - 4 * 86400000).toISOString(),
  },
  {
    id: submission3Id,
    teacherId: teacher3Id,
    status: 'draft',
    documents: [
      {
        id: uuidv4(),
        type: 'ijazah',
        name: 'Ijazah_S1_Dewi.pdf',
        fileUrl: '',
        uploadedAt: now(),
      },
    ],
    scores: {
      akademik: 0,
      pengalaman: 0,
      kompetensi: 0,
    },
    totalScore: 0,
    adminNotes: '',
    reviewedBy: null,
    submittedAt: null,
    reviewedAt: null,
    createdAt: now(),
  },
];

// ─── Fungsi Utama ────────────────────────────────────────────

/**
 * Inisialisasi database dengan seed data.
 * Hanya berjalan jika belum pernah diinisialisasi sebelumnya.
 * @param {boolean} [force=false] - Paksa re-seed meski sudah ada data
 */
export async function seedDatabase(force = false) {
  if (!force && isInitialized()) {
    console.info('[Seed] Database sudah ada. Skip seeding.');
    return;
  }

  console.info('[Seed] Memuat data awal...');

  for (const user of SEED_USERS) {
    await insert(COLLECTIONS.USERS, user);
  }

  for (const profile of SEED_PROFILES) {
    await insert(COLLECTIONS.TEACHER_PROFILES, profile);
  }

  for (const submission of SEED_SUBMISSIONS) {
    await insert(COLLECTIONS.SUBMISSIONS, submission);
  }

  markInitialized();
  console.info('[Seed] Selesai. Data awal berhasil dimuat.');
  console.info('[Seed] Akun demo:');
  console.info('  Admin  → admin@kualifikasi.id / admin123');
  console.info('  Guru 1 → siti@kualifikasi.id  / guru123');
  console.info('  Guru 2 → budi@kualifikasi.id  / guru123');
  console.info('  Guru 3 → dewi@kualifikasi.id  / guru123');
}
