// ============================================================
// AUTH SERVICE — Autentikasi pengguna (login, register, logout)
// ============================================================

import { v4 as uuidv4 } from 'uuid';
import {
  getAll, insert, findWhere, COLLECTIONS,
  saveSession, getSession, clearSession,
} from '../store/db.js';

/**
 * Daftarkan pengguna baru (role default: teacher)
 * @param {{ name: string, email: string, password: string }} data
 * @returns {Promise<{ success: boolean, user?: Object, error?: string }>}
 */
export async function register({ name, email, password }) {
  if (!name || !email || !password) {
    return { success: false, error: 'Semua kolom wajib diisi.' };
  }
  if (password.length < 6) {
    return { success: false, error: 'Password minimal 6 karakter.' };
  }

  const existing = await findWhere(COLLECTIONS.USERS, { email });
  if (existing.length > 0) {
    return { success: false, error: 'Email sudah terdaftar.' };
  }

  const newUser = {
    id: uuidv4(),
    name,
    email,
    password, // di produksi: hash dengan bcrypt
    role: 'teacher',
    createdAt: new Date().toISOString(),
  };

  await insert(COLLECTIONS.USERS, newUser);

  const { password: _, ...safeUser } = newUser;
  saveSession(safeUser);

  return { success: true, user: safeUser };
}

/**
 * Login pengguna
 * @param {{ email: string, password: string }} credentials
 * @returns {Promise<{ success: boolean, user?: Object, error?: string }>}
 */
export async function login({ email, password }) {
  if (!email || !password) {
    return { success: false, error: 'Email dan password wajib diisi.' };
  }

  const users = await findWhere(COLLECTIONS.USERS, { email });
  if (users.length === 0) {
    return { success: false, error: 'Email tidak ditemukan.' };
  }

  const user = users[0];
  if (user.password !== password) {
    return { success: false, error: 'Password salah.' };
  }

  const { password: _, ...safeUser } = user;
  saveSession(safeUser);

  return { success: true, user: safeUser };
}

/**
 * Logout pengguna yang sedang login
 * @returns {void}
 */
export function logout() {
  clearSession();
}

/**
 * Ambil pengguna yang sedang login dari session
 * @returns {Object|null}
 */
export function getCurrentUser() {
  return getSession();
}

/**
 * Simulasi reset password (dalam demo: hanya cek apakah email ada)
 * @param {string} email
 * @returns {Promise<{ success: boolean, message?: string, error?: string }>}
 */
export async function resetPassword(email) {
  const users = await findWhere(COLLECTIONS.USERS, { email });
  if (users.length === 0) {
    return { success: false, error: 'Email tidak ditemukan.' };
  }
  return {
    success: true,
    message: `Link reset password telah dikirim ke ${email}.`,
  };
}

/**
 * Ambil semua user (hanya untuk admin)
 * @returns {Promise<Array>}
 */
export async function getAllUsers() {
  const users = await getAll(COLLECTIONS.USERS);
  return users.map(({ password: _, ...u }) => u);
}
