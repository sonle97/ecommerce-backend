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
import { Product } from "./Product";

@Entity()
@ObjectType()
export class ProductImages {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @Column()
  imageURL: string;

  @Field()
  @CreateDateColumn()
  createdAt!: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt!: Date;

  @Field((_type) => Product)
  @ManyToOne((_type) => Product, (p: Product) => p.id)
  @JoinColumn({ name: "productId" })
  public product: Product;

  @RelationId((t: ProductImages) => t.product)
  public productId!: number;
}
