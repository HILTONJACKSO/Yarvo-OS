import { Module, Global } from '@nestjs/common';
import { CaslAbilityFactory } from './casl-ability.factory/casl-ability.factory';
import { PrismaService } from '../prisma.service';

@Global()
@Module({
  providers: [CaslAbilityFactory, PrismaService],
  exports: [CaslAbilityFactory],
})
export class CaslModule {}
