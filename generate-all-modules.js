#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

// Module definitions with proper table structures from migrations
const modules = [
  // Module 2: Y tế - Giáo dục
  {
    folder: 'tram-y-te',
    className: 'TramYTe',
    tableName: 'TramYTe',
    primaryKey: 'MaTram',
    columns: [
      { name: 'MaTram', type: 'int', primary: true },
      { name: 'TenTram', type: 'varchar', length: 150 },
      { name: 'DiaChi', type: 'varchar', length: 255, nullable: true },
      { name: 'SoDienThoai', type: 'varchar', length: 20, nullable: true },
      { name: 'SoNhanVien', type: 'int', default: 0 },
      { name: 'SoLuotKhamThang', type: 'int', default: 0 },
      { name: 'TrangThai', type: 'boolean', default: true },
      { name: 'GhiChu', type: 'text', nullable: true },
      { name: 'NgayTao', type: 'timestamp', default: 'CURRENT_TIMESTAMP' },
    ]
  },
  {
    folder: 'dich-benh',
    className: 'DichBenh',
    tableName: 'DichBenh',
    primaryKey: 'MaDich',
    columns: [
      { name: 'MaDich', type: 'int', primary: true },
      { name: 'TenDich', type: 'varchar', length: 100 },
      { name: 'KhuVuc', type: 'varchar', length: 150, nullable: true },
      { name: 'SoCaNhiem', type: 'int', default: 0 },
      { name: 'SoCaKhoi', type: 'int', default: 0 },
      { name: 'NgayBatDau', type: 'date', nullable: true },
      { name: 'NgayKetThuc', type: 'date', nullable: true },
      { name: 'MucDo', type: 'varchar', length: 20, nullable: true },
      { name: 'TrangThai', type: 'varchar', length: 50, default: "'Đang theo dõi'" },
      { name: 'GhiChu', type: 'text', nullable: true },
      { name: 'NgayCapNhat', type: 'timestamp', default: 'CURRENT_TIMESTAMP' },
    ]
  },
  {
    folder: 'co-so-giao-duc',
    className: 'CoSoGiaoDuc',
    tableName: 'CoSoGiaoDuc',
    primaryKey: 'MaCoSo',
    columns: [
      { name: 'MaCoSo', type: 'int', primary: true },
      { name: 'TenCoSo', type: 'varchar', length: 200 },
      { name: 'LoaiHinh', type: 'varchar', length: 50, nullable: true },
      { name: 'DiaChi', type: 'varchar', length: 255, nullable: true },
      { name: 'SoDienThoai', type: 'varchar', length: 20, nullable: true },
      { name: 'SoHocSinh', type: 'int', default: 0 },
      { name: 'SoGiaoVien', type: 'int', default: 0 },
      { name: 'TrangThai', type: 'boolean', default: true },
      { name: 'GhiChu', type: 'text', nullable: true },
      { name: 'NgayTao', type: 'timestamp', default: 'CURRENT_TIMESTAMP' },
    ]
  },
  // Module 3: Tài chính
  {
    folder: 'ngan-sach',
    className: 'NganSach',
    tableName: 'NganSach',
    primaryKey: 'MaNganSach',
    columns: [
      { name: 'MaNganSach', type: 'int', primary: true },
      { name: 'Nam', type: 'int' },
      { name: 'MaLinhVuc', type: 'int', nullable: true },
      { name: 'TongDuToan', type: 'decimal', precision: 18, scale: 0, default: 0 },
      { name: 'DaGiaiNgan', type: 'decimal', precision: 18, scale: 0, default: 0 },
      { name: 'ConLai', type: 'decimal', precision: 18, scale: 0, default: 0 },
      { name: 'TrangThai', type: 'varchar', length: 50, default: "'Đang thực hiện'" },
      { name: 'NgayTao', type: 'timestamp', default: 'CURRENT_TIMESTAMP' },
    ]
  },
  // Module 4: Địa chính
  {
    folder: 'thua-dat',
    className: 'ThuaDat',
    tableName: 'ThuaDat',
    primaryKey: 'MaThua',
    pkType: 'varchar',
    columns: [
      { name: 'MaThua', type: 'varchar', length: 20, primary: true },
      { name: 'SoThua', type: 'varchar', length: 20 },
      { name: 'SoToBanDo', type: 'varchar', length: 20, nullable: true },
      { name: 'DienTich', type: 'decimal', precision: 18, scale: 2 },
      { name: 'MaLoaiDat', type: 'varchar', length: 20, nullable: true },
      { name: 'ChuSoHuu', type: 'varchar', length: 150, nullable: true },
      { name: 'ToaDo', type: 'varchar', length: 100, nullable: true },
      { name: 'TrangThai', type: 'varchar', length: 50, default: "'Đang sử dụng'" },
      { name: 'GhiChu', type: 'text', nullable: true },
    ]
  },
  {
    folder: 'bien-dong-dat',
    className: 'BienDongDat',
    tableName: 'BienDongDat',
    primaryKey: 'MaBienDong',
    columns: [
      { name: 'MaBienDong', type: 'int', primary: true },
      { name: 'MaThua', type: 'varchar', length: 20 },
      { name: 'LoaiBienDong', type: 'varchar', length: 50 },
      { name: 'NgayBienDong', type: 'date', default: 'CURRENT_DATE' },
      { name: 'DienTichCu', type: 'decimal', precision: 18, scale: 2, nullable: true },
      { name: 'DienTichMoi', type: 'decimal', precision: 18, scale: 2, nullable: true },
      { name: 'MaLoaiDatCu', type: 'varchar', length: 20, nullable: true },
      { name: 'MaLoaiDatMoi', type: 'varchar', length: 20, nullable: true },
      { name: 'LyDo', type: 'text', nullable: true },
      { name: 'NguoiThucHien', type: 'int', nullable: true },
    ]
  },
  // Module 5: Môi trường
  {
    folder: 'rac-thai',
    className: 'RacThai',
    tableName: 'RacThai',
    primaryKey: 'MaDiem',
    columns: [
      { name: 'MaDiem', type: 'int', primary: true },
      { name: 'TenDiem', type: 'varchar', length: 150 },
      { name: 'DiaChi', type: 'varchar', length: 255, nullable: true },
      { name: 'ToaDo', type: 'varchar', length: 50, nullable: true },
      { name: 'LoaiRac', type: 'varchar', length: 50, nullable: true },
      { name: 'KhoiLuongThang', type: 'decimal', precision: 18, scale: 2, default: 0 },
      { name: 'TinhTrang', type: 'varchar', length: 50, default: "'Bình thường'" },
      { name: 'NgayCapNhat', type: 'timestamp', default: 'CURRENT_TIMESTAMP' },
      { name: 'GhiChu', type: 'text', nullable: true },
    ]
  },
  {
    folder: 'bao-cao-o-nhiem',
    className: 'BaoCaoONhiem',
    tableName: 'BaoCaoONhiem',
    primaryKey: 'MaBaoCao',
    columns: [
      { name: 'MaBaoCao', type: 'int', primary: true },
      { name: 'LoaiONhiem', type: 'varchar', length: 50 },
      { name: 'KhuVuc', type: 'varchar', length: 150, nullable: true },
      { name: 'MucDo', type: 'varchar', length: 20, nullable: true },
      { name: 'NgayBaoCao', type: 'date', default: 'CURRENT_DATE' },
      { name: 'NoiDung', type: 'text', nullable: true },
      { name: 'TrangThai', type: 'varchar', length: 50, default: "'Chờ xử lý'" },
      { name: 'NguoiBaoCao', type: 'int', nullable: true },
    ]
  },
  // Module 6: Văn hóa
  {
    folder: 'di-tich',
    className: 'DiTich',
    tableName: 'DiTich',
    primaryKey: 'MaDiTich',
    columns: [
      { name: 'MaDiTich', type: 'int', primary: true },
      { name: 'TenDiTich', type: 'varchar', length: 200 },
      { name: 'LoaiDiTich', type: 'varchar', length: 50, nullable: true },
      { name: 'DiaChi', type: 'varchar', length: 255, nullable: true },
      { name: 'ToaDo', type: 'varchar', length: 50, nullable: true },
      { name: 'CapXepHang', type: 'varchar', length: 50, nullable: true },
      { name: 'TinhTrang', type: 'varchar', length: 50, default: "'Tốt'" },
      { name: 'MoTa', type: 'text', nullable: true },
      { name: 'NgayTao', type: 'timestamp', default: 'CURRENT_TIMESTAMP' },
    ]
  },
  {
    folder: 'lang-nghe',
    className: 'LangNghe',
    tableName: 'LangNghe',
    primaryKey: 'MaLangNghe',
    columns: [
      { name: 'MaLangNghe', type: 'int', primary: true },
      { name: 'TenLangNghe', type: 'varchar', length: 200 },
      { name: 'LoaiNghe', type: 'varchar', length: 100, nullable: true },
      { name: 'DiaChi', type: 'varchar', length: 255, nullable: true },
      { name: 'SoHoNghe', type: 'int', default: 0 },
      { name: 'SanPhamChinh', type: 'varchar', length: 200, nullable: true },
      { name: 'TrangThai', type: 'boolean', default: true },
      { name: 'NgayTao', type: 'timestamp', default: 'CURRENT_TIMESTAMP' },
    ]
  },
  {
    folder: 'le-hoi',
    className: 'LeHoi',
    tableName: 'LeHoi',
    primaryKey: 'MaLeHoi',
    columns: [
      { name: 'MaLeHoi', type: 'int', primary: true },
      { name: 'TenLeHoi', type: 'varchar', length: 200 },
      { name: 'ThoiGianToChuc', type: 'date', nullable: true },
      { name: 'DiaDiem', type: 'varchar', length: 255, nullable: true },
      { name: 'SoLuongKhach', type: 'int', default: 0 },
      { name: 'MoTa', type: 'text', nullable: true },
      { name: 'TrangThai', type: 'varchar', length: 50, default: "'Đã tổ chức'" },
      { name: 'NgayTao', type: 'timestamp', default: 'CURRENT_TIMESTAMP' },
    ]
  },
  // Module 7: An ninh
  {
    folder: 'vi-pham',
    className: 'ViPham',
    tableName: 'ViPham',
    primaryKey: 'MaViPham',
    columns: [
      { name: 'MaViPham', type: 'int', primary: true },
      { name: 'TenViPham', type: 'varchar', length: 200 },
      { name: 'LoaiViPham', type: 'varchar', length: 50, nullable: true },
      { name: 'DiaDiem', type: 'varchar', length: 255, nullable: true },
      { name: 'NgayViPham', type: 'date', default: 'CURRENT_DATE' },
      { name: 'NguoiViPham', type: 'varchar', length: 150, nullable: true },
      { name: 'MucPhat', type: 'decimal', precision: 18, scale: 0, nullable: true },
      { name: 'TrangThai', type: 'varchar', length: 50, default: "'Đã xử lý'" },
      { name: 'GhiChu', type: 'text', nullable: true },
      { name: 'NguoiLap', type: 'int', nullable: true },
    ]
  },
  {
    folder: 'diem-nong-an-ninh',
    className: 'DiemNongAnNinh',
    tableName: 'DiemNongAnNinh',
    primaryKey: 'MaDiem',
    columns: [
      { name: 'MaDiem', type: 'int', primary: true },
      { name: 'TenDiem', type: 'varchar', length: 150 },
      { name: 'DiaDiem', type: 'varchar', length: 255, nullable: true },
      { name: 'ToaDo', type: 'varchar', length: 50, nullable: true },
      { name: 'LoaiRuiRo', type: 'varchar', length: 100, nullable: true },
      { name: 'MucDoNghiemTrong', type: 'varchar', length: 20, nullable: true },
      { name: 'TinhTrang', type: 'varchar', length: 50, default: "'Đang theo dõi'" },
      { name: 'NgayPhatHien', type: 'date', default: 'CURRENT_DATE' },
      { name: 'BienPhapXuLy', type: 'text', nullable: true },
      { name: 'GhiChu', type: 'text', nullable: true },
    ]
  },
];

