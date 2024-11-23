import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from "@nestjs/config";
import { UsersModule } from './users/users.module';
import { EventsModule } from './events/events.module';
import { typeOrmConfig } from './database/typeorm.config'

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
        }),
        TypeOrmModule.forRoot(typeOrmConfig),
        UsersModule,
        EventsModule,
    ],
})
export class AppModule {}