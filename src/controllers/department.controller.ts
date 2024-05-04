import { IncomingMessage, ServerResponse } from "http";
import { departments, writeDataFile } from "../models/department.model";

// GET ALL DEPARTMENTS HANDLER =>
export const getAllDepartments = (
  req: IncomingMessage,
  res: ServerResponse
) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(departments));
};

// GET DEPARTMENT BY ID HANDLER =>
export const getDepartmentById = (
  req: IncomingMessage,
  res: ServerResponse,
  departmentId: string | undefined
) => {
  if (departmentId) {
    const department = departments.find((ele) => ele.id === +departmentId);

    if (department) {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(department));
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Department not found" }));
    }
  } else {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Invalid request" }));
  }
};

// CREATE DEPARTMENT HANDLER =>
export const createDepartment = (req: IncomingMessage, res: ServerResponse) => {
  let data = "";
  req.on("data", (chunk) => {
    data += chunk;
  });

  req.on("end", () => {
    try {
      const { name } = JSON.parse(data);

      const newDepartment = {
        id: departments.length + 2,
        name,
      };
      departments.push(newDepartment);

      writeDataFile(departments);

      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify(newDepartment));
    } catch (error) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Invalid request body" }));
    }
  });
};

// UPDATE DEPARTMENT HANDLER =>
export const updateDepartment = (
  req: IncomingMessage,
  res: ServerResponse,
  departmentId: string | undefined
) => {
  if (departmentId) {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
    });

    req.on("end", () => {
      const { name } = JSON.parse(data);

      const index = departments.findIndex((ele) => ele.id === +departmentId);

      if (index !== -1) {
        departments[index] = { ...departments[index], name };

        writeDataFile(departments);

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(departments[index]));
      } else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Department not found" }));
      }
    });
  }
};

// DELETE DEPARTMENT HANDLER =>
export const deleteDepartment = (
  req: IncomingMessage,
  res: ServerResponse,
  departmentId: string | undefined
) => {
  if (departmentId) {
    const index = departments.findIndex((ele) => ele.id === +departmentId);

    if (index !== -1) {
      departments.splice(index, 1);
      writeDataFile(departments);

      res.writeHead(202, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          message: `A Department with ID ${departmentId} is deleted successfully`,
        })
      );
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Department not found" }));
    }
  }
};
