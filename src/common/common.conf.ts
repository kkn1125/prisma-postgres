import { registerAs } from '@nestjs/config';

export default registerAs('common', () => ({
  host: process.env.HOST || '0.0.0.0',
  port: +(process.env.PORT || 3000),
}));
