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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCategory = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const Categories_1 = require("../../entities/Categories");
const UpdatecategoryInput_1 = require("../../inputs/Categories/UpdatecategoryInput");
const CategoryRepository_1 = require("../../repositories/CategoryRepository");
const IsLoggedIn_1 = require("../../middleware/IsLoggedIn");
let UpdateCategory = class UpdateCategory {
    constructor(categoryRepository) {
        this.categoryRepository = categoryRepository;
    }
    updateCategory(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield this.categoryRepository
                .createQueryBuilder()
                .where("id = :id", {
                id: id,
            })
                .getOne();
            if (!category) {
                throw new Error("Category is not found");
            }
            this.categoryRepository.merge(category, data);
            return yield this.categoryRepository.save(category);
        });
    }
};
__decorate([
    type_graphql_1.UseMiddleware(IsLoggedIn_1.IsLoggedIn),
    type_graphql_1.Mutation(() => Categories_1.Categories),
    __param(0, type_graphql_1.Arg("id")),
    __param(1, type_graphql_1.Arg("data")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, UpdatecategoryInput_1.UpdateCategoryInput]),
    __metadata("design:returntype", Promise)
], UpdateCategory.prototype, "updateCategory", null);
UpdateCategory = __decorate([
    type_graphql_1.Resolver((_type) => Categories_1.Categories),
    __param(0, typeorm_typedi_extensions_1.InjectRepository(Categories_1.Categories)),
    __metadata("design:paramtypes", [CategoryRepository_1.CategoryRepository])
], UpdateCategory);
exports.UpdateCategory = UpdateCategory;
//# sourceMappingURL=UpdateCategory.js.map