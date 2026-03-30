import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import * as express from 'express';
import { sanitizeEmptyValuesMiddleware } from './common/middlewares/sanitize-empty-values.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
  const allowedOrigins = new Set(
    frontendUrl
      .split(',')
      .map((origin) => origin.trim())
      .filter(Boolean),
  );
  allowedOrigins.add('http://localhost:3000');
  allowedOrigins.add('http://localhost:3001');

  console.log('FRONTEND_URL =', frontendUrl);
  console.log('CORS allowed origins =', Array.from(allowedOrigins).join(', '));

  app.enableCors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.has(origin)) {
        callback(null, true);
        return;
      }
      callback(new Error(`Origin ${origin} is not allowed by CORS`), false);
    },
    credentials: true,
  });

  app.use(cookieParser());

  // Set request body size limit to 50MB
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));
  app.use(sanitizeEmptyValuesMiddleware);

  // API prefix
  app.setGlobalPrefix('api');

  const port = process.env.PORT || 3006;
  await app.listen(port);

  console.log(`Dashboard XP Backend is running on: http://localhost:${port}`);
  console.log(`API endpoints available at: http://localhost:${port}/api`);
}
bootstrap();
