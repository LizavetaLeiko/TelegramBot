"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.skipMiddleware = void 0;
const _constants_1 = require("../constants/index");
const skipMiddleware = (ctx, next) => {
    var _a;
    const messageText = (_a = ctx.message) === null || _a === void 0 ? void 0 : _a.text;
    if (messageText === '/skip') {
        ctx.reply(_constants_1.messages.info.skipScene);
        return ctx.scene.leave();
    }
    return next();
};
exports.skipMiddleware = skipMiddleware;
