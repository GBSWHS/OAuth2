import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

import helmet from 'helmet'

async function bootstrap () {
  const app = await NestFactory.create(AppModule)
  app.use(helmet())
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
    forbidUnknownValues: true
  }))
  await app.listen(3000)
}
bootstrap()
