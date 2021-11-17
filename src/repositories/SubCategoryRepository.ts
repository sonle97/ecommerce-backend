import { EntityRepository, Repository } from "typeorm";
import { SubCategories } from "../entities/SubCategories";
@EntityRepository(SubCategories)
export class SubCategoryRepository extends Repository<SubCategories> {}
