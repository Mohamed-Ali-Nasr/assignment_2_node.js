import { IncomingMessage, ServerResponse } from "http";
import {
  createDepartment,
  deleteDepartment,
  getAllDepartments,
  getDepartmentById,
  updateDepartment,
} from "../controllers/department.controller";

// Route handling for Departments
export const departmentsRoutes = (
  req: IncomingMessage,
  res: ServerResponse
) => {
  const { method, url } = req;

  // Handle GET request to retrieve all Departments
  if (method === "GET" && url === "/api/departments") {
    getAllDepartments(req, res);
  }
  // POST request to create a new Department
  else if (method === "POST" && url === "/api/departments") {
    createDepartment(req, res);
  }
  // GET a single Department
  else if (
    method === "GET" &&
    url &&
    url.match(/\/api\/departments\/([\w-]+)/)
  ) {
    const [, departmentId] = url.match(/\/api\/departments\/([\w-]+)/) || [];
    getDepartmentById(req, res, departmentId);
  }
  // Update a Department
  else if (
    method === "PUT" &&
    url &&
    url.match(/\/api\/departments\/([\w-]+)/)
  ) {
    const [, departmentId] = url.match(/\/api\/departments\/([\w-]+)/) || [];
    updateDepartment(req, res, departmentId);
  }
  // Create DELETE request to delete Department by ID
  else if (
    method === "DELETE" &&
    url &&
    url.match(/\/api\/departments\/([\w-]+)/)
  ) {
    const [, departmentId] = url.match(/\/api\/departments\/([\w-]+)/) || [];
    deleteDepartment(req, res, departmentId);
  }
  // Handle (Fallback) unmatched routes with a 404 Not Found response
  else {
    res.writeHead(404, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ message: "Not Found" }));
  }
};
