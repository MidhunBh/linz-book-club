require('dotenv').config();
const mongoose = require('mongoose');
const Book     = require('./models/Book');
const Post     = require('./models/Post');
const Meeting  = require('./models/Meeting');

const books = [
  { title: '1984',                 author: 'George Orwell',     description: 'Dystopian surveillance society',  category: 'Common',  suggested_by: 'alice' },
  { title: 'The Hobbit',           author: 'J.R.R. Tolkien',    description: 'Classic fantasy adventure',       category: 'Fantasy', suggested_by: 'bob'   },
  { title: 'Pride and Prejudice',  author: 'Jane Austen',       description: 'Romance and social critique',     category: 'Common',  suggested_by: 'alice' },
  { title: 'Dune',                 author: 'Frank Herbert',     description: 'Epic sci-fi worldbuilding',       category: 'Fantasy', suggested_by: 'bob'   },
  { title: 'Sapiens',              author: 'Yuval Noah Harari', description: 'History of humankind',            category: 'Common',  suggested_by: 'alice' },
  { title: 'The Name of the Wind', author: 'Patrick Rothfuss',  description: 'Character-driven fantasy',        category: 'Fantasy', suggested_by: 'bob'   },
  { title: 'Mistborn',             author: 'Brandon Sanderson', description: 'Magic system based fantasy',      category: 'Fantasy', suggested_by: 'bob'   },
  { title: 'Little Women',         author: 'Louisa May Alcott', description: 'Four sisters, family and growth', category: 'Common',  suggested_by: 'alice' },
  { title: 'Master and Margarita', author: 'Mikhail Bulgakov',  description: 'Satire, philosophy, surrealism',  category: 'Common',  suggested_by: 'alice' },
  { title: 'Pachinko',             author: 'Min Jin Lee',       description: 'Migration, identity, survival',   category: 'Common',  suggested_by: 'alice' },
];

const posts = [
  { username: 'alice', title: 'on silence in Pachinko',  content: 'Silence felt like survival, not absence.',      tag: 'main group' },
  { username: 'bob',   title: 'fantasy feels grounding', content: 'World-building makes reality clearer somehow.', tag: 'fantasy'    },
];

const meetings = [
  { title: 'May Discussion – Pachinko',         date: '2026-05-28', time: '18:00', location: 'Thalia Linz – Landstraße', book: 'Pachinko',            description: 'We wrap up our May read and discuss identity and generational trauma.' },
  { title: 'June Discussion – Midnight\'s Children', date: '2026-06-25', time: '18:30', location: 'Thalia Linz – Landstraße', book: "Midnight's Children", description: 'Our most challenging read of the cycle — bring your interpretations.' },
  { title: 'Fantasy Group – Mistborn',          date: '2026-06-18', time: '19:00', location: 'Thalia Linz – Landstraße', book: 'Mistborn',            description: 'Discussing the magic system and the rebellion arc.' },
];

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to MongoDB');

  await Book.deleteMany({});
  await Post.deleteMany({});
  await Meeting.deleteMany({});

  await Book.insertMany(books);
  await Post.insertMany(posts);
  await Meeting.insertMany(meetings);

  console.log('Database seeded successfully');
  await mongoose.disconnect();
}

seed().catch(err => { console.error('Seed failed:', err); process.exit(1); });
