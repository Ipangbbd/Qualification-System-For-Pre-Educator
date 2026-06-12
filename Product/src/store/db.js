// ============================================================
// DB.JS — JSON File Database Engine
// Menyediakan operasi CRUD generik untuk semua koleksi data
// Menggunakan fs (File System) untuk membaca/menulis ke db.json
// ============================================================

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_FILE = path.join(__dirname, 'db.json');

// Nama koleksi yang tersedia
export const COLLECTIONS = {
  USERS: 'users',
  TEACHER_PROFILES: 'teacher_profiles',
  SUBMISSIONS: 'submissions',
  SESSION: 'session',
};

// ─── Helpers internal ───────────────────────────────────────

function getDbData() {
  try {
    if (!fs.existsSync(DB_FILE)) {
      return {};
    }
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading db.json:', err);
    return {};
  }
}

function saveDbData(data) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Error writing db.json:', err);
  }
}

function readCollection(collection) {
  const data = getDbData();
  return data[collection] || [];
}

function writeCollection(collection, records) {
  const data = getDbData();
  data[collection] = records;
  saveDbData(data);
}

// Simulasi delay jaringan (ms) agar terasa seperti async API call nyata
function delay(ms = 50) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ─── API Publik ──────────────────────────────────────────────

export async function getAll(collection) {
  await delay();
  return readCollection(collection);
}

export async function getById(collection, id) {
  await delay();
  const records = readCollection(collection);
  return records.find((r) => r.id === id) ?? null;
}

export async function findWhere(collection, query) {
  await delay();
  const records = readCollection(collection);
  return records.filter((r) =>
    Object.entries(query).every(([k, v]) => r[k] === v)
  );
}

export async function insert(collection, data) {
  await delay();
  const records = readCollection(collection);
  records.push(data);
  writeCollection(collection, records);
  return data;
}

export async function update(collection, id, updates) {
  await delay();
  const records = readCollection(collection);
  const idx = records.findIndex((r) => r.id === id);
  if (idx === -1) return null;
  records[idx] = { ...records[idx], ...updates };
  writeCollection(collection, records);
  return records[idx];
}

export async function remove(collection, id) {
  await delay();
  const records = readCollection(collection);
  const filtered = records.filter((r) => r.id !== id);
  if (filtered.length === records.length) return false;
  writeCollection(collection, filtered);
  return true;
}

export async function clearCollection(collection) {
  await delay();
  const data = getDbData();
  data[collection] = [];
  saveDbData(data);
}

export function isInitialized() {
  const data = getDbData();
  return data._initialized === true;
}

export function markInitialized() {
  const data = getDbData();
  data._initialized = true;
  saveDbData(data);
}

export function resetDatabase() {
  if (fs.existsSync(DB_FILE)) {
    fs.unlinkSync(DB_FILE);
  }
}

// ─── Session (non-array) ─────────────────────────────────────
// Backend stateful session (untuk demo, lebih baik pakai JWT via header)

export function saveSession(user) {
  const data = getDbData();
  data[COLLECTIONS.SESSION] = user;
  saveDbData(data);
}

export function getSession() {
  const data = getDbData();
  return data[COLLECTIONS.SESSION] || null;
}

export function clearSession() {
  const data = getDbData();
  data[COLLECTIONS.SESSION] = null;
  saveDbData(data);
}
