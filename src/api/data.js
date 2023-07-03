"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUserById = exports.getUsers = exports.createUser = exports.users = void 0;
const utils_1 = require("../utils/utils");
exports.users = [];
function createUser(user) {
    const newUser = Object.assign(Object.assign({}, user), { id: (0, utils_1.generateId)() });
    exports.users.push(newUser);
    return newUser;
}
exports.createUser = createUser;
function getUsers() {
    return exports.users;
}
exports.getUsers = getUsers;
function getUserById(userId) {
    return exports.users.find((user) => user.id === userId);
}
exports.getUserById = getUserById;
function updateUser(userId, updatedUser) {
    const userIndex = exports.users.findIndex((user) => user.id === userId);
    if (userIndex !== -1) {
        const updated = Object.assign(Object.assign({}, exports.users[userIndex]), updatedUser);
        exports.users[userIndex] = updated;
        return updated;
    }
    return undefined;
}
exports.updateUser = updateUser;
function deleteUser(userId) {
    const userIndex = exports.users.findIndex((user) => user.id === userId);
    if (userIndex !== -1) {
        exports.users.splice(userIndex, 1);
        return true;
    }
    return false;
}
exports.deleteUser = deleteUser;
