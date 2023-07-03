import { User } from "../interfaces/intefaces";
import { generateId } from "../utils/utils";

export const users: User[] = [];

export function createUser(user: User): User {
  const newUser = { ...user, id: generateId() };
  users.push(newUser);
  return newUser;
}

export function getUsers(): User[] {
  return users;
}

export function getUserById(userId: string): User | undefined {
  return users.find((user) => user.id === userId);
}

export function updateUser(
  userId: string,
  updatedUser: User
): User | undefined {
  const userIndex = users.findIndex((user) => user.id === userId);
  if (userIndex !== -1) {
    const updated = { ...users[userIndex], ...updatedUser };
    users[userIndex] = updated;
    return updated;
  }
  return undefined;
}

export function deleteUser(userId: string): boolean {
  const userIndex = users.findIndex((user) => user.id === userId);
  if (userIndex !== -1) {
    users.splice(userIndex, 1);
    return true;
  }
  return false;
}
