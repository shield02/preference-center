import {TypeOrmModuleOptions} from "@nestjs/typeorm";
import {User} from "../users/entities/user.entity";
import {Event} from "../events/entities/event.entity";

export const typeormE2eConfig: TypeOrmModuleOptions = {
    type: "postgres",
    host: process.env.TEST_DB_HOST || 'localhost',
    port: parseInt(process.env.TEST_DB_PORT || '5432'),
    username: process.env.TEST_DB_USER,
    password: process.env.TEST_DB_PASSWORD,
    database: process.env.TEST_DB_DATABASE,
    entities: [User, Event],
    synchronize: true,
    dropSchema: true,
    logging: false,
}