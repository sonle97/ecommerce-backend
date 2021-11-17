import { InputType, Field } from "type-graphql";
import { Length } from "class-validator";

@InputType()
export class UpdateCategoryInput {
  @Field({ nullable: true })
  @Length(1, 255)
  name: string;

  @Field({ nullable: true })
  slug: string;
}
