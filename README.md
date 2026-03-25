# Dashboard Xã Phường - Backend API

Backend API cho hệ thống Dashboard Xã Phường, được xây dựng với NestJS và PostgreSQL (Supabase).

## Tính năng chính

- ✅ Authentication với JWT (Access Token + Refresh Token)
- ✅ Quản lý người dùng và phân quyền
- ✅ Quản lý hồ sơ nghiệp vụ
- ✅ Phản ánh kiến nghị từ công dân
- ✅ Quản lý tài chính - ngân sách
- ✅ Quản lý địa chính - quy hoạch
- ✅ Quản lý y tế - giáo dục
- ✅ Quản lý môi trường
- ✅ Quản lý văn hóa - du lịch
- ✅ KPI và thống kê

## Yêu cầu hệ thống

- Node.js 18+
- PostgreSQL (Supabase)
- npm hoặc pnpm

## Cài đặt

1. Clone repository và di chuyển vào thư mục backend:
```bash
cd "Dashboard XP/Dashboardxp-backend"
```

2. Cài đặt dependencies:
```bash
npm install
```

3. Tạo file `.env` từ `.env.example`:
```bash
cp .env.example .env
```

4. Cập nhật thông tin trong file `.env`:
```env
PORT=3006
DB_HOST=aws-1-ap-south-1.pooler.supabase.com
DB_PORT=6543
DB_USERNAME=postgres.gvjwexzmokunrxmhcbbl
DB_PASSWORD=your_password_here
DB_NAME=postgres
JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
FRONTEND_URL=http://localhost:3000
```

## Chạy Migration

Chạy migrations để tạo schema và các bảng trong database:

```bash
npm run migration:run
```

Migration sẽ tạo:
- Schema `dashboard_xp`
- Các bảng cơ bản: NguoiDung, VaiTro, LinhVuc, PhongBan, etc.
- Các bảng module: Y tế, Tài chính, Địa chính, Môi trường, etc.
- User sessions cho authentication

## Chạy ứng dụng

### Development mode
```bash
npm run start:dev
```

### Production mode
```bash
npm run build
npm run start:prod
```

Server sẽ chạy tại: `http://localhost:3006`
API endpoints: `http://localhost:3006/api`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Đăng ký tài khoản
- `POST /api/auth/login` - Đăng nhập
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/logout` - Đăng xuất
- `GET /api/auth/me` - Lấy thông tin user hiện tại

### Health Check
- `GET /api` - Welcome message
- `GET /api/health` - Health check endpoint

## Cấu trúc Database

Database sử dụng schema `dashboard_xp` với các nhóm bảng chính:

1. **Quản trị & Phân quyền**: VaiTro, NguoiDung, QuanTriVien, CongDan
2. **Tổ chức**: LinhVuc, PhongBan, LanhDao, CanBo
3. **Hồ sơ nghiệp vụ**: HoSoNghiepVu, TrangThaiHoSo, LoaiNghiepVu
4. **Phản ánh**: PhanAnh, PhanAnh_Tep
5. **Module chuyên môn**:
   - Hành chính - Tư pháp: HoTich, VanBan
   - Y tế: TramYTe, DichBenh, TiemChung, CoSoGiaoDuc
   - Tài chính: NganSach, PhieuThu, PhieuChi
   - Địa chính: ThuaDat, BienDongDat, LoaiDat
   - Môi trường: RacThai, BaoCaoONhiem
   - Văn hóa: DiTich, LangNghe, LeHoi
   - An ninh: ViPham, DiemNongAnNinh
6. **KPI & Thống kê**: KPI_CanBo_Thang, Fact_HoSo_TheoNgay

## Scripts

- `npm run build` - Build ứng dụng
- `npm run start` - Chạy production mode
- `npm run start:dev` - Chạy development mode với watch
- `npm run start:debug` - Chạy debug mode
- `npm run lint` - Lint code
- `npm run test` - Chạy tests
- `npm run migration:generate` - Tạo migration mới
- `npm run migration:run` - Chạy migrations
- `npm run migration:revert` - Revert migration cuối

## Bảo mật

- Mật khẩu được hash bằng bcrypt
- JWT tokens với expiration time
- Refresh token được lưu trong HTTP-only cookie
- Session cleanup tự động hàng ngày
- CORS được cấu hình cho frontend

## Môi trường Production

Khi deploy production:
1. Cập nhật `FRONTEND_URL` trong `.env`
2. Set `NODE_ENV=production`
3. Sử dụng HTTPS
4. Cập nhật CORS settings
5. Enable secure cookies

## Hỗ trợ

Để được hỗ trợ, vui lòng liên hệ team phát triển.
