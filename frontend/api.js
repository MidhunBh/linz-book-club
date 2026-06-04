// ─── api.js ───────────────────────────────────────────────────────────────────
//
// All fetch calls to the backend live here.
// Every page includes this file and calls these functions instead of
// talking to the backend directly.
//
// The backend must be running on http://localhost:3000
// ─────────────────────────────────────────────────────────────────────────────

const API_BASE = 'http://localhost:3000/api';

const api = {

  // ── Auth ──────────────────────────────────────────────────────────────────

  async login(username, password) {
    const res = await fetch(`${API_BASE}/login`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ username, password }),
    });
    if (!res.ok) throw new Error('Invalid credentials');
    return res.json();
  },

  // ── Books ─────────────────────────────────────────────────────────────────

  async getBooks(category = null) {
    const url = category
      ? `${API_BASE}/books?category=${category}`
      : `${API_BASE}/books`;
    const res = await fetch(url);
    return res.json();
  },

  async addBook(book) {
    const res = await fetch(`${API_BASE}/books`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(book),
    });
    return res.json();
  },

  async deleteBook(id) {
    await fetch(`${API_BASE}/books/${id}`, { method: 'DELETE' });
  },

  // ── Forum posts ───────────────────────────────────────────────────────────

  async getPosts(tag = null) {
    const url = tag
      ? `${API_BASE}/posts?tag=${tag}`
      : `${API_BASE}/posts`;
    const res = await fetch(url);
    return res.json();
  },

  async addPost(post) {
    const res = await fetch(`${API_BASE}/posts`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(post),
    });
    return res.json();
  },

  async deletePost(id) {
    await fetch(`${API_BASE}/posts/${id}`, { method: 'DELETE' });
  },

};
