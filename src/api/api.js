"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const utils_1 = require("../utils/utils");
const data_1 = require("./data");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get("/api/users", (req, res, next) => {
    try {
        const allUsers = (0, data_1.getUsers)();
        res.status(200).json(allUsers);
    }
    catch (err) {
        next(err);
    }
});
app.get("/api/users/:userId", (req, res, next) => {
    try {
        const { userId } = req.params;
        if (!(0, utils_1.isValidUUID)(userId)) {
            res.status(400).json({ message: "Invalid userId" });
            return;
        }
        const user = (0, data_1.getUserById)(userId);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.status(200).json(user);
    }
    catch (err) {
        next(err);
    }
});
app.post("/api/users", (req, res, next) => {
    try {
        const { username, age, hobbies } = req.body;
        if (!username || !age) {
            res.status(400).json({ message: "Missing required fields" });
            return;
        }
        const newUser = {
            username,
            age,
            hobbies: hobbies || [],
            id: (0, utils_1.generateId)(),
        };
        const createdUser = (0, data_1.createUser)(newUser);
        res.status(201).json(createdUser);
    }
    catch (err) {
        next(err);
    }
});
app.put("/api/users/:userId", (req, res, next) => {
    try {
        const { userId } = req.params;
        if (!(0, utils_1.isValidUUID)(userId)) {
            res.status(400).json({ message: "Invalid userId" });
            return;
        }
        const { username, age, hobbies } = req.body;
        if (!username || !age) {
            res.status(400).json({ message: "Missing required fields" });
            return;
        }
        const updatedUser = (0, data_1.updateUser)(userId, {
            username,
            age,
            hobbies,
            id: userId, // Исправлено
        });
        if (!updatedUser) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.status(200).json(updatedUser);
    }
    catch (err) {
        next(err);
    }
});
app.delete("/api/users/:userId", (req, res, next) => {
    try {
        const { userId } = req.params;
        if (!(0, utils_1.isValidUUID)(userId)) {
            res.status(400).json({ message: "Invalid userId" });
            return;
        }
        const deleted = (0, data_1.deleteUser)(userId);
        if (!deleted) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.status(204).send();
    }
    catch (err) {
        next(err);
    }
});
app.use((req, res, next) => {
    res.status(404).json({ message: "Not found" });
});
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
});
exports.default = app;
