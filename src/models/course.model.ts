import fs from "fs";
import { ICourses } from "../types";

const DATA_FILE_PATH = "src/data/courses.json";

const readDataFile = (): ICourses[] => {
  try {
    const data = fs.readFileSync(DATA_FILE_PATH, "utf8");
    return JSON.parse(data) as ICourses[];
  } catch (error) {
    console.log(error);
    return [];
  }
};

const writeDataFile = (data: ICourses[]) => {
  fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(data, null, 2), "utf8");
};

let courses = readDataFile();

export { courses, writeDataFile };
