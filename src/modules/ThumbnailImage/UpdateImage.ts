import { Resolver, Mutation, Arg, UseMiddleware } from "type-graphql";
import { InjectRepository } from "typeorm-typedi-extensions";
import { ApolloError } from "apollo-server-express";
import { ProductImages } from "../../entities/ProductImages";
import { ThumbnailImageRepository } from "../../repositories/ThumbnailImageRepository";
// import { UpdateThumbnailInput } from "./inputs/UpdateThumbnailImageInput";
import { IsLoggedIn } from "../../middleware/IsLoggedIn";

@Resolver((_type) => ProductImages)
export class UpdateThumbnailImage {
  constructor(
    @InjectRepository(ThumbnailImageRepository)
    private readonly thumbnailImageRepository: ThumbnailImageRepository
  ) {}
  @UseMiddleware(IsLoggedIn)
  @Mutation(() => ProductImages)
  async updateThumbnailImage(
    @Arg("id") id: number
    // @Arg("data") dataInput: UpdateThumbnailInput
  ): Promise<ProductImages> {
    const image = await this.thumbnailImageRepository.findOne(id);
    if (!image) {
      throw new ApolloError("Image is not found");
    }

    // if (!accessory) {
    //   throw new ApolloError("Accessory is not found");
    // }

    // this.thumbnailImageRepository.merge(image, {
    //   ...dataInput,
    // });

    return await this.thumbnailImageRepository.save(image);
  }
}
