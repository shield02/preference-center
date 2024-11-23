import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {ConfigService} from "@nestjs/config";
import {CustomValidationPipe} from './common/pipes/validation.pipe';
import {ValidationExceptionFilter} from './common/filters/validation.filter';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const configService = app.get<ConfigService>(ConfigService);
    const port = configService.get<number>('PORT', 3000);

    app.setGlobalPrefix('api/v1/')

    app.useGlobalPipes(new CustomValidationPipe());
    app.useGlobalFilters(new ValidationExceptionFilter());

    await app.listen(port,
        () => console.log(`Server started on port ${port}`)
    );
}
bootstrap();