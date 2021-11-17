import { Resolver, Mutation, Arg, UseMiddleware } from "type-graphql";
import { InjectRepository } from "typeorm-typedi-extensions";

import { SubCategories } from "../../entities/SubCategories";
import { SubCategoryRepository } from "../../repositories/SubCategoryRepository";
import { CreateSubCategoryInput } from "../../inputs/SubCategories/CreateSubCategoryInput";
import { IsLoggedIn } from "../../middleware/IsLoggedIn";

@Resolver((_type) => SubCategories)
export class CreateSubCategory {
  constructor(
    @InjectRepository(SubCategories)
    private readonly subCategoryRepository: SubCategoryRepository
  ) {}
  @UseMiddleware(IsLoggedIn)
  @Mutation(() => SubCategories)
  async createSubCategory(
    @Arg("data") data: CreateSubCategoryInput
  ): Promise<SubCategories> {
    const subCategory = this.subCategoryRepository.create(data);
    return this.subCategoryRepository.save(subCategory);
  }
}
