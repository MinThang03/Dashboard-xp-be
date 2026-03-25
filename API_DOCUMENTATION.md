# 📚 API DOCUMENTATION - Dashboard Xã Phường

Base URL: `http://localhost:3006/api`

## 🔐 Authentication Endpoints

### 1. Register (Đăng ký)
**Endpoint:** `POST /auth/register`

**Body:**
```json
{
  "username": "string (required)",
  "password": "string (required)",
  "fullName": "string (required)",
  "email": "string (optional)"
}
```

**Response:**
```json
{
  "user": {
    "id": 1,
    "username": "user123",
    "fullName": "Nguyễn Văn A",
    "email": "user@example.com",
    "roleId": 4,
    "isActive": true,
    "createdAt": "2026-02-03T10:00:00.000Z"
  }
}
```

### 2. Login (Đăng nhập)
**Endpoint:** `POST /auth/login`

**Body:**
```json
{
  "username": "admin",
  "password": "admin123"
}
```

**Response:**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "admin",
    "fullName": "Administrator",
    "email": "admin@dashboardxp.com",
    "roleId": 1,
    "isActive": true
  }
}
```

**Note:** Refresh token được set trong HTTP-only cookie

### 3. Refresh Token (Làm mới token)
**Endpoint:** `POST /auth/refresh`

**Headers:**
```
Cookie: refreshToken=xxx
```

**Response:**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 4. Get Current User (Lấy thông tin user hiện tại)
**Endpoint:** `GET /auth/me`

**Headers:**
```
Authorization: Bearer <accessToken>
```

**Response:**
```json
{
  "userId": 1,
  "username": "admin",
  "role": 1,
  "fullName": "Administrator",
  "email": "admin@dashboardxp.com"
}
```

### 5. Logout (Đăng xuất)
**Endpoint:** `POST /auth/logout`

**Headers:**
```
Authorization: Bearer <accessToken>
Cookie: refreshToken=xxx
```

**Response:**
```json
{
  "message": "Logged out successfully"
}
```

## 🏥 Health Check Endpoints

### 1. Welcome Message
**Endpoint:** `GET /`

**Response:**
```
Dashboard Xã Phường Backend API is running!
```

### 2. Health Check
**Endpoint:** `GET /health`

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2026-02-03T10:00:00.000Z",
  "service": "Dashboard XP Backend"
}
```

## 🔒 Authentication Flow

### Luồng đăng nhập:
1. Client gửi username/password đến `POST /auth/login`
2. Server xác thực và trả về:
   - `accessToken` (15 phút expiry) trong response body
   - `refreshToken` (30 ngày expiry) trong HTTP-only cookie
3. Client lưu `accessToken` (localStorage/memory)
4. Mọi request tiếp theo gửi `accessToken` trong Authorization header

### Làm mới token:
1. Khi `accessToken` hết hạn (15 phút)
2. Client gửi request đến `POST /auth/refresh` (cookie tự động gửi)
3. Server trả về `accessToken` mới
4. Client cập nhật `accessToken`

### Đăng xuất:
1. Client gửi request đến `POST /auth/logout`
2. Server xóa session và clear cookie
3. Client xóa `accessToken`

## 📊 Response Codes

- `200 OK` - Request thành công
- `201 Created` - Tạo resource thành công
- `400 Bad Request` - Dữ liệu request không hợp lệ
- `401 Unauthorized` - Chưa xác thực hoặc token không hợp lệ
- `403 Forbidden` - Không có quyền truy cập
- `404 Not Found` - Resource không tồn tại
- `409 Conflict` - Conflict (ví dụ: username đã tồn tại)
- `500 Internal Server Error` - Lỗi server

## 🎭 Roles (Vai trò)

| Role ID | Role Name | Code | Description |
|---------|-----------|------|-------------|
| 1 | Quản trị hệ thống | ADMIN | Toàn quyền hệ thống |
| 2 | Lãnh đạo | LANHDAO | Quản lý, duyệt hồ sơ |
| 3 | Cán bộ chuyên môn | CANBO | Xử lý hồ sơ |
| 4 | Công dân | CONGDAN | Người dùng thông thường |

