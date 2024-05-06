import http from "http";
import { studentRoutes } from "./routes/student.route";
import { courseRoutes } from "./routes/course.route";
import { departmentsRoutes } from "./routes/department.route";

// Create an HTTP server
const server = http.createServer((req, res) => {
  const { url } = req;

  // Handle the incoming request from the Student Routes
  if (url?.startsWith("/api/students")) {
    studentRoutes(req, res);
    // Handle the incoming request from the Courses Routes
  } else if (url?.startsWith("/api/courses")) {
    courseRoutes(req, res);
  }
  // Handle the incoming request from the Departments Routes
  else if (url?.startsWith("/api/departments")) {
    departmentsRoutes(req, res);
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Not Found" }));
  }
});

// Start the server and listen for incoming requests
server.listen(5000, () => {
  console.log(`Server is running on http://localhost:5000`);
});
