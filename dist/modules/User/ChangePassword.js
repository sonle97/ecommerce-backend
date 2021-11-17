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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangePassword = void 0;
const type_graphql_1 = require("type-graphql");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const apollo_server_express_1 = require("apollo-server-express");
const User_1 = require("../../entities/User");
const redis_1 = require("../../redis");
const redisPrefixes_1 = require("../../constants/redisPrefixes");
const ChangePasswordInput_1 = require("../../inputs/User/ChangePasswordInput");
const UserRepository_1 = require("../../repositories/UserRepository");
let ChangePassword = class ChangePassword {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    changePassword({ token, password }, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = yield redis_1.redis.get(redisPrefixes_1.forgotPasswordPrefix + token);
            if (!userId) {
                throw new apollo_server_express_1.ApolloError("Token does not exist", "NOT_FOUND");
            }
            const user = yield this.userRepository.findOne(userId);
            if (!user) {
                throw new apollo_server_express_1.ApolloError("User does not exist", "NOT_FOUND");
            }
            yield redis_1.redis.del(redisPrefixes_1.forgotPasswordPrefix + token);
            user.password = yield bcryptjs_1.default.hash(password, 12);
            user.resetPasswordToken = null;
            yield user.save();
            ctx.req.session.userId = user.id;
            return user;
        });
    }
};
__decorate([
    type_graphql_1.Mutation(() => User_1.User, { nullable: true }),
    __param(0, type_graphql_1.Arg("data")),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ChangePasswordInput_1.ChangePasswordInput, Object]),
    __metadata("design:returntype", Promise)
], ChangePassword.prototype, "changePassword", null);
ChangePassword = __decorate([
    type_graphql_1.Resolver((_type) => User_1.User),
    __param(0, typeorm_typedi_extensions_1.InjectRepository(User_1.User)),
    __metadata("design:paramtypes", [UserRepository_1.UserRepository])
], ChangePassword);
exports.ChangePassword = ChangePassword;
//# sourceMappingURL=ChangePassword.js.map