function toKebabCase(str) {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

function generateEntity(module) {
  const pkType = module.pkType || 'int';
  let entityContent = `import { Entity, ${pkType === 'varchar' ? 'Column' : 'PrimaryGeneratedColumn'}, Column } from 'typeorm';\n\n`;
  entityContent += `@Entity({ schema: 'dashboard_xp', name: '${module.tableName}' })\n`;
  entityContent += `export class ${module.className} {\n`;

  module.columns.forEach(col => {
    if (col.primary) {
      if (pkType === 'varchar') {
        entityContent += `  @Column({ name: '${col.name}', type: '${col.type}', length: ${col.length}, primary: true })\n`;
        entityContent += `  ${col.name}: string;\n\n`;
      } else {
        entityContent += `  @PrimaryGeneratedColumn({ name: '${col.name}' })\n`;
        entityContent += `  ${col.name}: number;\n\n`;
      }
    } else {
      const options = [`name: '${col.name}'`, `type: '${col.type}'`];
      if (col.length) options.push(`length: ${col.length}`);
      if (col.precision) options.push(`precision: ${col.precision}`);
      if (col.scale) options.push(`scale: ${col.scale}`);
      if (col.nullable) options.push(`nullable: true`);
      if (col.default && typeof col.default === 'string' && !col.default.includes('CURRENT')) options.push(`default: ${col.default}`);
      
      entityContent += `  @Column({ ${options.join(', ')} })\n`;
      
      let tsType = 'string';
      if (['int', 'decimal', 'float'].includes(col.type)) tsType = 'number';
      if (col.type === 'boolean') tsType = 'boolean';
      if (col.type === 'date' || col.type === 'timestamp') tsType = 'Date';
      if (col.nullable) tsType += ' | null';
      
      entityContent += `  ${col.name}${col.nullable ? '?' : ''}: ${tsType};\n\n`;
    }
  });

  entityContent += `}\n`;
  return entityContent;
}

function generateService(module) {
  const pkType = module.pkType === 'varchar' ? 'string' : 'number';
  return `import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ${module.className} } from './${toKebabCase(module.className)}.entity';

@Injectable()
export class ${module.className}Service {
  constructor(
    @InjectRepository(${module.className})
    private repository: Repository<${module.className}>,
  ) {}

  async findAll(page: number = 1, limit: number = 10) {
    const [items, total] = await this.repository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { ${module.primaryKey}: 'DESC' },
    });

    return {
      success: true,
      data: items,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: ${pkType}) {
    const item = await this.repository.findOne({ where: { ${module.primaryKey}: id } as any });
    if (!item) {
      return { success: false, message: 'Không tìm thấy bản ghi' };
    }
    return { success: true, data: item };
  }

  async getStats() {
    const total = await this.repository.count();
    return {
      success: true,
      data: { total },
    };
  }

  async create(data: Partial<${module.className}>) {
    const item = this.repository.create(data);
    await this.repository.save(item);
    return { success: true, data: item, message: 'Tạo mới thành công' };
  }

  async update(id: ${pkType}, data: Partial<${module.className}>) {
    await this.repository.update({ ${module.primaryKey}: id } as any, data);
    const updated = await this.repository.findOne({ where: { ${module.primaryKey}: id } as any });
    return { success: true, data: updated, message: 'Cập nhật thành công' };
  }

  async delete(id: ${pkType}) {
    await this.repository.delete({ ${module.primaryKey}: id } as any);
    return { success: true, message: 'Xóa thành công' };
  }
}
`;
}

function generateController(module) {
  const pkType = module.pkType === 'varchar' ? 'string' : 'number';
  const paramType = pkType === 'string' ? 'string' : '+id';
  
  return `import { Controller, Get, Post, Put, Delete, Param, Body, Query, UseGuards } from '@nestjs/common';
import { ${module.className}Service } from './${toKebabCase(module.className)}.service';
import { ${module.className} } from './${toKebabCase(module.className)}.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('${module.folder}')
@UseGuards(JwtAuthGuard)
export class ${module.className}Controller {
  constructor(private readonly service: ${module.className}Service) {}

  @Get()
  async findAll(@Query('page') page?: string, @Query('limit') limit?: string) {
    return this.service.findAll(page ? +page : 1, limit ? +limit : 10);
  }

  @Get('stats')
  async getStats() {
    return this.service.getStats();
  }

  @Get(':id')
  async findOne(@Param('id') id: ${pkType}) {
    return this.service.findOne(${paramType});
  }

  @Post()
  async create(@Body() data: Partial<${module.className}>) {
    return this.service.create(data);
  }

  @Put(':id')
  async update(@Param('id') id: ${pkType}, @Body() data: Partial<${module.className}>) {
    return this.service.update(${paramType}, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: ${pkType}) {
    return this.service.delete(${paramType});
  }
}
`;
}

function generateModule(module) {
  return `import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ${module.className} } from './${toKebabCase(module.className)}.entity';
import { ${module.className}Service } from './${toKebabCase(module.className)}.service';
import { ${module.className}Controller } from './${toKebabCase(module.className)}.controller';

@Module({
  imports: [TypeOrmModule.forFeature([${module.className}])],
  providers: [${module.className}Service],
  controllers: [${module.className}Controller],
  exports: [${module.className}Service],
})
export class ${module.className}Module {}
`;
}

// Main execution
console.log('🚀 Generating modules with proper structure...\n');

const srcDir = path.join(__dirname, 'src');

modules.forEach(module => {
  const moduleDir = path.join(srcDir, module.folder);
  
  // Create directory
  if (!fs.existsSync(moduleDir)) {
    fs.mkdirSync(moduleDir, { recursive: true });
  }

  const kebabName = toKebabCase(module.className);

  // Write files
  fs.writeFileSync(
    path.join(moduleDir, `${kebabName}.entity.ts`),
    generateEntity(module)
  );

  fs.writeFileSync(
    path.join(moduleDir, `${kebabName}.service.ts`),
    generateService(module)
  );

  fs.writeFileSync(
    path.join(moduleDir, `${kebabName}.controller.ts`),
    generateController(module)
  );

  fs.writeFileSync(
    path.join(moduleDir, `${kebabName}.module.ts`),
    generateModule(module)
  );

  console.log(`✅ Generated ${module.className} (${module.folder})`);
});

console.log('\n✨ All modules generated successfully!\n');
console.log('📝 Next steps:');
console.log('1. Update app.module.ts to import all modules');
console.log('2. Update database.config.ts and data-source.ts with all entities');
console.log('3. Run: npm run build');
console.log('4. Run: npm run start:dev');
