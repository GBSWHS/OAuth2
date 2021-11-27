"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const morgan_1 = __importDefault(require("morgan"));
const express_1 = __importDefault(require("express"));
const routers_1 = __importDefault(require("../routers"));
const http_1 = require("http");
class App {
    constructor({ port }) {
        this.app = (0, express_1.default)();
        this.server = (0, http_1.createServer)(this.app);
        this.port = 8080;
        this.port = port;
        this.initlizeMiddlewares();
        this.initlizeRouters();
    }
    initlizeMiddlewares() {
        this.app.use((0, morgan_1.default)('common'));
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
    }
    initlizeRouters() {
        this.app.use('/', routers_1.default);
    }
    listen() {
        this.server.listen(this.port, () => {
            console.info('Oauth2 backend server is now online, http://localhost:' + this.port);
        });
    }
}
exports.default = App;
