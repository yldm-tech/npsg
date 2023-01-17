import { Injectable } from '@nestjs/common';
import { PrismaService } from 'server/src/prisma/prisma.service';
import { CreatePostDto } from './create_post.dto';
import { UpdatePostDto } from './update_post.dto';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  create(createPostDto: CreatePostDto) {
    return this.prisma.post.create({ data: createPostDto });
  }

  findDrafts() {
    return this.prisma.post.findMany({ where: { published: false } });
  }

  findAll() {
    return this.prisma.post.findMany({ where: { published: true } });
  }

  findOne(id: number) {
    return this.prisma.post.findUnique({ where: { id } });
  }

  update(id: number, updateArticleDto: UpdatePostDto) {
    return this.prisma.post.update({
      where: { id },
      data: updateArticleDto,
    });
  }

  remove(id: number) {
    return this.prisma.post.delete({
      where: { id },
    });
  }
}
