import { Module } from '@nestjs/common';
import { TotesService } from './totes.service';
import { TotesResolver } from './totes.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ToteEntity } from './entities/tote.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ToteEntity])],
  providers: [TotesResolver, TotesService],
})
export class TotesModule {}
