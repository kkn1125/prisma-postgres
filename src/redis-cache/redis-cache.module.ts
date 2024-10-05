import { RedisModule } from '@liaoliaots/nestjs-redis';
import { Module } from '@nestjs/common';
import redisConf from 'src/common/redis.conf';

@Module({
  imports: [
    RedisModule.forRoot({
      config: {
        host: redisConf().host,
        port: redisConf().port,
        password: redisConf().password,
        retryStrategy(times) {
          if (times > 5) {
            throw new Error('retry limit');
          }
        },
      },
    }),
  ],
})
export class RedisCacheModule {}
