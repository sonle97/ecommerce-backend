import { Resolver, Query, UseMiddleware } from "type-graphql";
import { InjectRepository } from "typeorm-typedi-extensions";

import { SubCategories } from "../../entities/SubCategories";
import { SubCategoryRepository } from "../../repositories/SubCategoryRepository";
import { IsLoggedIn } from "../../middleware/IsLoggedIn";

@Resolver((_type) => SubCategories)
export class GetSubCategories {
  constructor(
    @InjectRepository(SubCategories)
    private readonly subCategoryRepository: SubCategoryRepository
  ) {}

  @UseMiddleware(IsLoggedIn)
  @Query(() => [SubCategories])
  public async getSubCategories(): Promise<SubCategories[]> {
    return await this.subCategoryRepository.createQueryBuilder().getMany();
  }
}
