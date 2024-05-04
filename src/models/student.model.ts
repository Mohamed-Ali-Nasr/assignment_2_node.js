import fs from "fs";
import { IStudent } from "../types";

const DATA_FILE_PATH = "src/data/student.json";

const readDataFile = (): IStudent[] => {
  try {
    const data = fs.readFileSync(DATA_FILE_PATH, "utf8");
    return JSON.parse(data) as IStudent[];
  } catch (error) {
    console.log(error);
    return [];
  }
};

const writeDataFile = (data: IStudent[]) => {
  fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(data, null, 2), "utf8");
};

let students = readDataFile();

export { students, writeDataFile };
