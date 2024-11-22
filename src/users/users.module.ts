import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from "./entities/user.entity";
import { IsUniqueEmailConstraint } from '../common/validators/email.validator';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [UsersController],
    providers: [UsersService, IsUniqueEmailConstraint],
})
export class UsersModule {}