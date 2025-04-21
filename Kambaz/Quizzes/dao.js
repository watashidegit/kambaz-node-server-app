import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

// retrieve a course's quiz lists
export async function findQuizzesForCourse(courseId) {
   return await model.find({ course: courseId });
}

// creata a new quiz
export async function createQuiz(quiz) {
    console.log("Creating quiz for course:", quiz);
    const newQuiz = { ...quiz, _id: uuidv4() };
    return await model.create(newQuiz);
}

// delete a quiz by its qid
export async function deleteQuiz(quizId) {
    return await model.deleteOne({ _id: quizId });
}

// retrieve a quiz by its qid
export function findQuizById(quizId) {
    return model.findById(quizId);
}

// update a quiz
export function updateQuiz(quizId, quizUpdates) {
    return model.updateOne({_id: quizId }, { $set: quizUpdates });
}

// retrieve quizzes by partial title within a course
export function findQuizByPartialTitle(courseId, partialTitle) {
    const regex = new RegExp(partialTitle, "i");
    return model.find({ course: courseId, title: {$regex: regex}  })
}
