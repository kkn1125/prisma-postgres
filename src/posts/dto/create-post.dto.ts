import { Post } from '@prisma/client';

export class CreatePostDto
  implements Omit<Post, 'id' | 'createdAt' | 'updatedAt'>
{
  title: string;
  content: string;
  published: boolean;
  authorId: number;
}
