import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// Main function to run NestJS app
async function bootstrap() {
  // Create NestJS app via NestFactory
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