## 🏢 Lĩnh vực (Domains)

| ID | Tên Lĩnh Vực | Code | Thứ Tự |
|----|-------------|------|---------|
| 1 | Hành chính Tư pháp | TU_PHAP | 1 |
| 2 | Y tế - Giáo dục | Y_TE_GD | 2 |
| 3 | Kinh tế - Thương mại | KINH_TE | 3 |
| 4 | Quốc phòng - An ninh | AN_NINH | 4 |
| 5 | Xây dựng - Hạ tầng | XAY_DUNG | 5 |
| 6 | Dân cư - Lao động | LAO_DONG | 6 |
| 7 | Quản lý Tài chính | TAI_CHINH | 7 |
| 8 | Địa chính | DIA_CHINH | 8 |
| 9 | Quản lý Môi trường | MOI_TRUONG | 9 |
| 10 | Văn hóa - Du lịch | VAN_HOA | 10 |

## 📝 Trạng thái Hồ sơ

| Mã | Tên | Màu | Mô tả |
|----|-----|-----|-------|
| MOI_TAO | Mới tạo | #3498db | Hồ sơ mới được tạo |
| DANG_XU_LY | Đang xử lý | #f39c12 | Đang được xử lý |
| CHO_DUYET | Chờ duyệt | #9b59b6 | Chờ lãnh đạo duyệt |
| DA_DUYET | Đã duyệt | #2ecc71 | Đã được duyệt |
| DA_TU_CHOI | Đã từ chối | #e74c3c | Bị từ chối |
| HOAN_THANH | Hoàn thành | #27ae60 | Đã hoàn thành |
| DA_HUY | Đã hủy | #95a5a6 | Đã hủy bỏ |

## 🔧 Error Responses

### Validation Error (400)
```json
{
  "statusCode": 400,
  "message": ["username should not be empty"],
  "error": "Bad Request"
}
```

### Unauthorized (401)
```json
{
  "statusCode": 401,
  "message": "Invalid credentials",
  "error": "Unauthorized"
}
```

### Conflict (409)
```json
{
  "statusCode": 409,
  "message": "Username already exists",
  "error": "Conflict"
}
```

## 🧪 Testing với cURL

### Login
```bash
curl -X POST http://localhost:3006/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}' \
  -c cookies.txt
```

### Get Profile (sử dụng token)
```bash
TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

curl http://localhost:3006/api/auth/me \
  -H "Authorization: Bearer $TOKEN"
```

### Refresh Token
```bash
curl -X POST http://localhost:3006/api/auth/refresh \
  -b cookies.txt \
  -c cookies.txt
```

### Logout
```bash
curl -X POST http://localhost:3006/api/auth/logout \
  -H "Authorization: Bearer $TOKEN" \
  -b cookies.txt
```

## 📱 Testing với Postman

1. **Import Collection**: Tạo collection mới trong Postman
2. **Set Environment Variables**:
   - `baseUrl`: `http://localhost:3006/api`
   - `accessToken`: (sẽ được set tự động sau login)

3. **Login Request**:
   - Method: POST
   - URL: `{{baseUrl}}/auth/login`
   - Body: raw JSON
   ```json
   {
     "username": "admin",
     "password": "admin123"
   }
   ```
   - Tests script:
   ```javascript
   pm.environment.set("accessToken", pm.response.json().accessToken);
   ```

4. **Protected Requests**:
   - Authorization: Bearer Token
   - Token: `{{accessToken}}`

## 🚀 Mở rộng API

Dự án đã setup sẵn cơ sở, bạn có thể mở rộng thêm các endpoints cho:
- Quản lý hồ sơ nghiệp vụ
- Phản ánh kiến nghị
- Quản lý tài chính
- Quản lý y tế
- Quản lý môi trường
- KPI và thống kê
- v.v.

Mỗi module sẽ có các endpoints CRUD chuẩn RESTful.

## 📞 Support

Nếu có vấn đề về API, vui lòng liên hệ team phát triển.
