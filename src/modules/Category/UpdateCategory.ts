import { Resolver, Mutation, Arg, UseMiddleware } from "type-graphql";
import { InjectRepository } from "typeorm-typedi-extensions";

import { Categories } from "../../entities/Categories";
import { UpdateCategoryInput } from "../../inputs/Categories/UpdatecategoryInput";
import { CategoryRepository } from "../../repositories/CategoryRepository";
import { IsLoggedIn } from "../../middleware/IsLoggedIn";

@Resolver((_type) => Categories)
export class UpdateCategory {
  constructor(
    @InjectRepository(Categories)
    private readonly categoryRepository: CategoryRepository
  ) {}

  @UseMiddleware(IsLoggedIn)
  @Mutation(() => Categories)
  public async updateCategory(
    @Arg("id") id: number,
    @Arg("data") data: UpdateCategoryInput
  ): Promise<Categories> {
    const category = await this.categoryRepository
      .createQueryBuilder()
      .where("id = :id", {
        id: id,
      })
      .getOne();

    if (!category) {
      throw new Error("Category is not found");
    }
    this.categoryRepository.merge(category, data);

    return await this.categoryRepository.save(category);
  }
}
