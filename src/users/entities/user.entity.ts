import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    CreateDateColumn,
} from 'typeorm';
import { Event } from '../../events/entities/event.entity';
import { UserConsentDto } from "../dto/user-consent.dto";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    email: string;

    @Column("jsonb", { default: [] })
    consents: UserConsentDto[];

    @CreateDateColumn()
    createdAt: Date;

    @OneToMany(() => Event, (event: any)=> event.user)
    events: Event[];
}