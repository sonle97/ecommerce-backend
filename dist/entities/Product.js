"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const typeorm_1 = require("typeorm");
const type_graphql_1 = require("type-graphql");
const Categories_1 = require("./Categories");
const SubCategories_1 = require("./SubCategories");
let Product = class Product {
};
__decorate([
    type_graphql_1.Field(() => type_graphql_1.ID),
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Product.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Product.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Product.prototype, "createdAt", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], Product.prototype, "updatedAt", void 0);
__decorate([
    type_graphql_1.Field((_type) => Categories_1.Categories),
    typeorm_1.ManyToOne((_type) => Categories_1.Categories, (category) => category.id),
    typeorm_1.JoinColumn({ name: "categoryId" }),
    __metadata("design:type", Categories_1.Categories)
], Product.prototype, "category", void 0);
__decorate([
    typeorm_1.RelationId((c) => c.category),
    __metadata("design:type", Number)
], Product.prototype, "categoryId", void 0);
__decorate([
    type_graphql_1.Field((_type) => SubCategories_1.SubCategories, { nullable: true }),
    typeorm_1.ManyToOne((_type) => SubCategories_1.SubCategories, (s) => s.id),
    typeorm_1.JoinColumn({ name: "subCategoryId" }),
    __metadata("design:type", SubCategories_1.SubCategories)
], Product.prototype, "subCategory", void 0);
__decorate([
    typeorm_1.RelationId((c) => c.subCategory),
    __metadata("design:type", Number)
], Product.prototype, "subCategoryId", void 0);
Product = __decorate([
    typeorm_1.Entity(),
    type_graphql_1.ObjectType()
], Product);
exports.Product = Product;
//# sourceMappingURL=Product.js.map