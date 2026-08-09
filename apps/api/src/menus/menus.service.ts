import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class MenusService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.menu.findMany({
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
}
