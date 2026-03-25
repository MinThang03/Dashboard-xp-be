#!/usr/bin/env node
/**
 * Resource Generator Script
 * Automatically generates NestJS resources (Entity, Service, Controller, Module) for all database tables
 * Usage: node generate-resources.js
 */

const fs = require('fs');
const path = require('path');

// Define all resources to generate
const resources = [
  // Module 2: Y tế
  { name: 'TramYTe', displayName: 'Trạm Y Tế', primaryKey: 'MaTramYTe', schema: 'dashboard_xp' },
  { name: 'NhanVienYTe', displayName: 'Nhân Viên Y Tế', primaryKey: 'MaNV', schema: 'dashboard_xp' },
  { name: 'DichBenh', displayName: 'Dịch Bệnh', primaryKey: 'MaDichBenh', schema: 'dashboard_xp' },
  { name: 'LuotKham', displayName: 'Lượt Khám', primaryKey: 'MaLuotKham', schema: 'dashboard_xp' },
  
  // Module 3: Giáo dục
  { name: 'CoSoGiaoDuc', displayName: 'Cơ Sở Giáo Dục', primaryKey: 'MaCoSo', schema: 'dashboard_xp' },
  { name: 'LopHoc', displayName: 'Lớp Học', primaryKey: 'MaLop', schema: 'dashboard_xp' },
  
  // Module 4: Kinh tế
  { name: 'HoKinhDoanh', displayName: 'Hộ Kinh Doanh', primaryKey: 'MaHoKD', schema: 'dashboard_xp' },
  { name: 'ChoDiemKinhDoanh', displayName: 'Chợ Điểm Kinh Doanh', primaryKey: 'MaCho', schema: 'dashboard_xp' },
  
  // Module 5: An ninh trật tự
  { name: 'TamTruTamVang', displayName: 'Tạm Trú Tạm Vắng', primaryKey: 'MaTTTV', schema: 'dashboard_xp' },
  { name: 'TinhHinhANTT', displayName: 'Tình Hình An Ninh Trật Tự', primaryKey: 'MaTinhHinh', schema: 'dashboard_xp' },
  { name: 'ViPhamHanhChinh', displayName: 'Vi Phạm Hành Chính', primaryKey: 'MaViPham', schema: 'dashboard_xp' },
  { name: 'PhanAnhNguoiDan', displayName: 'Phản Ánh Người Dân', primaryKey: 'MaPhanAnh', schema: 'dashboard_xp' },
  
  // Module 6: Xây dựng
  { name: 'HaTangDoThi', displayName: 'Hạ Tầng Đô Thị', primaryKey: 'MaHaTang', schema: 'dashboard_xp' },
  { name: 'HoSoCapPhepXayDung', displayName: 'Hồ Sơ Cấp Phép Xây Dựng', primaryKey: 'MaHoSo', schema: 'dashboard_xp' },
  { name: 'XayDungTraiPhep', displayName: 'Xây Dựng Trái Phép', primaryKey: 'MaXDTP', schema: 'dashboard_xp' },
  
  // Module 7: Dân cư - Lao động
  { name: 'HoGiaDinh', displayName: 'Hộ Gia Đình', primaryKey: 'MaHo', schema: 'dashboard_xp' },
  { name: 'BienDongDanCu', displayName: 'Biến Động Dân Cư', primaryKey: 'MaBienDong', schema: 'dashboard_xp' },
  { name: 'ViecLam', displayName: 'Việc Làm', primaryKey: 'MaViecLam', schema: 'dashboard_xp' },
  { name: 'HoNgheo', displayName: 'Hộ Nghèo', primaryKey: 'MaHoNgheo', schema: 'dashboard_xp' },
  
  // Module 8: Tài chính
  { name: 'DuToanNganSach', displayName: 'Dự Toán Ngân Sách', primaryKey: 'MaDuToan', schema: 'dashboard_xp' },
  { name: 'GiaiNgan', displayName: 'Giải Ngân', primaryKey: 'MaGiaiNgan', schema: 'dashboard_xp' },
  { name: 'TaiSanCong', displayName: 'Tài Sản Công', primaryKey: 'MaTaiSan', schema: 'dashboard_xp' },
  
  // Module 9: Địa chính
  { name: 'QuyHoach', displayName: 'Quy Hoạch', primaryKey: 'MaQuyHoach', schema: 'dashboard_xp' },
  { name: 'ThuaDat', displayName: 'Thửa Đất', primaryKey: 'MaThua', schema: 'dashboard_xp', pkType: 'varchar' },
  { name: 'BienDongDat', displayName: 'Biến Động Đất', primaryKey: 'MaBienDong', schema: 'dashboard_xp' },
  
  // Module 10: Môi trường
  { name: 'TramQuanTracMT', displayName: 'Trạm Quan Trắc Môi Trường', primaryKey: 'MaTram', schema: 'dashboard_xp' },
  { name: 'DiemThuGomRac', displayName: 'Điểm Thu Gom Rác', primaryKey: 'MaDiem', schema: 'dashboard_xp' },
  { name: 'DiemNongMoiTruong', displayName: 'Điểm Nóng Môi Trường', primaryKey: 'MaDiemNong', schema: 'dashboard_xp' },
  
  // Module 11: Văn hóa
  { name: 'DiTich', displayName: 'Di Tích', primaryKey: 'MaDiTich', schema: 'dashboard_xp' },
  { name: 'LeHoi', displayName: 'Lễ Hội', primaryKey: 'MaLeHoi', schema: 'dashboard_xp' },
  { name: 'LangNghe', displayName: 'Làng Nghề', primaryKey: 'MaLangNghe', schema: 'dashboard_xp' },
  { name: 'SanPhamOCOP', displayName: 'Sản Phẩm OCOP', primaryKey: 'MaSanPham', schema: 'dashboard_xp' },
];

