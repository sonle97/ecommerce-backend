import { EntityRepository, Repository } from "typeorm";
import { Categories } from "../entities/Categories";
@EntityRepository(Categories)
export class CategoryRepository extends Repository<Categories> {
  public async getCategories(): Promise<Categories[]> {
    return this.createQueryBuilder().getMany();
  }
}
