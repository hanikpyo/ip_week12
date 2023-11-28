const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// 간단한 메모리 데이터베이스
let books = [
  { id: 1, title: 'Node.js Basics', author: 'John Doe' },
  { id: 2, title: 'Express.js Guide', author: 'Jane Smith' },
];

// API 라우트
app.get('/books', (req, res) => {
  res.json(books);
});

app.post('/books', (req, res) => {
  const { title, author } = req.body;
  const newBook = { id: books.length + 1, title, author };
  books.push(newBook);

  res.status(201).json(newBook);
});

app.delete('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  books = books.filter((book) => book.id !== bookId);
  res.sendStatus(204);
});

// 정적 파일 서빙 (index.html)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
