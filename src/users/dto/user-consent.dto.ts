import { IsNotEmpty, IsEnum, IsBoolean } from 'class-validator';

export class UserConsentDto {
    @IsNotEmpty({ message: 'Consent is required' })
    @IsEnum(['email_notifications', 'sms_notifications'], {
        message: 'Consent must either email_notifications or sms_notifications',
    })
    id: string;

    @IsNotEmpty({ message: 'Consent status is required' })
    @IsBoolean({ message: 'Consent status must be a boolean' })
    enabled: boolean;
}