// ============================================================
// DB.JS — Mock Database Engine berbasis localStorage
// Menyediakan operasi CRUD generik untuk semua koleksi data
// ============================================================

const DB_PREFIX = 'qualifikasi_';

// Nama koleksi yang tersedia
export const COLLECTIONS = {
  USERS: 'users',
  TEACHER_PROFILES: 'teacher_profiles',
  SUBMISSIONS: 'submissions',
  SESSION: 'session',
};

// ─── Helpers internal ───────────────────────────────────────

function storageKey(collection) {
  return `${DB_PREFIX}${collection}`;
}

function readCollection(collection) {
  try {
    const raw = localStorage.getItem(storageKey(collection));
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeCollection(collection, data) {
  localStorage.setItem(storageKey(collection), JSON.stringify(data));
}

// Simulasi delay jaringan (ms) agar terasa seperti async API call nyata
function delay(ms = 120) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ─── API Publik ──────────────────────────────────────────────

/**
 * Ambil semua dokumen dari sebuah koleksi
 * @param {string} collection
 * @returns {Promise<Array>}
 */
export async function getAll(collection) {
  await delay();
  return readCollection(collection);
}

/**
 * Ambil satu dokumen berdasarkan id
 * @param {string} collection
 * @param {string} id
 * @returns {Promise<Object|null>}
 */
export async function getById(collection, id) {
  await delay();
  const records = readCollection(collection);
  return records.find((r) => r.id === id) ?? null;
}

/**
 * Cari dokumen berdasarkan field tertentu
 * @param {string} collection
 * @param {Object} query  - contoh: { role: 'teacher' }
 * @returns {Promise<Array>}
 */
export async function findWhere(collection, query) {
  await delay();
  const records = readCollection(collection);
  return records.filter((r) =>
    Object.entries(query).every(([k, v]) => r[k] === v)
  );
}

/**
 * Tambah satu dokumen baru
 * @param {string} collection
 * @param {Object} data  - harus sudah punya field `id`
 * @returns {Promise<Object>}
 */
export async function insert(collection, data) {
  await delay();
  const records = readCollection(collection);
  records.push(data);
  writeCollection(collection, records);
  return data;
}

/**
 * Update dokumen berdasarkan id
 * @param {string} collection
 * @param {string} id
 * @param {Object} updates  - fields yang ingin diubah (partial update)
 * @returns {Promise<Object|null>}
 */
export async function update(collection, id, updates) {
  await delay();
  const records = readCollection(collection);
  const idx = records.findIndex((r) => r.id === id);
  if (idx === -1) return null;
  records[idx] = { ...records[idx], ...updates };
  writeCollection(collection, records);
  return records[idx];
}

/**
 * Hapus dokumen berdasarkan id
 * @param {string} collection
 * @param {string} id
 * @returns {Promise<boolean>}
 */
export async function remove(collection, id) {
  await delay();
  const records = readCollection(collection);
  const filtered = records.filter((r) => r.id !== id);
  if (filtered.length === records.length) return false;
  writeCollection(collection, filtered);
  return true;
}

/**
 * Hapus SEMUA data (untuk testing / reset)
 * @param {string} collection
 * @returns {Promise<void>}
 */
export async function clearCollection(collection) {
  await delay();
  localStorage.removeItem(storageKey(collection));
}

/**
 * Cek apakah database sudah diinisialisasi
 * @returns {boolean}
 */
export function isInitialized() {
  return localStorage.getItem(`${DB_PREFIX}initialized`) === 'true';
}

/**
 * Tandai database sudah diinisialisasi
 */
export function markInitialized() {
  localStorage.setItem(`${DB_PREFIX}initialized`, 'true');
}

/**
 * Reset seluruh database (hapus semua data termasuk flag init)
 */
export function resetDatabase() {
  Object.values(COLLECTIONS).forEach((col) => {
    localStorage.removeItem(storageKey(col));
  });
  localStorage.removeItem(`${DB_PREFIX}initialized`);
}

// ─── Session (non-array) ─────────────────────────────────────

/**
 * Simpan session pengguna yang sedang login
 * @param {Object} user  - objek user tanpa password
 */
export function saveSession(user) {
  localStorage.setItem(storageKey(COLLECTIONS.SESSION), JSON.stringify(user));
}

/**
 * Ambil session yang aktif
 * @returns {Object|null}
 */
export function getSession() {
  try {
    const raw = localStorage.getItem(storageKey(COLLECTIONS.SESSION));
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

/**
 * Hapus session (logout)
 */
export function clearSession() {
  localStorage.removeItem(storageKey(COLLECTIONS.SESSION));
}
