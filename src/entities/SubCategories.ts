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

@Entity()
@ObjectType()
export class SubCategories {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column()
  name: string;

  @Field(() => String)
  @Column()
  slug: string;

  @Field((_type) => Categories)
  @ManyToOne((_type) => Categories, (c: Categories) => c.id)
  @JoinColumn({ name: "categoryId" })
  public category: Categories;

  @RelationId((s: SubCategories) => s.category)
  public categoryId!: number;

  @Field()
  @CreateDateColumn()
  createdAt!: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt!: Date;
}
