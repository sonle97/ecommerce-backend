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
exports.CreateProduct = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const apollo_server_express_1 = require("apollo-server-express");
const Product_1 = require("../../entities/Product");
const ProductRepository_1 = require("../../repositories/ProductRepository");
const CategoryRepository_1 = require("../../repositories/CategoryRepository");
const CreateProductInput_1 = require("../../inputs/Product/CreateProductInput");
const IsLoggedIn_1 = require("../../middleware/IsLoggedIn");
let CreateProduct = class CreateProduct {
    constructor(productRepository, categoryRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }
    createProduct(dataInput) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield this.categoryRepository.findOne(dataInput.categoryId);
            if (!category) {
                throw new apollo_server_express_1.ApolloError("Category is not found");
            }
            const product = this.productRepository.create(Object.assign(Object.assign({}, dataInput), { category: category }));
            return this.productRepository.save(product);
        });
    }
};
__decorate([
    type_graphql_1.UseMiddleware(IsLoggedIn_1.IsLoggedIn),
    type_graphql_1.Mutation(() => Product_1.Product),
    __param(0, type_graphql_1.Arg("data")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateProductInput_1.CreateProductInput]),
    __metadata("design:returntype", Promise)
], CreateProduct.prototype, "createProduct", null);
CreateProduct = __decorate([
    type_graphql_1.Resolver((_type) => Product_1.Product),
    __param(0, typeorm_typedi_extensions_1.InjectRepository(Product_1.Product)),
    __param(1, typeorm_typedi_extensions_1.InjectRepository(CategoryRepository_1.CategoryRepository)),
    __metadata("design:paramtypes", [ProductRepository_1.ProductRepository,
        CategoryRepository_1.CategoryRepository])
], CreateProduct);
exports.CreateProduct = CreateProduct;
//# sourceMappingURL=CreateProduct.js.map