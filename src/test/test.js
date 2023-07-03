"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const api_1 = __importDefault(require("../api/api"));
const data_1 = require("../api/data");
beforeAll(() => {
    (0, data_1.createUser)({
        id: "59eca481-c022-4968-b4f1-1c43b508a16b", username: "user1", age: 20,
        hobbies: []
    });
    (0, data_1.createUser)({
        id: "59eca481-c022-4968-b4f1-1c43b508a16s", username: "user2", age: 35,
        hobbies: []
    });
});
describe("API Routes", () => {
    describe("GET /api/users", () => {
        it("should return all users", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(api_1.default).get("/api/users");
            expect(response.status).toBe(200);
            expect(response.body).toEqual((0, data_1.getUsers)());
        }));
    });
    describe("GET /api/users/:userId", () => {
        it("should return a user if valid userId is provided", () => __awaiter(void 0, void 0, void 0, function* () {
            const users = (0, data_1.getUsers)();
            const userId = users[0].id;
            const response = yield (0, supertest_1.default)(api_1.default).get(`/api/users/${userId}`);
            expect(response.status).toBe(200);
            expect(response.body).toEqual((0, data_1.getUserById)(userId));
        }));
        it("should return 400 if invalid userId is provided", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(api_1.default).get(`/api/users/invalidId`);
            expect(response.status).toBe(400);
            expect(response.body).toEqual({ message: "Invalid userId" });
        }));
        it("should return 404 if user is not found", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(api_1.default).get(`/api/users/nonExistingId`);
            expect(response.status).toBe(404);
            expect(response.body).toEqual({ message: "User not found" });
        }));
    });
    describe("PUT /api/users/:userId", () => {
        it("should update a user if valid userId and data are provided", () => __awaiter(void 0, void 0, void 0, function* () {
            const users = (0, data_1.getUsers)();
            const userId = users[0].id;
            const updatedUser = {
                username: "NewName",
                age: 30,
                hobbies: ["swimming"],
            };
            const response = yield (0, supertest_1.default)(api_1.default)
                .put(`/api/users/${userId}`)
                .send(updatedUser);
            expect(response.status).toBe(200);
            expect(response.body).toEqual(Object.assign(Object.assign({}, (0, data_1.getUserById)(userId)), updatedUser));
        }));
        it("should return 400 if invalid userId is provided", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(api_1.default)
                .put(`/api/users/invalidId`)
                .send({ username: "NewName", age: 30 });
            expect(response.status).toBe(400);
            expect(response.body).toEqual({ message: "Invalid userId" });
        }));
        it("should return 400 if required fields are missing", () => __awaiter(void 0, void 0, void 0, function* () {
            const users = (0, data_1.getUsers)();
            const userId = users[0].id;
            const invalidUser = {
                username: "NewName",
            };
            const response = yield (0, supertest_1.default)(api_1.default)
                .put(`/api/users/${userId}`)
                .send(invalidUser);
            expect(response.status).toBe(400);
            expect(response.body).toEqual({ message: "Missing required fields" });
        }));
        it("should return 404 if user is not found", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(api_1.default)
                .put(`/api/users/nonExistingId`)
                .send({ username: "NewName", age: 30 });
            expect(response.status).toBe(404);
            expect(response.body).toEqual({ message: "User not found" });
        }));
    });
    describe("DELETE /api/users/:userId", () => {
        it("should delete a user if valid userId is provided", () => __awaiter(void 0, void 0, void 0, function* () {
            const users = (0, data_1.getUsers)();
            const userId = users[0].id;
            const response = yield (0, supertest_1.default)(api_1.default).delete(`/api/users/${userId}`);
            expect(response.status).toBe(204);
            expect((0, data_1.getUserById)(userId)).toBeNull();
        }));
        it("should return 400 if invalid userId is provided", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(api_1.default).delete(`/api/users/invalidId`);
            expect(response.status).toBe(400);
            expect(response.body).toEqual({ message: "Invalid userId" });
        }));
        it("should return 404 if user is not found", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(api_1.default).delete(`/api/users/nonExistingId`);
            expect(response.status).toBe(404);
            expect(response.body).toEqual({ message: "User not found" });
        }));
    });
});
