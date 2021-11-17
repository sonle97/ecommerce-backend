"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    port: process.env.PORT || 4000,
    cors: {
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
        credentials: true,
        origin: ["http://localhost:3000"],
    },
};
//# sourceMappingURL=config.js.map