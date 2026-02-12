import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  });

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  // API prefix
  app.setGlobalPrefix('api');

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Hệ thống Quản lý Lương')
    .setDescription('API Documentation cho hệ thống quản lý lương')
    .setVersion('1.0')
    .addTag('departments', 'Quản lý đơn vị')
    .addTag('employees', 'Quản lý nhân viên')
    .addTag('timesheets', 'Chấm công')
    .addTag('ot', 'OT/Làm thêm giờ')
    .addTag('clawbacks', 'Truy thu lương')
    .addTag('payroll', 'Tính lương')
    .addTag('configs', 'Cấu hình')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT || 5000;
  await app.listen(port);

  console.log(`🚀 Backend đang chạy tại: http://localhost:${port}`);
  console.log(`📚 API endpoint: http://localhost:${port}/api`);
  console.log(`📖 Swagger docs: http://localhost:${port}/api/docs`);
}

bootstrap();
