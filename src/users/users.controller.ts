import {
    Controller,
    Post,
    Get,
    Delete,
    Body,
    Param,
    HttpCode,
    HttpStatus,
} from "@nestjs/common";
import { UsersService } from './users.service';
import { CreateUserDto} from './dto/create-user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createUserDto: CreateUserDto): Promise<any> {
        const user = await this.usersService.createUser(createUserDto);

        return {
            id: user.id,
            email: user.email,
            consents: []
        }
    }

    @Get(':id')
    async get(@Param('id') id: string): Promise<any> {
        const user = await this.usersService.findUser(id);

        return {
            id: user.id,
            email: user.email,
            consents: user.events.map((event): { id: string; enabled: boolean } => ({
                id: event.id,
                enabled: event.enabled
            }))
        }
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(@Param('id') id: string): Promise<any> {
        await this.usersService.deleteUser(id);
        return {
            message: 'User deleted successfully'
        }
    }
}