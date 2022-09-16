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
const fs_1 = require("fs");
const path_1 = require("path");
class FileService {
    isExist(path) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield fs_1.promises.stat(path);
                return true;
            }
            catch (_a) {
                return false;
            }
        });
    }
    getFilePath(path, name, ext) {
        if (!path_1.isAbsolute(path)) {
            path = path_1.join(__dirname + '/' + path);
        }
        return path_1.join(path_1.dirname(path) + '/' + name + '.' + ext);
    }
    deleteFileExists(path) {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield this.isExist(path)) {
                fs_1.promises.unlink(path);
            }
        });
    }
}
exports.FileService = FileService;
