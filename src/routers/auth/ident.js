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
const redis_1 = __importDefault(require("../../utils/redis"));
const router = express_1.default.Router();
router.post('/ident', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code, client_id, client_secret, redirect_uri, grant_type } = req.body;
    if (!code) {
        return res.status(400).send({
            error: 'invalid_request',
            error_description: 'Missing code'
        });
    }
    if (!client_id) {
        return res.status(400).send({
            error: 'invalid_request',
            error_description: 'Missing client_id'
        });
    }
    if (!client_secret) {
        return res.status(400).send({
            error: 'invalid_request',
            error_description: 'Missing client_secret'
        });
    }
    if (!redirect_uri) {
        return res.status(400).send({
            error: 'invalid_request',
            error_description: 'Missing redirect_uri'
        });
    }
    if (grant_type !== 'authorization_code') {
        return res.status(400).send({
            error: 'invalid_request',
            error_description: 'Missing grant_type'
        });
    }
    const token = JSON.parse(yield redis_1.default.get(code));
    const exist = yield (0, db_1.default)('users').where({ user_ident: token.userid }).first();
    if (!exist) {
        return res.status(400).send({
            error: 'invalid_request',
            error_description: 'User not found'
        });
    }
    const user = exist.student_id
        ? yield (0, db_1.default)('users').where({ user_ident: token.userid })
            .leftJoin('students', 'users.student_id', 'students.student_id').first()
        : yield (0, db_1.default)('users').where({ user_ident: token.userid }).first();
    return res.status(200).json({
        success: true,
        user: {
            id: user.user_ident,
            sid: user.student_id,
            name: user.user_realname,
            gender: user.user_gender,
            nickname: user.user_nickname,
            email: user.user_email,
            student: {
                grade: user.student_grade,
                class: user.student_class,
                number: user.student_number,
                phone: user.student_phone,
                room: user.student_room
            }
        }
    });
}));
exports.default = router;
