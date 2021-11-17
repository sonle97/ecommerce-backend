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
exports.Register = void 0;
const type_graphql_1 = require("type-graphql");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const apollo_server_express_1 = require("apollo-server-express");
const uuid_1 = require("uuid");
const User_1 = require("../../entities/User");
const CreateUserInput_1 = require("../../inputs/User/CreateUserInput");
const UserRepository_1 = require("../../repositories/UserRepository");
const sendEmail_1 = require("../../utils/sendEmail");
const createConfirmationUrl_1 = require("../../utils/createConfirmationUrl");
const redisPrefixes_1 = require("../../constants/redisPrefixes");
let Register = class Register {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    register(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingUser = yield this.userRepository.findOne({
                email: data.email,
            });
            if (existingUser) {
                throw new apollo_server_express_1.ApolloError(`Email ${data.email} already registered.`, "BAD_REQUEST");
            }
            const hashedPassword = yield bcryptjs_1.default.hash(data.password, 12);
            const token = uuid_1.v4();
            const user = yield this.userRepository
                .create(Object.assign(Object.assign({}, data), { password: hashedPassword, isRegistered: true, inviteToken: token }))
                .save();
            yield sendEmail_1.sendEmail(data.email, yield createConfirmationUrl_1.createConfirmationUrl(user.id, redisPrefixes_1.confirmUserPrefix, token));
            return user;
        });
    }
};
__decorate([
    type_graphql_1.Mutation(() => User_1.User),
    __param(0, type_graphql_1.Arg("data")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateUserInput_1.RegisterInput]),
    __metadata("design:returntype", Promise)
], Register.prototype, "register", null);
Register = __decorate([
    type_graphql_1.Resolver((_type) => User_1.User),
    __param(0, typeorm_typedi_extensions_1.InjectRepository(User_1.User)),
    __metadata("design:paramtypes", [UserRepository_1.UserRepository])
], Register);
exports.Register = Register;
//# sourceMappingURL=Register.js.map