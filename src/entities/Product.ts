import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  RelationId,
} from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { Categories } from "./Categories";
import { SubCategories } from "./SubCategories";

@Entity()
@ObjectType()
export class Product {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @Column()
  name: string;

  @Field(() => Number, { nullable: true })
  @Column({ nullable: true })
  price?: number;

  @Field(() => String, { nullable: true })
  @Column({
    nullable: true,
    type: "text",
  })
  introdution?: string;

  @Field(() => String, { nullable: true })
  @Column({
    nullable: true,
    type: "text",
  })
  description?: string;

  @Field()
  @CreateDateColumn()
  createdAt!: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt!: Date;

  // Category - Product relationship (1-n)
  @Field((_type) => Categories)
  @ManyToOne((_type) => Categories, (category: Categories) => category.id)
  @JoinColumn({ name: "categoryId" })
  public category: Categories;

  @RelationId((c: Product) => c.category)
  public categoryId!: number;

  // SubCategory - Product relationship (1-n)
  @Field((_type) => SubCategories, { nullable: true })
  @ManyToOne((_type) => SubCategories, (s: SubCategories) => s.id)
  @JoinColumn({ name: "subCategoryId" })
  public subCategory: SubCategories;

  @RelationId((c: Product) => c.subCategory)
  public subCategoryId?: number;
}
