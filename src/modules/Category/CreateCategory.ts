import { Resolver, Mutation, Arg, UseMiddleware } from "type-graphql";
import { InjectRepository } from "typeorm-typedi-extensions";

import { Categories } from "../../entities/Categories";
import { CategoryRepository } from "../../repositories/CategoryRepository";
import { CreateCategoryInput } from "../../inputs/Categories/CreateCategoryInput";
import { IsLoggedIn } from "../../middleware/IsLoggedIn";

@Resolver((_type) => Categories)
export class CreateCategory {
  constructor(
    @InjectRepository(Categories)
    private readonly categoryRepository: CategoryRepository
  ) {}
  @UseMiddleware(IsLoggedIn)
  @Mutation(() => Categories)
  async createCategory(
    @Arg("data") data: CreateCategoryInput
  ): Promise<Categories> {
    const category = this.categoryRepository.create(data);
    return this.categoryRepository.save(category);
  }
}
