"use strict";
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
exports.createConfirmationUrl = void 0;
const redis_1 = require("../redis");
exports.createConfirmationUrl = (userId, typeRedis, token) => __awaiter(void 0, void 0, void 0, function* () {
    yield redis_1.redis.set(typeRedis + token, userId, "ex", 60 * 60 * 24);
    return `http://localhost:3000/user/${typeRedis}?token=${token}`;
});
//# sourceMappingURL=createConfirmationUrl.js.map