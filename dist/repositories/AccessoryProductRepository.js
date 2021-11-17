"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessoryProductRepository = void 0;
const lodash_1 = __importDefault(require("lodash"));
const typeorm_1 = require("typeorm");
const AccessoryProductRelation_1 = require("../entities/AccessoryProductRelation");
const ProductRepository_1 = require("../repositories/ProductRepository");
let AccessoryProductRepository = class AccessoryProductRepository extends typeorm_1.Repository {
    constructor() {
        super(...arguments);
        this.productRepository = typeorm_1.getCustomRepository(ProductRepository_1.ProductRepository);
    }
    createOrUpdateAccessoryProducts(accessory, newProductIds) {
        return __awaiter(this, void 0, void 0, function* () {
            const accessoryProductInstances = [];
            const addedAccessories = yield this.find({ where: { accessory } });
            const addedAccessoryIds = addedAccessories.map((a) => a.productId);
            const accessoryIdsToRemove = lodash_1.default.without(addedAccessoryIds, ...newProductIds);
            const accessoryIdsToAdd = lodash_1.default.without(newProductIds, ...addedAccessoryIds);
            if (accessoryIdsToAdd.length) {
                const products = yield this.productRepository.findByIds(accessoryIdsToAdd);
                products.forEach((product) => {
                    const newAccessoryProduct = this.create({
                        accessory,
                        product,
                    });
                    accessoryProductInstances.push(newAccessoryProduct);
                });
                if (accessoryProductInstances.length > 0) {
                    yield this.createQueryBuilder()
                        .insert()
                        .orIgnore(true)
                        .values(accessoryProductInstances)
                        .updateEntity(false)
                        .execute();
                }
            }
            if (accessoryIdsToRemove.length) {
                yield this.createQueryBuilder()
                    .delete()
                    .where("accessoryId = :accessoryId AND productId IN(:...productIds)", {
                    accessoryId: accessory.id,
                    productIds: accessoryIdsToRemove,
                })
                    .execute();
            }
        });
    }
};
AccessoryProductRepository = __decorate([
    typeorm_1.EntityRepository(AccessoryProductRelation_1.AccessoryProductRelation)
], AccessoryProductRepository);
exports.AccessoryProductRepository = AccessoryProductRepository;
//# sourceMappingURL=AccessoryProductRepository.js.map