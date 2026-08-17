import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class MenusService {
  constructor(private prisma: PrismaService) {}

  async findAll(businessId?: string) {
    return this.prisma.menu.findMany({ where: businessId ? { businessId } : undefined, 
      include: {
        department: true,
        categories: {
          include: {
            category: true
          }
        },
        items: {
          include: {
            catalogItem: {
              include: {
                variations: true,
                dietaryTags: { include: { dietaryTag: true } },
                allergens: { include: { allergen: true } }
              }
            }
          }
        }
      }
    });
  }

  async create(businessId: string, branchId: string, data: any) {
    if (!branchId) {
      const branch = await this.prisma.branch.findFirst({ where: { businessId } });
      if (branch) branchId = branch.id;
    }

    let code = data.code;
    if (!code) {
      const count = await this.prisma.menu.count({ where: { businessId } });
      code = `MENU-${count + 1}`;
    }

    return this.prisma.menu.create({
      data: {
        businessId,
        branchId,
        name: data.name,
        code,
        description: data.description,
        customerVisible: data.customerVisible ?? true,
        startTime: data.startTime || null,
        endTime: data.endTime || null,
        status: 'ACTIVE'
      }
    });
  }
}

