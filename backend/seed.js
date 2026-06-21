require('dotenv').config();
const mongoose = require('mongoose');
const Book     = require('./models/Book');
const Post     = require('./models/Post');
const Meeting  = require('./models/Meeting');

// Description format: "One line description. #tag1 #tag2 #tag3"
// The frontend splits on the first # to display them separately
const books = [
  // ── Common group (5 books, clean layout next to image) ──
  { title: 'Little Women',          author: 'Louisa May Alcott',      description: 'A portrait of female ambition and sisterhood constrained by period and gender. #bildungsroman #sisterhood #antebellum',                             category: 'Common',  suggested_by: 'alice' },
  { title: 'Master and Margarita',  author: 'Mikhail Bulgakov',       description: 'Political satire disguised as surreal fiction, smuggling religious allegory past Soviet censors. #soviet-satire #absurdism #dual-narrative',         category: 'Common',  suggested_by: 'alice' },
  { title: 'Pachinko',              author: 'Min Jin Lee',            description: 'A multigenerational saga tracking a Korean family through decades of displacement and survival. #diaspora #colonial-trauma #identity',                category: 'Common',  suggested_by: 'alice' },
  { title: "Midnight's Children",   author: 'Salman Rushdie',         description: 'Rushdie binds one man\'s fractured memory directly to India\'s post-independence history. #magical-realism #partition #unreliable-narrator',          category: 'Common',  suggested_by: 'alice' },
  { title: '100 Years of Solitude', author: 'Gabriel García Márquez', description: 'A mythic chronicle of one family across a century in an invented Colombian town. #magical-realism #latin-america #generational-saga',               category: 'Common',  suggested_by: 'bob'   },

  // ── Fantasy group (6 books, 2x3 grid) ──
  { title: 'The Hobbit',            author: 'J.R.R. Tolkien',         description: 'The reluctant hero and the mechanics of myth. A small story in scale, vast in consequence.',    category: 'Fantasy', suggested_by: 'bob'   },
  { title: 'Mistborn',              author: 'Brandon Sanderson',      description: 'A magic system built on physics and consequence. The rebellion is almost secondary to the logic.',  category: 'Fantasy', suggested_by: 'bob'   },
  { title: 'Lord of Light',         author: 'Roger Zelazny',          description: 'Hindu cosmology rewritten as science fiction. Gods, technology and revolution collapse into each other.', category: 'Fantasy', suggested_by: 'alice' },
  { title: 'The Gifts',             author: 'Ursula K. Le Guin',      description: 'A quiet novel about the weight of inherited power and the courage required to refuse it.',         category: 'Fantasy', suggested_by: 'alice' },
  { title: 'A Feast for Crows',     author: 'George R.R. Martin',     description: 'The quietest volume in the series. Grief, consequence and the wreckage left by previous books.',   category: 'Fantasy', suggested_by: 'bob'   },
  { title: 'Piranesi',              author: 'Susanna Clarke',         description: 'A house that contains the world, a man who cannot remember who he is. Clarke builds an entire metaphysics inside a mystery novel.', category: 'Fantasy', suggested_by: 'alice' },
];

const posts = [
  {
    username: 'alice',
    title: 'myth in miniature — The Hobbit',
    content: 'What strikes me reading Tolkien again is how deliberately small the scale is. Bilbo is not chosen because he is special — he is chosen because Gandalf finds him interesting, which is almost the opposite of a prophecy. The reluctance is the point. Every scene where he considers turning back and does not is doing more psychological work than most adventure novels manage in three hundred pages. The Shire is not just a place he leaves. It is a self he outgrows, quietly, without ever announcing it.',
    tag: 'fantasy'
  },
  {
    username: 'bob',
    title: "memory and nation in Midnight's Children",
    content: "Rushdie gives Saleem a body that maps onto India — literally, structurally — and then proceeds to show how unreliable both are as historical records. The telepathy is not magic for its own sake. It is a way of asking whether collective memory is even possible, or whether every account of a shared event is really just a private one with public pretensions. The prose is exhausting in the best way. It refuses to let you coast. Every sentence is making an argument about what storytelling is allowed to do.",
    tag: 'main group'
  },
  {
    username: 'alice',
    title: 'on last Thursday\'s meeting',
    content: 'Just wanted to say that last week\'s discussion was one of the better ones we have had. The room was genuinely split on Pachinko — whether Sunja\'s silence was strength or erasure — and nobody resolved it, which felt right. These are the conversations that stay with you on the walk home. Thank you to everyone who came and especially to those who pushed back. A book club that only agrees is just a reading diary with better snacks.',
    tag: 'general'
  },
  {
    username: 'bob',
    title: 'a line I keep returning to',
    content: '"It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife." — Jane Austen, Pride and Prejudice. Austen puts the entire critique inside the sentence she opens with. The irony is so total that readers have been arguing for two centuries about whether she means it. That is what good satire does. It stays in character long enough that you cannot always tell.',
    tag: 'quote'
  },
];

const meetings = [
  { title: 'May Discussion – Pachinko',             date: '2026-05-28', time: '18:00', location: 'Thalia Linz – Landstraße', book: 'Pachinko',            description: 'We wrap up our May read and discuss identity and generational trauma.' },
  { title: "June Discussion – Midnight's Children", date: '2026-06-25', time: '18:30', location: 'Thalia Linz – Landstraße', book: "Midnight's Children",  description: 'Our most challenging read of the cycle — bring your interpretations.' },
  { title: 'Fantasy Group – Piranesi',              date: '2026-06-18', time: '19:00', location: 'Thalia Linz – Landstraße', book: 'Piranesi',             description: 'Discussing Clarke\'s house, memory, and the mystery at the centre of the novel.' },
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
