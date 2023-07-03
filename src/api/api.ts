import express, { Request, Response, NextFunction } from "express";
import { generateId, isValidUUID } from "../utils/utils";
import { User } from "../interfaces/intefaces";
import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from "./data";

const app = express();
app.use(express.json());

app.get("/api/users", (req: Request, res: Response, next: NextFunction) => {
  try {
    const allUsers = getUsers();
    res.status(200).json(allUsers);
  } catch (err) {
    next(err);
  }
});

app.get(
  "/api/users/:userId",
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.params;

      if (!isValidUUID(userId)) {
        res.status(400).json({ message: "Invalid userId" });
        return;
      }

      const user = getUserById(userId);

      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }
);

app.post("/api/users", (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, age, hobbies } = req.body;

    if (!username || !age) {
      res.status(400).json({ message: "Missing required fields" });
      return;
    }

    const newUser: User = {
      username,
      age,
      hobbies: hobbies || [],
      id: generateId(),
    };

    const createdUser = createUser(newUser);

    res.status(201).json(createdUser);
  } catch (err) {
    next(err);
  }
});

app.put(
  "/api/users/:userId",
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.params;

      if (!isValidUUID(userId)) {
        res.status(400).json({ message: "Invalid userId" });
        return;
      }

      const { username, age, hobbies } = req.body;

      if (!username || !age) {
        res.status(400).json({ message: "Missing required fields" });
        return;
      }

      const updatedUser = updateUser(userId, {
        username,
        age,
        hobbies,
        id: "",
      });

      if (!updatedUser) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      res.status(200).json(updatedUser);
    } catch (err) {
      next(err);
    }
  }
);

app.delete(
  "/api/users/:userId",
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.params;

      if (!isValidUUID(userId)) {
        res.status(400).json({ message: "Invalid userId" });
        return;
      }

      const deleted = deleteUser(userId);

      if (!deleted) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).json({ message: "Internal server error" });
});

export default app;
