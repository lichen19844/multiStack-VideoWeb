import { Module, Global } from '@nestjs/common';
import { CommonService } from './common.service';
import { ConfigModule } from '@nestjs/config';
// import { DbModule } from '@libs/db';
import { DbModule } from '../../db/src';
import { JwtModule } from '@nestjs/jwt'

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    JwtModule.registerAsync({
      useFactory() {
        return {
          secret: process.env.SECRET
        }
      }
    }),
    DbModule
  ],
  providers: [CommonService],
  exports: [CommonService, JwtModule, DbModule],
})
export class CommonModule {}
