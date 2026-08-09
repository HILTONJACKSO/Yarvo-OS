const fs = require('fs');
const path = require('path');
const base = path.join(__dirname, 'src', 'property');
fs.mkdirSync(base, { recursive: true });

const resources = [
  { name: 'branch-services', classPrefix: 'BranchServices', model: 'branchService' },
  { name: 'property-areas', classPrefix: 'PropertyAreas', model: 'propertyArea' },
  { name: 'room-types', classPrefix: 'RoomTypes', model: 'roomType' },
  { name: 'rooms', classPrefix: 'Rooms', model: 'room' },
  { name: 'seating-areas', classPrefix: 'SeatingAreas', model: 'seatingArea' },
  { name: 'tables', classPrefix: 'Tables', model: 'serviceTable' },
  { name: 'service-points', classPrefix: 'ServicePoints', model: 'servicePoint' },
  { name: 'beach-resources', classPrefix: 'BeachResources', model: 'beachResource' },
  { name: 'pools', classPrefix: 'Pools', model: 'swimmingPool' },
  { name: 'event-spaces', classPrefix: 'EventSpaces', model: 'eventSpace' },
  { name: 'operating-hours', classPrefix: 'OperatingHours', model: 'operatingHour' }
];

let moduleProviders = [];
let moduleControllers = [];
let moduleImports = [];

resources.forEach(r => {
  const serviceCode = `import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ${r.classPrefix}Service {
  constructor(private prisma: PrismaService) {}

  async findAll(businessId: string, branchId: string) {
    return this.prisma.${r.model}.findMany({ where: { businessId, branchId } });
  }

  async findOne(businessId: string, branchId: string, id: string) {
    return this.prisma.${r.model}.findFirst({ where: { id, businessId, branchId } });
  }

  async create(businessId: string, branchId: string, data: any) {
    return this.prisma.${r.model}.create({
      data: { ...data, businessId, branchId }
    });
  }

  async update(businessId: string, branchId: string, id: string, data: any) {
    return this.prisma.${r.model}.update({
      where: { id },
      data
    });
  }
}
`;

  const controllerCode = `import { Controller, Get, Post, Patch, Body, Param, UseGuards, Req } from '@nestjs/common';
import { ${r.classPrefix}Service } from './${r.name}.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('${r.name}')
export class ${r.classPrefix}Controller {
  constructor(private readonly service: ${r.classPrefix}Service) {}

  @Get()
  findAll(@Req() req: any) {
    const branchId = req.headers['x-branch-id'];
    return this.service.findAll(req.user.businessId, branchId);
  }

  @Post()
  create(@Req() req: any, @Body() data: any) {
    const branchId = req.headers['x-branch-id'] || data.branchId;
    return this.service.create(req.user.businessId, branchId, data);
  }

  @Patch(':id')
  update(@Req() req: any, @Param('id') id: string, @Body() data: any) {
    const branchId = req.headers['x-branch-id'] || data.branchId;
    return this.service.update(req.user.businessId, branchId, id, data);
  }
}
`;

  fs.writeFileSync(path.join(base, r.name + '.service.ts'), serviceCode);
  fs.writeFileSync(path.join(base, r.name + '.controller.ts'), controllerCode);

  moduleProviders.push(`${r.classPrefix}Service`);
  moduleControllers.push(`${r.classPrefix}Controller`);
  moduleImports.push(`import { ${r.classPrefix}Service } from './${r.name}.service';`);
  moduleImports.push(`import { ${r.classPrefix}Controller } from './${r.name}.controller';`);
});

const moduleCode = `import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
${moduleImports.join('\n')}

@Module({
  controllers: [${moduleControllers.join(', ')}],
  providers: [${moduleProviders.join(', ')}, PrismaService],
})
export class PropertyModule {}
`;

fs.writeFileSync(path.join(base, 'property.module.ts'), moduleCode);
console.log('Successfully generated PropertyModule and all resources!');
