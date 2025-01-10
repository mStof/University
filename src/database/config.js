import path, { dirname } from "path";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const createDB = async () => {
  return await open({
    filename: path.resolve(__dirname, "./faculList.db"),
    driver: sqlite3.Database,
  });
};

export default createDB;
