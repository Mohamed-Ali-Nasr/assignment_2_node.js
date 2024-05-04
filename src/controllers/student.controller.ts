import { IncomingMessage, ServerResponse } from "http";
import { students, writeDataFile } from "../models/student.model";
import { departments } from "../models/department.model";
import { courses } from "../models/course.model";

// GET ALL STUDENTS HANDLER =>
export const getAllStudents = (req: IncomingMessage, res: ServerResponse) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(students));
};

// GET STUDENT BY ID HANDLER =>
export const getStudentById = (
  req: IncomingMessage,
  res: ServerResponse,
  studentId: string | undefined
) => {
  if (studentId) {
    const student = students.find((ele) => ele.id === +studentId);

    if (student) {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(student));
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Student not found" }));
    }
  } else {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Invalid request" }));
  }
};

// CREATE STUDENT HANDLER =>
export const createStudent = (req: IncomingMessage, res: ServerResponse) => {
  let data = "";
  req.on("data", (chunk) => {
    data += chunk;
  });

  req.on("end", () => {
    try {
      const { name, email, password } = JSON.parse(data);

      const existingEmail = students.find((ele) => ele.email === email);

      if (existingEmail) {
        res.writeHead(409, { "Content-Type": "application/json" });
        return res.end(
          JSON.stringify({
            message:
              "A user with this email address already exists. Please log in instead.",
          })
        );
      }

      const newStudent = {
        id: students.length + 1,
        name,
        email,
        password,
        departmentId: departments.length + 2,
      };

      students.push(newStudent);

      writeDataFile(students);

      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify(newStudent));
    } catch (error) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Invalid request body" }));
    }
  });
};

// UPDATE STUDENT HANDLER =>
export const updateStudent = (
  req: IncomingMessage,
  res: ServerResponse,
  studentId: string | undefined
) => {
  if (studentId) {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
    });

    req.on("end", () => {
      const { name, email, password } = JSON.parse(data);

      const index = students.findIndex((ele) => ele.id === +studentId);

      if (index !== -1) {
        students[index] = { ...students[index], name, email, password };

        writeDataFile(students);

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(students[index]));
      } else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Student not found" }));
      }
    });
  }
};

// DELETE STUDENT HANDLER =>
export const deleteStudent = (
  req: IncomingMessage,
  res: ServerResponse,
  studentId: string | undefined
) => {
  if (studentId) {
    const index = students.findIndex((ele) => ele.id === +studentId);

    if (index !== -1) {
      students.splice(index, 1);
      writeDataFile(students);

      res.writeHead(202, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          message: `A Student with ID ${studentId} is deleted successfully`,
        })
      );
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Student not found" }));
    }
  }
};

// GET ALL STUDENTS WITH THEIR DEPARTMENT AND COURSES RELATED TO THE DEPARTMENT =>
export const getAll = (
  req: IncomingMessage,
  res: ServerResponse,
  studentId: string | undefined
) => {
  if (studentId) {
    const student = students.find((ele) => ele.id === +studentId);

    if (student) {
      const { id, email, name, password, departmentId } = student;

      const course = courses.find((ele) => ele.departmentId === departmentId);

      const department = departments.find((ele) => ele.id === departmentId);

      const StudentInfo = {
        id,
        name,
        password,
        email,
        department: department || {},
        courses: {
          id: course?.id,
          name: course?.name,
        },
      };

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(StudentInfo));
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Student not found" }));
    }
  } else {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Invalid request" }));
  }
};
