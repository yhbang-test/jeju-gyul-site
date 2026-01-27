const express = require('express');
const cors = require('cors');
const db = require('./db');
const app = express();

app.use(cors());
app.use(express.json());

/* 로그인 */

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password]);
    
    if (rows.length > 0) {
      res.json({ success: true, userName: rows[0].name });
    } else {
      res.status(401).json({ success: false, message: '정보가 일치하지 않습니다.' });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: '서버 오류' });
  }
});

app.listen(5000, () => console.log('Server running on port 5000'));

// 게시판 목록 가져오기 API
app.get('/api/posts', async (req, res) => {
  try {
    // 🔥 DB에서 최신순으로 게시글 가져오기
    const [rows] = await db.query('SELECT id, title, author, date FROM posts ORDER BY id DESC');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '게시글을 불러오는 중 서버 에러가 발생했습니다.' });
  }
});

// 특정 게시글 상세 보기 API
app.get('/api/posts/:id', async (req, res) => {
  const { id } = req.params; // URL의 :id 값을 가져옵니다.
  try {
    const [rows] = await db.query('SELECT * FROM posts WHERE id = ?', [id]);
    
    if (rows.length > 0) {
      res.json(rows[0]); // 글이 있으면 첫 번째 데이터를 보냅니다.
    } else {
      res.status(404).json({ message: '해당 게시글을 찾을 수 없습니다.' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '서버 오류' });
  }
});

// 게시글 등록 API
app.post('/api/posts', async (req, res) => {
  const { title, content, author } = req.body;
  
  try {
    // 🔥 MariaDB에 게시글 저장 (INSERT)
    const [result] = await db.query(
      'INSERT INTO posts (title, content, author) VALUES (?, ?, ?)',
      [title, content, author || '익명'] // 로그인 연동 전이라면 임시로 '익명' 처리
    );
    
    res.json({ success: true, postId: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'DB 저장 중 오류가 발생했습니다.' });
  }
});