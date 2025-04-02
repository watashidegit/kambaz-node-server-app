import Database from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";

// retrieve a course's enrolled users
export function getEnrolledUsersInCourse(courseId) {
    const { enrollments, users } = Database;
    const courseEnrollments = enrollments.filter((e) => e.course === courseId);
    const enrolledUserIds = courseEnrollments.map((e) => e.user);
    const enrolledUsers = users.filter((user) => enrolledUserIds.includes(user._id));
    return enrolledUsers;

}

// retrieve all enrollments lists
export function getEnrollments() {
    const { enrollments } = Database;
    return enrollments;
}

// enroll a user in a course
export function enrollUserInCourse(userId, courseId) {
    const { enrollments } = Database;
    console.log(courseId);

    const newEnrollment = {
        _id: uuidv4(),
        user: userId,
        course: courseId,
    };

    enrollments.push(newEnrollment);
    return newEnrollment;
}

// unenroll a user
export function unenrollUserFromCourse(userId, courseId) {
    const { enrollments } = Database;
    const index = enrollments.findIndex((e) => e.user === userId && e.course === courseId);

    if (index !== -1) {
        enrollments.splice(index, 1);
        return { success: true }; 
    }
    return { success: false, message: "Enrollment not found" };

}