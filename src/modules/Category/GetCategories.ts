import { Resolver, Query, UseMiddleware } from "type-graphql";
import { InjectRepository } from "typeorm-typedi-extensions";

import { Categories } from "../../entities/Categories";
import { CategoryRepository } from "../../repositories/CategoryRepository";
import { IsLoggedIn } from "../../middleware/IsLoggedIn";

@Resolver((_type) => Categories)
export class GetCategories {
  constructor(
    @InjectRepository(Categories)
    private readonly categoryRepository: CategoryRepository
  ) {}

  @UseMiddleware(IsLoggedIn)
  @Query(() => [Categories])
  public async getCategories(): Promise<Categories[]> {
    return await this.categoryRepository
      .createQueryBuilder("categories")
      .leftJoinAndSelect("categories.subCategories", "sub_categories")
      .leftJoinAndSelect("categories.products", "products")
      .getMany();
  }
}
