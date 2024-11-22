import {
    Injectable,
    ConflictException,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const user = await this.userRepository.findOne({
            where: { email: createUserDto.email }
        });

        if (user) {
            throw new ConflictException('User with this email already exists');
        }

        const newUser = this.userRepository.create(createUserDto);
        return await this.userRepository.save(newUser);
    }

    async findUser(id: string): Promise<User> {
        const user: User | null = await this.userRepository.findOne({
            where: { id },
            relations: ['events'] // Include events relationship
        });

        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }

        return user;
    }

    async deleteUser(id: string): Promise<void> {
        const user = await this.userRepository.findOne({
            where: { id: id}
        });

        if (!user) {
            throw new NotFoundException(`User with not found`);
        }

        await this.userRepository.remove(user);
    }
}