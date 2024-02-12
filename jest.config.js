"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    testEnvironment: "node",
    moduleFileExtensions: ["ts", "tsx", "js"],
    transform: {
        "^.+\\.tsx?$": "ts-jest",
    },
    testMatch: ["**/test/test.(ts|tsx|js)"],
    collectCoverage: true,
};
exports.default = config;
