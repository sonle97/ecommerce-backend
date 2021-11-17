import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { ObjectType, Field, ID, Root } from "type-graphql";

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column()
  firstName: string;

  @Field(() => String)
  @Column()
  lastName: string;

  @Field(() => String)
  name(@Root() parent: User): string {
    return `${parent.firstName} ${parent.lastName}`;
  }

  @Field(() => String)
  @Column({
    type: "varchar",
    length: "100",
    comment: "Manager email address",
    unique: true,
  })
  email: string;

  @Field(() => String)
  @Column()
  password: string;

  @Field(() => Boolean)
  @Column({ default: false })
  isRegistered!: boolean;

  @Field()
  @CreateDateColumn()
  createdAt!: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt!: Date;

  @Field()
  @Column("bool", { default: false })
  confirmed: boolean;

  @Field((_type) => String, { nullable: true })
  @Column({
    type: "varchar",
    unique: true,
    nullable: true,
  })
  public inviteToken?: string | null;

  @Field((_type) => String, { nullable: true })
  @Column({
    type: "varchar",
    nullable: true,
  })
  public resetPasswordToken?: string | null;
}
