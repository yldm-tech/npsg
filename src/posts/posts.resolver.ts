import { PostsArgs } from './dto/posts.args';
import { Posts } from './post.entity';
import { PostsService } from './posts.service';
import { NotFoundException, ParseIntPipe } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { CreatePostDto } from './dto/create-post.dto';

const pubSub = new PubSub();
@Resolver((of) => Posts)
export class PostsResolver {
  constructor(private readonly postService: PostsService) {}

  @Query((returns) => Posts)
  async post(@Args('id', ParseIntPipe) id: number): Promise<Posts> {
    const recipe = await this.postService.findOne(id);
    if (!recipe) {
      throw new NotFoundException(id);
    }
    return recipe;
  }

  @Query((returns) => [Posts])
  posts(@Args() postsArgs: PostsArgs): Promise<Posts[]> {
    return this.postService.findAll(postsArgs);
  }

  @Mutation((returns) => Posts)
  async addPost(
    @Args('newPostData') newPostData: CreatePostDto,
  ): Promise<Posts> {
    const recipe = await this.postService.create(newPostData);
    pubSub.publish('postAdded', { recipeAdded: recipe });
    return recipe;
  }

  @Mutation((returns) => Boolean)
  async removePost(@Args('id', ParseIntPipe) id: number) {
    return this.postService.remove(id);
  }

  @Subscription((returns) => Posts)
  postAdded() {
    return pubSub.asyncIterator('postAdded');
  }
}
