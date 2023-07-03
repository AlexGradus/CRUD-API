"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidUUID = exports.generateId = void 0;
const uuid_1 = require("uuid");
function generateId() {
    return (0, uuid_1.v4)();
}
exports.generateId = generateId;
function isValidUUID(uuid) {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return uuidRegex.test(uuid);
}
exports.isValidUUID = isValidUUID;
