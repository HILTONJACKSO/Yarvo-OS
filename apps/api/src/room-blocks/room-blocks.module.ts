import { Module } from '@nestjs/common';
import { RoomBlocksController } from './room-blocks.controller';
import { RoomBlocksService } from './room-blocks.service';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [RoomBlocksController],
  providers: [RoomBlocksService, PrismaService]
})
export class RoomBlocksModule {}
