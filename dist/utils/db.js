"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = __importDefault(require("knex"));
const db = (0, knex_1.default)({
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'oauth',
        database: 'oauth'
    }
});
exports.default = db;
