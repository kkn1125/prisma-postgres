import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DatabaseService } from 'src/database/database.service';
import crypto from 'crypto';
import { RedisService } from '@liaoliaots/nestjs-redis';

@Injectable()
export class UsersService {
  constructor(
    private redis: RedisService,
    private prisma: DatabaseService,
  ) {}

  create(createUserDto: CreateUserDto) {
    const encodedPassword = this.encodePassword(
      createUserDto.email,
      createUserDto.password,
    );
    createUserDto.password = encodedPassword;
    return this.prisma.user.create({ data: createUserDto });
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: number) {
    return this.prisma.user.findFirst({ where: { id } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({ where: { id }, data: updateUserDto });
  }

  remove(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }

  login(email: string, password: string) {
    const encodedPassword = this.encodePassword(email, password);
    this.authorization(email, encodedPassword);
  }
  private authorization(email: string, encodedPassword: string) {
    // this.redis.getOrNil(email, )
  }

  private encodePassword(email: string, password: string) {
    const payload = email + password;
    const hmac = crypto.createHash('sha256');
    hmac.update(payload);
    const encoded = hmac.digest('hex');
    return encoded;
  }
}
