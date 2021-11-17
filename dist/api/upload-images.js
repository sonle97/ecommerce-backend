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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadThubmnailImage = void 0;
const { cloudinary } = require("../handlers/cloudinary");
const upload = require("../handlers/multer");
const ThumbnailImageRepository_1 = require("../repositories/ThumbnailImageRepository");
const typeorm_1 = require("typeorm");
const fs_1 = __importDefault(require("fs"));
const uploadImagesThumbnail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { files } = req;
    const { productId } = req.body;
    if (!files) {
        return res.status(400).send("Missing file");
    }
    try {
        let urls = [];
        let fileUpload = [];
        for (const file of files) {
            const { path } = file;
            const newPath = yield cloudinary.v2.uploader.upload(path, {
                resource_type: "auto",
                folder: `images/products`,
            });
            urls.push(newPath);
            fs_1.default.unlinkSync(path);
        }
        const thumbnaiImagelRepository = typeorm_1.getCustomRepository(ThumbnailImageRepository_1.ThumbnailImageRepository);
        urls.forEach((url) => {
            const image = thumbnaiImagelRepository.create({
                imageURL: url.secure_url,
                productId,
            });
            fileUpload.push(image);
        });
        yield thumbnaiImagelRepository.save(fileUpload);
        res.send({
            message: "Image is uploaded successfully",
            data: fileUpload,
        });
    }
    catch (err) {
        return res.status(400).send(err.message);
    }
});
exports.UploadThubmnailImage = [
    upload.array("image"),
    uploadImagesThumbnail,
];
//# sourceMappingURL=upload-images.js.map