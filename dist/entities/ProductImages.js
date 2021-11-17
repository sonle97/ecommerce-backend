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
exports.ProductImages = void 0;
const typeorm_1 = require("typeorm");
const type_graphql_1 = require("type-graphql");
const Product_1 = require("./Product");
let ProductImages = class ProductImages {
};
__decorate([
    type_graphql_1.Field(() => type_graphql_1.ID),
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], ProductImages.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.Column(),
    __metadata("design:type", String)
], ProductImages.prototype, "imageURL", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], ProductImages.prototype, "createdAt", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], ProductImages.prototype, "updatedAt", void 0);
__decorate([
    type_graphql_1.Field((_type) => Product_1.Product),
    typeorm_1.ManyToOne((_type) => Product_1.Product, (p) => p.id),
    typeorm_1.JoinColumn({ name: "productId" }),
    __metadata("design:type", Product_1.Product)
], ProductImages.prototype, "product", void 0);
__decorate([
    typeorm_1.RelationId((t) => t.product),
    __metadata("design:type", Number)
], ProductImages.prototype, "productId", void 0);
ProductImages = __decorate([
    typeorm_1.Entity(),
    type_graphql_1.ObjectType()
], ProductImages);
exports.ProductImages = ProductImages;
//# sourceMappingURL=ProductImages.js.map