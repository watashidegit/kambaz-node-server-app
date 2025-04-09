import model from "./model.js";

// retrieve a user's registered courses
export async function findCoursesForUser(userId) {
    const enrollments = await model.find({ user: userId }).populate("course");
    return enrollments.map((enrollment) => enrollment.course);
}
   
// retrieve a course's enrolled users
export async function findUsersForCourse(courseId) {
    const enrollments = await model.find({ course: courseId }).populate("user");
    return enrollments.map((enrollment) => enrollment.user);
}
   
// enroll a user in a course
export function enrollUserInCourse(user, course) {
    const newEnrollment = { user, course, _id: `${user}-${course}` };
    return model.create(newEnrollment);
}
   
// unenroll a user
export function unenrollUserFromCourse(user, course) {
    return model.deleteOne({ user, course });
}
   