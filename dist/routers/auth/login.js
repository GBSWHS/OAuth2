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
const sha3_1 = require("sha3");
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("../../utils/db"));
const router = express_1.default.Router();
const jsonwebtoken_1 = require("jsonwebtoken");
const jwtPrivate = process.env.JWT_TOKEN || 'secret';
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, passwd } = req.body;
    if (!id || !passwd) {
        return res.status(400).send({
            error: 'invalid_request',
            error_description: 'id or passwd is empty'
        });
    }
    const user = yield (0, db_1.default)('users').where({ user_id: id }).first();
    if (!user)
        return res.status(400).send({
            error: 'invalid_request',
            error_description: 'id or passwd is invalid'
        });
    if (user.user_password !== hash(passwd + user.user_salt)) {
        return res.status(400).send({
            error: 'invalid_request',
            error_description: 'id or passwd is invalid'
        });
    }
    const token = (0, jsonwebtoken_1.sign)({ id: user.user_ident }, jwtPrivate, { expiresIn: '1h', algorithm: 'HS256' });
    res.send({
        success: true,
        token
    });
}));
function hash(text) {
    const hasher = new sha3_1.SHA3(512);
    hasher.update(text);
    return hasher.digest('hex');
}
exports.default = router;
