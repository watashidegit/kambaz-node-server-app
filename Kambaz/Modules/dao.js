import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

// retrieve a course's modules
export function findModulesForCourse(courseId) {
    return model.find({ course: courseId });
}
   
// create module
export function createModule(module) {
    const newModule = { ...module, _id: uuidv4() };
    return model.create(newModule);
}
  
// delete module by its id
export function deleteModule(moduleId) {
    return model.deleteOne({ _id: moduleId });
}
   
// update module by its id
export function updateModule(moduleId, moduleUpdates) {
    return model.updateOne({ _id: moduleId }, moduleUpdates);
}
  