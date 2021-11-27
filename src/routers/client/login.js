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
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("../../utils/db"));
const jsonwebtoken_1 = require("jsonwebtoken");
const redis_1 = __importDefault(require("../../utils/redis"));
const router = express_1.default.Router();
router.post('/check', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, state, redirect_uri, responsetype } = req.body;
    const token = req.headers.authorization;
    if (!id) {
        return res.status(400).json({
            error: 'invalid_request',
            error_description: 'id is required'
        });
    }
    if (!redirect_uri) {
        return res.status(400).json({
            error: 'invalid_request',
            error_description: 'redirect_uri is required'
        });
    }
    if (!responsetype) {
        return res.status(400).json({
            error: 'invalid_request',
            error_description: 'responsetype is required'
        });
    }
    if (responsetype !== 'code') {
        return res.status(400).json({
            error: 'invalid_request',
            error_description: 'responsetype must be code'
        });
    }
    if (!token) {
        return res.status(405).json({
            error: 'invalid_request',
            error_description: 'token is required'
        });
    }
    try {
        const decoded = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRE);
        const user = yield (0, db_1.default)('users').where({ user_ident: decoded.id }).first();
        const app = yield (0, db_1.default)('applications').where({ app_id: id }).first();
        if (!app) {
            return res.status(404).json({
                error: 'invalid_request',
                error_description: 'app is not found'
            });
        }
        const code = ranStr(16);
        const payload = {
            userid: user.user_ident,
            redirecturi: redirect_uri
        };
        yield redis_1.default.set(code, JSON.stringify(payload), {
            EX: 1000 * 60
        });
        const states = state
            ? '&state=' + state
            : '&state=';
        return res.status(200).json({
            message: 'success',
            redirect: app.app_redirect + "?code=" + code + states
        });
    }
    catch (e) {
        return res.status(500).json({
            error: 'server_error',
            error_description: 'server error'
        });
    }
}));
function ranStr(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
exports.default = router;
