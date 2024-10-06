import { User } from '@prisma/client';

export class CreateUserDto
  implements Omit<User, 'id' | 'createdAt' | 'updatedAt'>
{
  name: string;
  email: string;
  password: string;
}
