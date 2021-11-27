"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("redis");
const BASEURI = 'redis://localhost:6379';
const client = (0, redis_1.createClient)({ url: BASEURI });
client.connect();
exports.default = client;
