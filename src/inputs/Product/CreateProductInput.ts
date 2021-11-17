import { InputType, Field } from "type-graphql";
import { IsNotEmpty } from "class-validator";

@InputType()
export class CreateProductInput {
  @Field()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsNotEmpty()
  slug: string;

  @Field((_type) => Number, { nullable: true })
  price: number;

  @Field((_type) => String, { nullable: true })
  introdution: string;

  @Field((_type) => String, { nullable: true })
  description: string;

  @Field((_type) => Number, { nullable: true })
  categoryId!: number;

  @Field((_type) => Number, { nullable: true })
  subCategoryId!: number;
}
