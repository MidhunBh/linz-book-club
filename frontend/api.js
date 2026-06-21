const API_BASE   = 'https://linz-book-club-production.up.railway.app/api';
const SOCKET_URL = 'https://linz-book-club-production.up.railway.app';

const api = {

  async login(username, password) {
    const res = await fetch(`${API_BASE}/login`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    if (!res.ok) throw new Error('Invalid credentials');
    return res.json();
  },

  async getBooks(category = null) {
    const url = category ? `${API_BASE}/books?category=${category}` : `${API_BASE}/books`;
    return fetch(url).then(r => r.json());
  },

  async addBook(book) {
    const res = await fetch(`${API_BASE}/books`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(book),
    });
    return res.json();
  },

  async deleteBook(id) {
    await fetch(`${API_BASE}/books/${id}`, { method: 'DELETE' });
  },

  async getPosts(tag = null) {
    const url = tag ? `${API_BASE}/posts?tag=${tag}` : `${API_BASE}/posts`;
    return fetch(url).then(r => r.json());
  },

  async addPost(post) {
    const res = await fetch(`${API_BASE}/posts`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post),
    });
    return res.json();
  },

  async deletePost(id) {
    await fetch(`${API_BASE}/posts/${id}`, { method: 'DELETE' });
  },

  async getMeetings() {
    return fetch(`${API_BASE}/meetings`).then(r => r.json());
  },

  async addMeeting(meeting) {
    const res = await fetch(`${API_BASE}/meetings`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(meeting),
    });
    return res.json();
  },

  async deleteMeeting(id) {
    await fetch(`${API_BASE}/meetings/${id}`, { method: 'DELETE' });
  },

};


