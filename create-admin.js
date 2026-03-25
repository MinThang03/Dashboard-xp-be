const bcrypt = require('bcrypt');
const { Client } = require('pg');
require('dotenv').config();

async function createAdmin() {
  const client = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: { rejectUnauthorized: false },
  });

  try {
    await client.connect();
    console.log('✅ Connected to database');

    // Hash password
    const password = 'admin123'; // Change this!
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert admin user
    const result = await client.query(
      `INSERT INTO dashboard_xp."NguoiDung" 
       ("TenDangNhap", "MatKhau", "HoVaTen", "Email", "MaVaiTro", "TrangThai") 
       VALUES ($1, $2, $3, $4, $5, $6) 
       ON CONFLICT ("TenDangNhap") DO UPDATE 
       SET "MatKhau" = $2
       RETURNING "MaNguoiDung", "TenDangNhap", "HoVaTen"`,
      ['admin', hashedPassword, 'Administrator', 'admin@dashboardxp.com', 1, true]
    );

    console.log('✅ Admin user created/updated:', result.rows[0]);
    console.log('Username: admin');
    console.log('Password: admin123');
    console.log('⚠️  Please change the password after first login!');

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await client.end();
  }
}

createAdmin();
