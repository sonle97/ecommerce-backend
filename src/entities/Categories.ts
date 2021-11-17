import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  OneToMany,
} from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { SubCategories } from "./SubCategories";
import { Product } from "./Product";

@Entity()
@ObjectType()
export class Categories {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column()
  name: string;

  @Field(() => String)
  @Column()
  slug: string;

  @Field()
  @CreateDateColumn()
  createdAt!: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt!: Date;

  @Field((_type) => [SubCategories])
  @OneToMany((_type) => SubCategories, (s: SubCategories) => s.category)
  public subCategories?: SubCategories[];

  @Field((_type) => [Product])
  @OneToMany((_type) => Product, (p: Product) => p.category)
  public products?: Product[];
}
