import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService, ConfigType } from '@nestjs/config';
import commonConf from './common/common.conf';
import { ResponseInterceptor } from './response/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(new ResponseInterceptor());

  app.setGlobalPrefix('api');

  app.enableCors({
    origin: '*',
    credentials: true,
  });

  const configService = app.get(ConfigService);
  const commonConfig =
    configService.get<ConfigType<typeof commonConf>>('common');

  const host = commonConfig.host;
  const port = commonConfig.port;
  // const port = commonConfig.port;

  await app.listen(port, host, () => {
    console.log(`server listening on http://localhost:%d`, port);
  });
}

bootstrap();
