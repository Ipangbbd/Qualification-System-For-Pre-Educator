// ============================================================
// AUTH SERVICE — Autentikasi pengguna (login, register, logout)
// Menggunakan JWT untuk autentikasi Node.js backend
// ============================================================

import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import {
  getAll, insert, findWhere, COLLECTIONS
} from '../store/db.js';

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key';

/**
 * Daftarkan pengguna baru
 * @param {string} name 
 * @param {string} email 
 * @param {string} password 
 * @param {string} role 
 */
export async function registerUser(name, email, password, role = 'teacher') {
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
    password, // demo: plain text
    role,
    createdAt: new Date().toISOString(),
  };

  await insert(COLLECTIONS.USERS, newUser);

  const { password: _, ...safeUser } = newUser;
  const token = jwt.sign({ id: safeUser.id, role: safeUser.role }, JWT_SECRET, { expiresIn: '1d' });

  return { success: true, user: safeUser, token };
}

/**
 * Login pengguna
 * @param {string} username (email)
 * @param {string} password 
 */
export async function loginUser(email, password) {
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
  const token = jwt.sign({ id: safeUser.id, role: safeUser.role }, JWT_SECRET, { expiresIn: '1d' });

  return { success: true, user: safeUser, token };
}

/**
 * Middleware untuk validasi token JWT
 */
export function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized', message: 'Token tidak disediakan.' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // { id, role, iat, exp }
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized', message: 'Token tidak valid atau kedaluwarsa.' });
  }
}

/**
 * Ambil semua user (hanya untuk admin)
 */
export async function getAllUsers() {
  const users = await getAll(COLLECTIONS.USERS);
  return users.map(({ password: _, ...u }) => u);
}
