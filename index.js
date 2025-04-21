import express from 'express'
import mongoose from 'mongoose';
import Hello from "./Hello.js"
import Lab5 from "./Lab5/index.js";
import cors from "cors";
import UserRoutes from './Kambaz/Users/routes.js';
import CourseRoutes from './Kambaz/Courses/routes.js';
import session from "express-session";
import "dotenv/config";
import ModuleRoutes from './Kambaz/Modules/routes.js';
import AssignmentRoutes from './Kambaz/Assignments/routes.js';
import EnrollmentsRoutes from './Kambaz/Enrollments/routes.js';
import QuizzesRoutes from './Kambaz/Quizzes/routes.js';
 
const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING ||  "mongodb://127.0.0.1:27017/kambaz"
mongoose.connect(CONNECTION_STRING);

const app = express();
app.use(
    cors({
      credentials: true,
      origin: process.env.NETLIFY_URL?.replace(/\/$/, "") || "http://localhost:5173",
    })
);  
console.log("Mongo URI:", process.env.MONGO_CONNECTION_STRING);

const sessionOptions = {
    secret: process.env.SESSION_SECRET || "kambaz",
    resave: false,
    saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    domain: process.env.NODE_SERVER_DOMAIN,
    };
}  
app.use(session(sessionOptions));
app.use(express.json());
Lab5(app);
Hello(app);
UserRoutes(app);
CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);
EnrollmentsRoutes(app);
QuizzesRoutes(app);
app.listen(process.env.PORT || 4000)