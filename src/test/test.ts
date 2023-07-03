import request from "supertest";
import app from "../api/api";
import { createUser, getUserById, getUsers } from "../api/data";


beforeAll(() => {

  createUser({
    id: "59eca481-c022-4968-b4f1-1c43b508a16b", username: "user1", age: 20,
    hobbies: []
  });
  createUser({
    id: "59eca481-c022-4968-b4f1-1c43b508a16s", username: "user2", age: 35,
    hobbies: []
  });

});

describe("API Routes", () => {
  describe("GET /api/users", () => {
    it("should return all users", async () => {
      const response = await request(app).get("/api/users");
      expect(response.status).toBe(200);
      expect(response.body).toEqual(getUsers());
    });
  });

  describe("GET /api/users/:userId", () => {
    it("should return a user if valid userId is provided", async () => {
      const users = getUsers();
      const userId = users[0].id;

      const response = await request(app).get(`/api/users/${userId}`);
      expect(response.status).toBe(200);
      expect(response.body).toEqual(getUserById(userId));
    });

    it("should return 400 if invalid userId is provided", async () => {
      const response = await request(app).get(`/api/users/invalidId`);
      expect(response.status).toBe(400);
      expect(response.body).toEqual({ message: "Invalid userId" });
    });

    it("should return 404 if user is not found", async () => {
      const response = await request(app).get(`/api/users/nonExistingId`);
      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: "User not found" });
    });
  });

  describe("PUT /api/users/:userId", () => {
    it("should update a user if valid userId and data are provided", async () => {
      const users = getUsers();
      const userId = users[0].id;

      const updatedUser = {
        username: "NewName",
        age: 30,
        hobbies: ["swimming"],
      };

      const response = await request(app)
        .put(`/api/users/${userId}`)
        .send(updatedUser);
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        ...getUserById(userId),
        ...updatedUser,
      });
    });

    it("should return 400 if invalid userId is provided", async () => {
      const response = await request(app)
        .put(`/api/users/invalidId`)
        .send({ username: "NewName", age: 30 });
      expect(response.status).toBe(400);
      expect(response.body).toEqual({ message: "Invalid userId" });
    });

    it("should return 400 if required fields are missing", async () => {
      const users = getUsers();
      const userId = users[0].id;

      const invalidUser = {
        username: "NewName",
      };

      const response = await request(app)
        .put(`/api/users/${userId}`)
        .send(invalidUser);
      expect(response.status).toBe(400);
      expect(response.body).toEqual({ message: "Missing required fields" });
    });

    it("should return 404 if user is not found", async () => {
      const response = await request(app)
        .put(`/api/users/nonExistingId`)
        .send({ username: "NewName", age: 30 });
      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: "User not found" });
    });
  });

  describe("DELETE /api/users/:userId", () => {
    it("should delete a user if valid userId is provided", async () => {
      const users = getUsers();
      const userId = users[0].id;

      const response = await request(app).delete(`/api/users/${userId}`);
      expect(response.status).toBe(204);
      expect(getUserById(userId)).toBeNull();
    });

    it("should return 400 if invalid userId is provided", async () => {
      const response = await request(app).delete(`/api/users/invalidId`);
      expect(response.status).toBe(400);
      expect(response.body).toEqual({ message: "Invalid userId" });
    });

    it("should return 404 if user is not found", async () => {
      const response = await request(app).delete(`/api/users/nonExistingId`);
      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: "User not found" });
    });
  });
});
