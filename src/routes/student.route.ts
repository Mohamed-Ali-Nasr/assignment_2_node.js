import { IncomingMessage, ServerResponse } from "http";
import {
  createStudent,
  deleteStudent,
  getAll,
  getAllStudents,
  getStudentById,
  updateStudent,
} from "../controllers/student.controller";

// Route handling for Students
export const studentRoutes = (req: IncomingMessage, res: ServerResponse) => {
  const { method, url } = req;

  // Handle GET request to retrieve all Students
  if (method === "GET" && url === "/api/students") {
    getAllStudents(req, res);
  }
  // POST request to create a new Student
  else if (method === "POST" && url === "/api/students") {
    createStudent(req, res);
  }
  // GET a single Student
  else if (method === "GET" && url && url.match(/\/api\/students\/([\w-]+)/)) {
    const [, studentId] = url.match(/\/api\/students\/([\w-]+)/) || [];
    getStudentById(req, res, studentId);
  }
  // Update a Student
  else if (method === "PUT" && url && url.match(/\/api\/students\/([\w-]+)/)) {
    const [, studentId] = url.match(/\/api\/students\/([\w-]+)/) || [];
    updateStudent(req, res, studentId);
  }
  // Create DELETE request to delete Student by ID
  else if (
    method === "DELETE" &&
    url &&
    url.match(/\/api\/students\/([\w-]+)/)
  ) {
    const [, studentId] = url.match(/\/api\/students\/([\w-]+)/) || [];
    deleteStudent(req, res, studentId);
  }
  // Get all students with their department and courses related to the department
  else if (
    method === "GET" &&
    url &&
    url.match(/\/api\/students-info\/([\w-]+)/)
  ) {
    const [, studentId] = url.match(/\/api\/students-info\/([\w-]+)/) || [];
    getAll(req, res, studentId);
  }
  // Handle (Fallback) unmatched routes with a 404 Not Found response
  else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Not Found" }));
  }
};
