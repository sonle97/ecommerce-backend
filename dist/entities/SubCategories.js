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
exports.SubCategories = void 0;
const typeorm_1 = require("typeorm");
const type_graphql_1 = require("type-graphql");
const Categories_1 = require("./Categories");
let SubCategories = class SubCategories {
};
__decorate([
    type_graphql_1.Field(() => type_graphql_1.ID),
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], SubCategories.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.Column(),
    __metadata("design:type", String)
], SubCategories.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.Column(),
    __metadata("design:type", String)
], SubCategories.prototype, "slug", void 0);
__decorate([
    type_graphql_1.Field((_type) => Categories_1.Categories),
    typeorm_1.ManyToOne((_type) => Categories_1.Categories, (c) => c.id),
    typeorm_1.JoinColumn({ name: "categoryId" }),
    __metadata("design:type", Categories_1.Categories)
], SubCategories.prototype, "category", void 0);
__decorate([
    typeorm_1.RelationId((s) => s.category),
    __metadata("design:type", Number)
], SubCategories.prototype, "categoryId", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], SubCategories.prototype, "createdAt", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], SubCategories.prototype, "updatedAt", void 0);
SubCategories = __decorate([
    typeorm_1.Entity(),
    type_graphql_1.ObjectType()
], SubCategories);
exports.SubCategories = SubCategories;
//# sourceMappingURL=SubCategories.js.map