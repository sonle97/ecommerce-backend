import { Resolver, Mutation, Arg, UseMiddleware } from "type-graphql";
import { InjectRepository } from "typeorm-typedi-extensions";

import { SubCategories } from "../../entities/SubCategories";
import { UpdateSubCategoryInput } from "../../inputs/SubCategories/UpdateSubCategoryInput";
import { SubCategoryRepository } from "../../repositories/SubCategoryRepository";
import { IsLoggedIn } from "../../middleware/IsLoggedIn";

@Resolver((_type) => SubCategories)
export class UpdateSubCategory {
  constructor(
    @InjectRepository(SubCategories)
    private readonly subCategoryRepository: SubCategoryRepository
  ) {}

  @UseMiddleware(IsLoggedIn)
  @Mutation(() => SubCategories)
  public async updateSubCategory(
    @Arg("id") id: number,
    @Arg("data") data: UpdateSubCategoryInput
  ): Promise<SubCategories> {
    const subCategory = await this.subCategoryRepository
      .createQueryBuilder()
      .where("id = :id", {
        id: id,
      })
      .getOne();

    if (!subCategory) {
      throw new Error("Category is not found");
    }
    this.subCategoryRepository.merge(subCategory, data);

    return await this.subCategoryRepository.save(subCategory);
  }
}
