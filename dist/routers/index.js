"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const login_1 = __importDefault(require("./auth/login"));
const ident_1 = __importDefault(require("./auth/ident"));
const login_2 = __importDefault(require("./client/login"));
router.use('/api', ident_1.default);
router.use('/internal', login_1.default);
router.use('/internal', login_2.default);
exports.default = router;
