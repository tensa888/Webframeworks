/**
 * File-based data store for development/testing.
 * Persists data to a JSON file instead of pure in-memory.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_FILE = path.join(__dirname, "..", "data", "store.json");

// Ensure data directory exists
const dataDir = path.dirname(DATA_FILE);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

class FileStore {
  constructor() {
    this.loadData();
  }

  loadData() {
    try {
      if (fs.existsSync(DATA_FILE)) {
        const data = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
        this.users = data.users || [];
        this.nextId = data.nextId || 1;
      } else {
        this.users = [];
        this.nextId = 1;
      }
    } catch (err) {
      console.error("Failed to load data from file:", err.message);
      this.users = [];
      this.nextId = 1;
    }
  }

  saveData() {
    try {
      fs.writeFileSync(
        DATA_FILE,
        JSON.stringify(
          {
            users: this.users,
            nextId: this.nextId,
          },
          null,
          2
        )
      );
    } catch (err) {
      console.error("Failed to save data to file:", err.message);
    }
  }

  // User operations
  findUserByEmail(email) {
    return this.users.find((u) => u.email === email);
  }

  createUser(userData) {
    const user = {
      _id: String(this.nextId++),
      ...userData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.users.push(user);
    this.saveData();
    return user;
  }

  getAllUsers() {
    return this.users;
  }

  clear() {
    this.users = [];
    this.nextId = 1;
    this.saveData();
  }
}

export default new FileStore();
