const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const targetDir = path.join(__dirname, 'src', 'customers');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const resources = [
  { name: 'customers', classPrefix: 'Customers', model: 'customer' },
  { name: 'customer-labels', classPrefix: 'CustomerLabels', model: 'customerLabel' },
  { name: 'customer-notes', classPrefix: 'CustomerNotes', model: 'customerNote' },
  { name: 'customer-identifications', classPrefix: 'CustomerIdentifications', model: 'customerIdentification' },
  { name: 'customer-groups', classPrefix: 'CustomerGroups', model: 'customerGroup' },
  { name: 'corporate-accounts', classPrefix: 'CorporateAccounts', model: 'corporateAccount' },
];

let moduleImports = [];
let moduleControllers = [];
let moduleProviders = [];

resources.forEach(res => {
  const controllerCode = `import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { ${res.classPrefix}Service } from './${res.name}.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('${res.name}')
export class ${res.classPrefix}Controller {
  constructor(private readonly service: ${res.classPrefix}Service) {}

  @Post()
  create(@Request() req: any, @Body() data: any) {
    return this.service.create(req.user.businessId, data);
  }

  @Get()
  findAll(@Request() req: any) {
    return this.service.findAll(req.user.businessId);
  }

  @Get(':id')
  findOne(@Request() req: any, @Param('id') id: string) {
    return this.service.findOne(req.user.businessId, id);
  }

  @Patch(':id')
  update(@Request() req: any, @Param('id') id: string, @Body() data: any) {
    return this.service.update(req.user.businessId, id, data);
  }

  @Delete(':id')
  remove(@Request() req: any, @Param('id') id: string) {
    return this.service.remove(req.user.businessId, id);
  }
}
`;

  const serviceCode = `import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ${res.classPrefix}Service {
  constructor(private prisma: PrismaService) {}

  create(businessId: string, data: any) {
    return this.prisma.${res.model}.create({
      data: { ...data, businessId }
    });
  }

  findAll(businessId: string) {
    return this.prisma.${res.model}.findMany({
      where: { businessId }
    });
  }

  findOne(businessId: string, id: string) {
    return this.prisma.${res.model}.findFirst({
      where: { id, businessId }
    });
  }

  update(businessId: string, id: string, data: any) {
    return this.prisma.${res.model}.updateMany({
      where: { id, businessId },
      data
    });
  }

  remove(businessId: string, id: string) {
    return this.prisma.${res.model}.deleteMany({
      where: { id, businessId }
    });
  }
}
`;

  fs.writeFileSync(path.join(targetDir, `${res.name}.controller.ts`), controllerCode);
  fs.writeFileSync(path.join(targetDir, `${res.name}.service.ts`), serviceCode);

  moduleImports.push(`import { ${res.classPrefix}Controller } from './${res.name}.controller';`);
  moduleImports.push(`import { ${res.classPrefix}Service } from './${res.name}.service';`);
  moduleControllers.push(`${res.classPrefix}Controller`);
  moduleProviders.push(`${res.classPrefix}Service`);
});

const moduleCode = `import { Module } from '@nestjs/common';
${moduleImports.join('\\n')}

@Module({
  controllers: [${moduleControllers.join(', ')}],
  providers: [${moduleProviders.join(', ')}],
})
export class CustomersModule {}
`;

fs.writeFileSync(path.join(targetDir, 'customers.module.ts'), moduleCode);
console.log('Successfully generated CustomersModule and all resources!');
