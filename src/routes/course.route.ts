import { IncomingMessage, ServerResponse } from "http";
import {
  createCourse,
  deleteCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
} from "../controllers/course.controller";

// Route handling for Courses
export const courseRoutes = (req: IncomingMessage, res: ServerResponse) => {
  const { method, url } = req;

  // Handle GET request to retrieve all Courses
  if (method === "GET" && url === "/api/courses") {
    getAllCourses(req, res);
  }
  // POST request to create a new Course
  else if (method === "POST" && url === "/api/courses") {
    createCourse(req, res);
  }
  // GET a single Course
  else if (method === "GET" && url && url.match(/\/api\/courses\/([\w-]+)/)) {
    const [, courseId] = url.match(/\/api\/courses\/([\w-]+)/) || [];
    getCourseById(req, res, courseId);
  }
  // Update a Course
  else if (method === "PUT" && url && url.match(/\/api\/courses\/([\w-]+)/)) {
    const [, courseId] = url.match(/\/api\/courses\/([\w-]+)/) || [];
    updateCourse(req, res, courseId);
  }
  // Create DELETE request to delete Course by ID
  else if (
    method === "DELETE" &&
    url &&
    url.match(/\/api\/courses\/([\w-]+)/)
  ) {
    const [, courseId] = url.match(/\/api\/courses\/([\w-]+)/) || [];
    deleteCourse(req, res, courseId);
  }
  // Handle (Fallback) unmatched routes with a 404 Not Found response
  else {
    res.writeHead(404, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ message: "Not Found" }));
  }
};
