import { InputType, Field } from "type-graphql";
import { Length } from "class-validator";

@InputType()
export class UpdateSubCategoryInput {
  @Field({ nullable: true })
  @Length(1, 255)
  name: string;

  @Field({ nullable: true })
  slug: string;

  @Field({ nullable: true })
  public categoryId?: number;
}
