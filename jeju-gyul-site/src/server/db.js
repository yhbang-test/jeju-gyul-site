// db.js
import mysql from 'mysql2/promise'; 
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: 'jeju_gyul',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// 연결 테스트 로직
pool.getConnection()
  .then(connection => {
    console.log('✅ MariaDB 연결 성공!');
    connection.release();
  })
  .catch(err => {
    console.error('❌ MariaDB 연결 실패:', err.message);
  });

// 최신 방식인 export default 하나만 남깁니다.
export default pool;