// Template generators
function generateEntity(resource) {
  const pkType = resource.pkType || 'int';
  const pkDecorator = pkType === 'varchar' 
    ? `@Column({ name: '${resource.primaryKey}', type: 'varchar', length: 50, primary: true })`
    : `@PrimaryGeneratedColumn({ name: '${resource.primaryKey}' })`;

  return `import { Entity, ${pkType === 'varchar' ? 'Column' : 'PrimaryGeneratedColumn, Column'} } from 'typeorm';

@Entity({ schema: '${resource.schema}', name: '${resource.name}' })
export class ${resource.name} {
  ${pkDecorator}
  ${resource.primaryKey}: ${pkType === 'varchar' ? 'string' : 'number'};

  // TODO: Add other columns based on your schema
  // Example:
  // @Column({ name: 'TenColumn', type: 'varchar', length: 255 })
  // TenColumn: string;
}
`;
}

function generateService(resource) {
  const pkType = resource.pkType === 'varchar' ? 'string' : 'number';
  return `import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ${resource.name} } from './${resource.name.toLowerCase()}.entity';

@Injectable()
export class ${resource.name}Service {
  constructor(
    @InjectRepository(${resource.name})
    private repository: Repository<${resource.name}>,
  ) {}

  async findAll(params?: { page?: number; limit?: number }): Promise<{ data: ${resource.name}[]; total: number }> {
    const page = params?.page || 1;
    const limit = params?.limit || 10;
    const skip = (page - 1) * limit;

    const [data, total] = await this.repository.findAndCount({
      take: limit,
      skip: skip,
    });

    return { data, total };
  }

  async findOne(id: ${pkType}): Promise<${resource.name}> {
    return this.repository.findOne({ where: { ${resource.primaryKey}: id } as any });
  }

  async create(data: Partial<${resource.name}>): Promise<${resource.name}> {
    const entity = this.repository.create(data);
    return this.repository.save(entity);
  }

  async update(id: ${pkType}, data: Partial<${resource.name}>): Promise<${resource.name}> {
    await this.repository.update(id as any, data);
    return this.findOne(id);
  }

  async remove(id: ${pkType}): Promise<void> {
    await this.repository.delete(id as any);
  }

  async getStats(): Promise<any> {
    const total = await this.repository.count();
    return { total };
  }
}
`;
}

