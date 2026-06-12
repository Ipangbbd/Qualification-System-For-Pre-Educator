// ============================================================
// SCHEMA — Model Data Sistem Kualifikasi Pengajar
// Semua struktur data yang digunakan di seluruh aplikasi
// ============================================================

/**
 * @typedef {Object} User
 * @property {string} id         - UUID unik
 * @property {string} name       - Nama lengkap
 * @property {string} email      - Email (unik, dipakai login)
 * @property {string} password   - Password (disimpan sebagai plain text untuk demo; hash di produksi)
 * @property {'teacher'|'admin'} role
 * @property {string} createdAt  - ISO date string
 */
export const UserSchema = {
  id: '',
  name: '',
  email: '',
  password: '',
  role: 'teacher',
  createdAt: '',
};

/**
 * @typedef {Object} TeacherProfile
 * @property {string} id
 * @property {string} userId       - FK ke User.id
 * @property {string} fullName
 * @property {string} nip          - Nomor Induk Pegawai/Mahasiswa
 * @property {string} institution  - Institusi / Universitas
 * @property {string} subject      - Mata pelajaran yang diampu
 * @property {'D3'|'S1'|'S2'|'S3'} education
 * @property {number} experience   - Tahun pengalaman mengajar
 * @property {string} phone
 * @property {string} address
 * @property {string|null} photoUrl - base64 data URL atau null
 * @property {string} createdAt
 * @property {string} updatedAt
 */
export const TeacherProfileSchema = {
  id: '',
  userId: '',
  fullName: '',
  nip: '',
  institution: '',
  subject: '',
  education: 'S1',
  experience: 0,
  phone: '',
  address: '',
  photoUrl: null,
  createdAt: '',
  updatedAt: '',
};

/**
 * @typedef {Object} Document
 * @property {string} id
 * @property {'ijazah'|'sertifikat'|'sk_mengajar'|'portofolio'|'lainnya'} type
 * @property {string} name        - Nama file
 * @property {string} fileUrl     - base64 data URL
 * @property {string} uploadedAt
 */
export const DocumentSchema = {
  id: '',
  type: 'ijazah',
  name: '',
  fileUrl: '',
  uploadedAt: '',
};

/**
 * @typedef {Object} Scores
 * @property {number} akademik     - 0–100 (bobot 40%)
 * @property {number} pengalaman   - 0–100 (bobot 30%)
 * @property {number} kompetensi   - 0–100 (bobot 30%)
 */

/**
 * @typedef {Object} QualificationSubmission
 * @property {string} id
 * @property {string} teacherId     - FK ke User.id (role=teacher)
 * @property {'draft'|'submitted'|'under_review'|'approved'|'rejected'} status
 * @property {Document[]} documents
 * @property {Scores} scores
 * @property {number} totalScore    - Nilai akhir terbobot
 * @property {string} adminNotes    - Catatan dari admin
 * @property {string|null} reviewedBy - userId admin yang mereview
 * @property {string|null} submittedAt
 * @property {string|null} reviewedAt
 * @property {string} createdAt
 */
export const QualificationSubmissionSchema = {
  id: '',
  teacherId: '',
  status: 'draft',
  documents: [],
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
  createdAt: '',
};

// Bobot penilaian (harus total 100)
export const SCORE_WEIGHTS = {
  akademik: 0.4,    // 40%
  pengalaman: 0.3,  // 30%
  kompetensi: 0.3,  // 30%
};

// Nilai minimum untuk lulus kualifikasi
export const PASSING_SCORE = 70;

// Tipe-tipe dokumen yang wajib diunggah
export const REQUIRED_DOCUMENT_TYPES = ['ijazah', 'sk_mengajar'];

// Semua tipe dokumen
export const DOCUMENT_TYPES = [
  { value: 'ijazah', label: 'Ijazah Terakhir', required: true },
  { value: 'sertifikat', label: 'Sertifikat Kompetensi', required: false },
  { value: 'sk_mengajar', label: 'SK Mengajar', required: true },
  { value: 'portofolio', label: 'Portofolio', required: false },
  { value: 'lainnya', label: 'Dokumen Lainnya', required: false },
];

export const STATUS_LABELS = {
  draft: 'Draft',
  submitted: 'Terkirim',
  under_review: 'Sedang Direviu',
  approved: 'Disetujui',
  rejected: 'Ditolak',
};

export const STATUS_COLORS = {
  draft: '#7a7a7a',
  submitted: '#0066cc',
  under_review: '#e6a817',
  approved: '#1a8c4e',
  rejected: '#c0392b',
};
