import { EntityRepository, Repository } from "typeorm";

import { ProductImages } from "../entities/ProductImages";

@EntityRepository(ProductImages)
export class ThumbnailImageRepository extends Repository<ProductImages> {}
