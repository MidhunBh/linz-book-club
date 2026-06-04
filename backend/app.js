var express      = require('express');
var cookieParser = require('cookie-parser');
var logger       = require('morgan');
var cors         = require('cors');
var Book         = require('./models/Book');
var Post         = require('./models/Post');

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// =================================================================
// USERS  (kept in memory — no registration feature yet)
// =================================================================

const users = {
  alice: { username: 'alice', first_name: 'Alice', last_name: 'Mayer',   password: 'password', role: 'organizer' },
  bob:   { username: 'bob',   first_name: 'Bob',   last_name: 'Steiner', password: 'password', role: 'member'    },
};

function findUser(username) { return users[username]; }

// =================================================================
// 1. GET /api/health
// =================================================================
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// =================================================================
// 2. POST /api/login
// =================================================================
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ error: 'Username and password are required' });

  const user = findUser(username);
  if (!user || user.password !== password)
    return res.status(401).json({ error: 'Invalid credentials' });

  res.json({
    username:   user.username,
    first_name: user.first_name,
    last_name:  user.last_name,
    role:       user.role,
  });
});

// =================================================================
// 3. GET /api/books  — optional ?category=  ?suggested_by=
// =================================================================
app.get('/api/books', async (req, res) => {
  try {
    const filter = {};
    if (req.query.category)     filter.category     = req.query.category;
    if (req.query.suggested_by) filter.suggested_by = req.query.suggested_by;

    const books = await Book.find(filter).sort({ createdAt: -1 });
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// =================================================================
// 4. GET /api/books/:id
// =================================================================
app.get('/api/books/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// =================================================================
// 5. POST /api/books
// =================================================================
app.post('/api/books', async (req, res) => {
  try {
    const { title, author, description, category, suggested_by } = req.body;
    if (!title || !category)
      return res.status(400).json({ error: 'title and category are required' });

    const book = await Book.create({ title, author, description, category, suggested_by });
    res.status(201).json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// =================================================================
// 6. PUT /api/books/:id
// =================================================================
app.put('/api/books/:id', async (req, res) => {
  try {
    const { title, author, description, category, suggested_by } = req.body;
    if (!title || !category)
      return res.status(400).json({ error: 'title and category are required' });

    const book = await Book.findByIdAndUpdate(
      req.params.id,
      { title, author, description, category, suggested_by },
      { new: true, runValidators: true }
    );
    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// =================================================================
// 7. PATCH /api/books/:id
// =================================================================
app.patch('/api/books/:id', async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// =================================================================
// 8. DELETE /api/books/:id
// =================================================================
app.delete('/api/books/:id', async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.json({ message: 'Book removed' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// =================================================================
// 9. GET /api/posts  — optional ?tag=  ?username=
// =================================================================
app.get('/api/posts', async (req, res) => {
  try {
    const filter = {};
    if (req.query.tag)      filter.tag      = req.query.tag;
    if (req.query.username) filter.username = req.query.username;

    const posts = await Post.find(filter).sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// =================================================================
// 10. GET /api/posts/:id
// =================================================================
app.get('/api/posts/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// =================================================================
// 11. POST /api/posts
// =================================================================
app.post('/api/posts', async (req, res) => {
  try {
    const { username, title, content, tag } = req.body;
    if (!username || !title || !content)
      return res.status(400).json({ error: 'username, title and content are required' });

    const post = await Post.create({ username, title, content, tag });
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// =================================================================
// 12. PATCH /api/posts/:id
// =================================================================
app.patch('/api/posts/:id', async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// =================================================================
// 13. DELETE /api/posts/:id
// =================================================================
app.delete('/api/posts/:id', async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json({ message: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = app;
