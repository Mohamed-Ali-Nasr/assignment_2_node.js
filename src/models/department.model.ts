import fs from "fs";
import { IDepartment } from "../types";

const DATA_FILE_PATH = "src/data/department.json";

const readDataFile = (): IDepartment[] => {
  try {
    const data = fs.readFileSync(DATA_FILE_PATH, "utf8");
    return JSON.parse(data) as IDepartment[];
  } catch (error) {
    console.log(error);
    return [];
  }
};

const writeDataFile = (data: IDepartment[]) => {
  fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(data, null, 2), "utf8");
};

let departments = readDataFile();

export { departments, writeDataFile };
