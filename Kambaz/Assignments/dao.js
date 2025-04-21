import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

// retrieve a course's assignments
export async function findAssignmentsForCourse(courseId) {
    return await model.find({ course: courseId });
}

// create a new assignment for a course
export async function createAssignment(assignment) {
    const newAssignment = { ...assignment, _id: uuidv4() };
    return await model.create(newAssignment);
}

// delete assignment by aid
export async function deleteAssignment(assignmentId) {
    return await model.deleteOne({_id: assignmentId});
}

// update assignment by aid
export function updateAssignment(assignmentId, assignmentUpdates) {
    return model.updateOne({ _id: assignmentId }, assignmentUpdates);
}
  
