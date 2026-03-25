# HƯỚNG DẪN CÀI ĐẶT VÀ CHẠY BACKEND

## Bước 1: Cài đặt Dependencies

```bash
cd "Dashboard XP/Dashboardxp-backend"
npm install
```

## Bước 2: Cấu hình Database

File `.env` đã được tạo với thông tin Supabase. Kiểm tra lại thông tin:

```env
PORT=3006
DB_HOST=aws-1-ap-south-1.pooler.supabase.com
DB_PORT=6543
DB_USERNAME=postgres.gvjwexzmokunrxmhcbbl
DB_PASSWORD=Mt231103.,@
DB_NAME=postgres
```

## Bước 3: Chạy Migrations

Migrations sẽ tạo schema `dashboard_xp` và tất cả các bảng:

```bash
npm run migration:run
```

Các migrations sẽ tạo:
- ✅ Schema `dashboard_xp`
- ✅ Bảng VaiTro (4 vai trò: Admin, Lãnh đạo, Cán bộ, Công dân)
- ✅ Bảng NguoiDung (Users)
- ✅ Bảng LinhVuc (10 lĩnh vực)
- ✅ Bảng PhongBan (Departments)
- ✅ Bảng CanBo, LanhDao
- ✅ Bảng HoSoNghiepVu (Business records)
- ✅ Bảng PhanAnh (Feedback)
- ✅ Các bảng module chuyên môn:
  - HoTich, VanBan (Hành chính - Tư pháp)
  - TramYTe, DichBenh, TiemChung, CoSoGiaoDuc (Y tế - Giáo dục)
  - NganSach, PhieuThu, PhieuChi (Tài chính)
  - ThuaDat, BienDongDat (Địa chính)
  - RacThai, BaoCaoONhiem (Môi trường)
  - DiTich, LangNghe, LeHoi (Văn hóa)
  - ViPham, DiemNongAnNinh (An ninh)
- ✅ Bảng KPI_CanBo_Thang, Fact_HoSo_TheoNgay (KPI & Thống kê)
- ✅ Bảng user_sessions (Authentication sessions)

## Bước 4: Tạo Admin User

Chạy script để tạo tài khoản admin đầu tiên:

```bash
node create-admin.js
```

Thông tin đăng nhập mặc định:
- Username: `admin`
- Password: `admin123`

⚠️ **LƯU Ý**: Đổi mật khẩu ngay sau khi đăng nhập lần đầu!

## Bước 5: Chạy Server

### Development Mode
```bash
npm run start:dev
```

### Production Mode
```bash
npm run build
npm run start:prod
```

Server sẽ chạy tại: **http://localhost:3006**

## Kiểm tra API

### Health Check
```bash
curl http://localhost:3006/api/health
```

### Test Login
```bash
curl -X POST http://localhost:3006/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Đăng ký
- `POST /api/auth/login` - Đăng nhập
- `POST /api/auth/refresh` - Làm mới token
- `POST /api/auth/logout` - Đăng xuất
- `GET /api/auth/me` - Thông tin user

## Cấu trúc Thư mục

```
Dashboardxp-backend/
├── migrations/           # Database migrations
│   ├── 1738500000000-CreateDashboardXPSchema.ts
│   ├── 1738500100000-CreateModuleTables.ts
│   └── 1738500200000-CreateUserSessions.ts
├── src/
│   ├── auth/            # Authentication module
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── auth.module.ts
│   │   ├── jwt.strategy.ts
│   │   ├── jwt-auth.guard.ts
│   │   ├── public.decorator.ts
│   │   ├── session-cleanup.service.ts
│   │   └── user-session.entity.ts
│   ├── users/           # Users module
│   │   ├── user.entity.ts
│   │   ├── users.service.ts
│   │   └── users.module.ts
│   ├── config/          # Configuration
│   │   └── database.config.ts
│   ├── app.module.ts
│   ├── app.controller.ts
│   ├── app.service.ts
│   └── main.ts
├── .env                 # Environment variables
├── package.json
├── tsconfig.json
├── nest-cli.json
├── data-source.ts       # TypeORM data source
├── create-admin.js      # Script tạo admin
└── README.md
```

## Thông tin Schema Database

**Schema**: `dashboard_xp`

**Vai trò mặc định**:
1. Quản trị hệ thống (ADMIN)
2. Lãnh đạo (LANHDAO)
3. Cán bộ chuyên môn (CANBO)
4. Công dân (CONGDAN)

**Lĩnh vực mặc định** (10 lĩnh vực):
1. Hành chính Tư pháp
2. Y tế - Giáo dục
3. Kinh tế - Thương mại
4. Quốc phòng - An ninh
5. Xây dựng - Hạ tầng
6. Dân cư - Lao động
7. Quản lý Tài chính
8. Địa chính
9. Quản lý Môi trường
10. Văn hóa - Du lịch

## Troubleshooting

### Lỗi kết nối database
- Kiểm tra thông tin trong `.env`
- Kiểm tra Supabase có đang hoạt động
- Kiểm tra firewall/network

### Lỗi migration
- Xóa schema cũ: `DROP SCHEMA IF EXISTS dashboard_xp CASCADE;`
- Chạy lại migration: `npm run migration:run`

### Lỗi dependencies
- Xóa `node_modules`: `rm -rf node_modules`
- Xóa `package-lock.json`
- Cài lại: `npm install`

## Bước tiếp theo

Sau khi backend chạy thành công:
1. ✅ Kết nối frontend với backend
2. ✅ Test các API endpoints
3. ✅ Tạo thêm modules cho các chức năng khác
4. ✅ Implement business logic cho từng module
