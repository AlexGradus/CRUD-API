import http from "http";
import { generateId, isValidUUID } from "../utils/utils";
import { User } from "../interfaces/intefaces";
import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from "./data";

const app = http.createServer((req, res) => {

  const { method, url } = req;

  const sendErrorResponse = (statusCode: number, message: string) => {
    res.writeHead(statusCode, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message }));
  };

  if (!url) {
    sendErrorResponse(400, "Invalid URL");
    return;
  }

  if (method === "GET" && url === "/api/users") {
    try {
      const allUsers = getUsers();
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(allUsers));
    } catch (err) {
      sendErrorResponse(500, "Internal server error");
    }
  } else if (method === "GET" && url.startsWith("/api/users/")) {
    const userId = url.split("/")[3];
    if (!isValidUUID(userId)) {
      sendErrorResponse(400, "Invalid userId");
      return;
    }

    const user = getUserById(userId);
    if (!user) {
      sendErrorResponse(404, "User not found");
      return;
    }

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(user));
  } else if (method === "POST" && url === "/api/users") {
    let body: Buffer[] = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    }).on("end", () => {
      const requestBody = Buffer.concat(body).toString();
      const { username, age, hobbies } = JSON.parse(requestBody);

      if (!username || !age) {
        sendErrorResponse(400, "Missing required fields");
        return;
      }

      const newUser: User = {
        username,
        age,
        hobbies: hobbies || [],
        id: generateId(),
      };

      const createdUser = createUser(newUser);

      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify(createdUser));
    });
  } else if (method === "PUT" && url.startsWith("/api/users/")) {
    const userId = url.split("/")[3];
    if (!isValidUUID(userId)) {
      sendErrorResponse(400, "Invalid userId");
      return;
    }

    let body: Buffer[] = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    }).on("end", () => {
      const requestBody = Buffer.concat(body).toString();
      const { username, age, hobbies } = JSON.parse(requestBody);

      if (!username || !age) {
        sendErrorResponse(400, "Missing required fields");
        return;
      }

      const updatedUser = updateUser(userId, {
        username,
        age,
        hobbies,
        id: userId,
      });

      if (!updatedUser) {
        sendErrorResponse(404, "User not found");
        return;
      }

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(updatedUser));
    });
  } else if (method === "DELETE" && url.startsWith("/api/users/")) {
    const userId = url.split("/")[3];
    if (!isValidUUID(userId)) {
      sendErrorResponse(400, "Invalid userId");
      return;
    }

    const deleted = deleteUser(userId);
    if (!deleted) {
      sendErrorResponse(404, "User not found");
      return;
    }

    res.writeHead(204);
    res.end();
  } else {
    sendErrorResponse(404, "Not found");
  }
});

export default app;
