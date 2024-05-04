import { IncomingMessage, ServerResponse } from "http";
import { courses, writeDataFile } from "../models/course.model";
import { departments } from "../models/department.model";

// GET ALL COURSES HANDLER =>
export const getAllCourses = (req: IncomingMessage, res: ServerResponse) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(courses));
};

// GET COURSE BY ID HANDLER =>
export const getCourseById = (
  req: IncomingMessage,
  res: ServerResponse,
  courseId: string | undefined
) => {
  if (courseId) {
    const course = courses.find((ele) => ele.id === +courseId);

    if (course) {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(course));
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Course not found" }));
    }
  } else {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Invalid request" }));
  }
};

// CREATE COURSE HANDLER =>
export const createCourse = (req: IncomingMessage, res: ServerResponse) => {
  let data = "";
  req.on("data", (chunk) => {
    data += chunk;
  });

  req.on("end", () => {
    try {
      const { name, content } = JSON.parse(data);

      const newCourse = {
        id: courses.length + 1,
        name,
        content,
        departmentId: departments.length + 2,
      };

      courses.push(newCourse);

      writeDataFile(courses);

      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify(newCourse));
    } catch (error) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Invalid request body" }));
    }
  });
};

// UPDATE COURSE HANDLER =>
export const updateCourse = (
  req: IncomingMessage,
  res: ServerResponse,
  courseId: string | undefined
) => {
  if (courseId) {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
    });

    req.on("end", () => {
      const { name, content } = JSON.parse(data);

      const index = courses.findIndex((ele) => ele.id === +courseId);

      if (index !== -1) {
        courses[index] = { ...courses[index], name, content };

        writeDataFile(courses);

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(courses[index]));
      } else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Courses not found" }));
      }
    });
  }
};

// DELETE COURSE HANDLER =>
export const deleteCourse = (
  req: IncomingMessage,
  res: ServerResponse,
  courseId: string | undefined
) => {
  if (courseId) {
    const index = courses.findIndex((ele) => ele.id === +courseId);

    if (index !== -1) {
      courses.splice(index, 1);
      writeDataFile(courses);

      res.writeHead(202, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          message: `A Course with ID ${courseId} is deleted successfully`,
        })
      );
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Course not found" }));
    }
  }
};
