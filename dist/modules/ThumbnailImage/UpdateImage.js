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
exports.UpdateThumbnailImage = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const apollo_server_express_1 = require("apollo-server-express");
const ProductImages_1 = require("../../entities/ProductImages");
const ThumbnailImageRepository_1 = require("../../repositories/ThumbnailImageRepository");
const IsLoggedIn_1 = require("../../middleware/IsLoggedIn");
let UpdateThumbnailImage = class UpdateThumbnailImage {
    constructor(thumbnailImageRepository) {
        this.thumbnailImageRepository = thumbnailImageRepository;
    }
    updateThumbnailImage(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const image = yield this.thumbnailImageRepository.findOne(id);
            if (!image) {
                throw new apollo_server_express_1.ApolloError("Image is not found");
            }
            return yield this.thumbnailImageRepository.save(image);
        });
    }
};
__decorate([
    type_graphql_1.UseMiddleware(IsLoggedIn_1.IsLoggedIn),
    type_graphql_1.Mutation(() => ProductImages_1.ProductImages),
    __param(0, type_graphql_1.Arg("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UpdateThumbnailImage.prototype, "updateThumbnailImage", null);
UpdateThumbnailImage = __decorate([
    type_graphql_1.Resolver((_type) => ProductImages_1.ProductImages),
    __param(0, typeorm_typedi_extensions_1.InjectRepository(ThumbnailImageRepository_1.ThumbnailImageRepository)),
    __metadata("design:paramtypes", [ThumbnailImageRepository_1.ThumbnailImageRepository])
], UpdateThumbnailImage);
exports.UpdateThumbnailImage = UpdateThumbnailImage;
//# sourceMappingURL=UpdateImage.js.map