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
exports.createupvoteLoader = void 0;
const UpVote_1 = require("../entities/UpVote");
const dataloader_1 = __importDefault(require("dataloader"));
exports.createupvoteLoader = () => new dataloader_1.default((keys) => __awaiter(void 0, void 0, void 0, function* () {
    const upvotes = yield UpVote_1.Upvote.findByIds(keys);
    const upvoteIdsToUpdoot = {};
    console.log(upvotes);
    upvotes.forEach((upvote) => {
        upvoteIdsToUpdoot[`${upvote.userId}|${upvote.postId}`] = upvote;
    });
    return keys.map((key) => upvoteIdsToUpdoot[`${key.userId}|${key.postId}`]);
}));
//# sourceMappingURL=createUpvoteLoader.js.map