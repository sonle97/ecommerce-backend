"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const upload_images_1 = require("./upload-images");
const index = express_1.default.Router();
index.post("/upload-images", ...upload_images_1.UploadThubmnailImage);
exports.default = index;
//# sourceMappingURL=index.js.map