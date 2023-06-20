"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.skipMiddleware = void 0;
const skipMiddleware = (ctx, next) => {
    var _a;
    const messageText = (_a = ctx.message) === null || _a === void 0 ? void 0 : _a.text;
    if (messageText === '/skip') {
        ctx.reply('Ok, you can call another command');
        return ctx.scene.leave();
    }
    return next();
};
exports.skipMiddleware = skipMiddleware;
