import Database from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";

// retrieve a course's assignments
export function findAssignmentsForCourse(courseId) {
    const { assignments } = Database;
    return assignments.filter((assignment) => assignment.course === courseId);
}

// create a new assignment for a course
export function createAssignment(assignment) {
    const newAssignment = { ...assignment, _id: uuidv4() };
    Database.assignments.push(newAssignment);
    return newAssignment;
}

// delete assignment by aid
export function deleteAssignment(assignmentId) {
    const { assignments } = Database;
    Database.assignments = assignments.filter((a) => a._id !== assignmentId );
}

// update assignment by aid
export function updateAssignment(assignmentId, assignmentUpdates) {
    const { assignments } = Database;
    const assignment = assignments.find((assignment) => assignment._id === assignmentId);
    Object.assign(assignment, assignmentUpdates);
    return assignment;
}
  
