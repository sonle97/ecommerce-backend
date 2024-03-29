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
exports.RegisterInput = void 0;
const class_validator_1 = require("class-validator");
const type_graphql_1 = require("type-graphql");
const isEmailAlreadyExist_1 = require("../../utils/isEmailAlreadyExist");
let RegisterInput = class RegisterInput {
};
__decorate([
    type_graphql_1.Field(),
    class_validator_1.Length(1, 255),
    __metadata("design:type", String)
], RegisterInput.prototype, "firstName", void 0);
__decorate([
    type_graphql_1.Field(),
    class_validator_1.Length(1, 255),
    __metadata("design:type", String)
], RegisterInput.prototype, "lastName", void 0);
__decorate([
    type_graphql_1.Field(),
    class_validator_1.IsEmail(),
    isEmailAlreadyExist_1.IsEmailAlreadyExist({ message: "Email $value already registered." }),
    __metadata("design:type", String)
], RegisterInput.prototype, "email", void 0);
__decorate([
    type_graphql_1.Field(),
    class_validator_1.MinLength(8, {
        message: "Password is too short.",
    }),
    __metadata("design:type", String)
], RegisterInput.prototype, "password", void 0);
RegisterInput = __decorate([
    type_graphql_1.InputType()
], RegisterInput);
exports.RegisterInput = RegisterInput;
//# sourceMappingURL=CreateUserInput.js.map