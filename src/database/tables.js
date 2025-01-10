import createDB from "../database/config.js";

const createTable = async () => {
  const db = await createDB();
  db.run(`CREATE TABLE IF NOT EXISTS facul (
          facul_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
          name VARCHAR(255) NOT NULL,
          ranking INTEGER NOT NULL,
          link varchar(255)
      )`);
  db.run(`CREATE TABLE IF NOT EXISTS course (
          course_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
          facul_id INTEGER NOT NUll,
          name VARCHAR(255) NOT NULL,
          duration FLOAT,
          period VARCHAR(25)
      );`);
};

const addingFacul = async (name, ranking, link = null) => {
  const db = await createDB();
  const registers = await db.get(`SELECT * FROM facul where name = ?`, [name]);
  if (registers) return;

  db.run("INSERT INTO facul (name, ranking, link) VALUES (?,?,?)", [
    name,
    ranking,
    link,
  ]);
};

const addingCourse = async (facul_id, name, duration, period) => {

  const db = await createDB();
  const registers = await db.get(`SELECT * FROM course WHERE name = ? and facul_id = ?`, [name, facul_id]);
  if (registers) return;

  db.run(
    "INSERT INTO course (facul_id, name, duration, period) VALUES (?,?,?,?)",
    [facul_id, name, duration, period]
  );
};

const getFacul = async (name = null) => {
  const db = await createDB();
  if (name) {
    return await db.all("SELECT * FROM facul WHERE name = ?", [name]);
  }
  return await db.all("SELECT * FROM facul");
};

const getCourses = async (faculId = null) => {
  const db = await createDB();
  if (faculId) {
    const courses = await db.all("SELECT * FROM course WHERE facul_id = ?", [
      faculId,
    ]);

    return courses;
  }
  const courses = await db.all("SELECT * FROM course");
  return courses;
};

export { createTable, addingFacul, addingCourse, getFacul, getCourses };