function generateController(resource) {
  const pkType = resource.pkType === 'varchar' ? 'string' : 'number';
  const apiPath = resource.name.replace(/([A-Z])/g, '-$1').toLowerCase().slice(1);
  
  return `import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ${resource.name}Service } from './${resource.name.toLowerCase()}.service';
import { ${resource.name} } from './${resource.name.toLowerCase()}.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('api/${apiPath}')
@UseGuards(JwtAuthGuard)
export class ${resource.name}Controller {
  constructor(private readonly service: ${resource.name}Service) {}

  @Get()
  async findAll(@Query('page') page?: number, @Query('limit') limit?: number) {
    const result = await this.service.findAll({ page, limit });
    return {
      success: true,
      data: result.data,
      total: result.total,
      page: page || 1,
      limit: limit || 10,
    };
  }

  @Get('stats')
  async getStats() {
    const stats = await this.service.getStats();
    return {
      success: true,
      data: stats,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: ${pkType}) {
    const data = await this.service.findOne(id);
    return {
      success: true,
      data,
    };
  }

  @Post()
  async create(@Body() data: Partial<${resource.name}>) {
    const result = await this.service.create(data);
    return {
      success: true,
      data: result,
      message: 'Tạo ${resource.displayName} thành công',
    };
  }

  @Put(':id')
  async update(@Param('id') id: ${pkType}, @Body() data: Partial<${resource.name}>) {
    const result = await this.service.update(id, data);
    return {
      success: true,
      data: result,
      message: 'Cập nhật ${resource.displayName} thành công',
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: ${pkType}) {
    await this.service.remove(id);
    return {
      success: true,
      message: 'Xóa ${resource.displayName} thành công',
    };
  }
}
`;
}

function generateModule(resource) {
  return `import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ${resource.name} } from './${resource.name.toLowerCase()}.entity';
import { ${resource.name}Service } from './${resource.name.toLowerCase()}.service';
import { ${resource.name}Controller } from './${resource.name.toLowerCase()}.controller';

@Module({
  imports: [TypeOrmModule.forFeature([${resource.name}])],
  providers: [${resource.name}Service],
  controllers: [${resource.name}Controller],
  exports: [${resource.name}Service],
})
export class ${resource.name}Module {}
`;
}

// Generate all resources
console.log('🚀 Starting resource generation...\n');

resources.forEach((resource) => {
  const folderName = resource.name.toLowerCase().replace(/([A-Z])/g, '-$1').slice(1);
  const folderPath = path.join(__dirname, 'src', folderName);

  // Create folder if not exists
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }

  // Generate files
  const entityContent = generateEntity(resource);
  const serviceContent = generateService(resource);
  const controllerContent = generateController(resource);
  const moduleContent = generateModule(resource);

  fs.writeFileSync(path.join(folderPath, `${folderName}.entity.ts`), entityContent);
  fs.writeFileSync(path.join(folderPath, `${folderName}.service.ts`), serviceContent);
  fs.writeFileSync(path.join(folderPath, `${folderName}.controller.ts`), controllerContent);
  fs.writeFileSync(path.join(folderPath, `${folderName}.module.ts`), moduleContent);

  console.log(`✅ Generated ${resource.name} (${resource.displayName})`);
});

console.log('\n✨ All resources generated successfully!');
console.log('\n📝 Next steps:');
console.log('1. Update each entity file with proper columns from your database schema');
console.log('2. Add all modules to app.module.ts imports array');
console.log('3. Run: npm run build');
console.log('4. Run: npm run start:dev');
