import * as dao from "./dao.js";
import * as courseDao from "../Courses/dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js";
//let currentUser = null;

export default function UserRoutes(app) {
  
  // create new user profile
  const createUser = async (req, res) => {
    const user = await dao.createUser(req.body);
    res.json(user);
  };
  app.post("/api/users", createUser);

  // retrieve users from the db
  const findAllUsers = async (req, res) => { 
    
    // filter users by the role property
    const { role, name } = req.query;
    if (role) {
      const users = await dao.findUsersByRole(role);
      res.json(users);
      return
    }

    // find users whose first/last name partially match the name parameter
    if (name) {
      const users = await dao.findUsersByPartialName(name);
      res.json(users);
      return;
    }

    // all users
    const users = await dao.findAllUsers();
    res.json(users);
  };
  app.get("/api/users", findAllUsers);

  // find user by id
  const findUserById = async (req, res) => {
    const user = await dao.findUserById(req.params.userId);
    res.json(user);
  };
  app.get("/api/users/:userId", findUserById);

  // create the new course and enroll the currentUser
  const createCourse = (req, res) => {
    const currentUser = req.session["currentUser"];
    const newCourse = courseDao.createCourse(req.body);
    enrollmentsDao.enrollUserInCourse(currentUser._id, newCourse._id);
    res.json(newCourse);
  };
  app.post("/api/users/current/courses", createCourse);

  
  // update user, identify user with id
  const updateUser = async (req, res) => {
    const { userId } = req.params;
    const userUpdates = req.body;
    await dao.updateUser(userId, userUpdates);
    const currentUser = req.session["currentUser"];
    
    // real time change if current user updated
    if (currentUser && currentUser._id === userId) {
      req.session["currentUser"] = { ...currentUser, ...userUpdates };
    }
    res.json(currentUser);
  };
  app.put("/api/users/:userId", updateUser);
  
  const signup = async (req, res) => { 
    const user = await dao.findUserByUsername(req.body.username);
    // check if the required fields are provided
    if (user) {
        res.status(400).json(
            { message: " Username already in use" });
        return;
    }
    // create new user
    const currentUser = await dao.createUser(req.body);
    req.session["currentUser"] = currentUser;
    res.json(currentUser);
  };

  const signin = async (req, res) => {
    const { username, password } = req.body;
    const currentUser = await dao.findUserByCredentials(username, password);
    if (currentUser) {
        req.session["currentUser"] = currentUser;
        res.json(currentUser);
      } else {
        res.status(401).json({ message: "Unable to login. Try again later." });
      }  
  };

  const signout = (req, res) => { 
    req.session.destroy();
    res.sendStatus(200);
  };

  // retrieve the account info
  const profile = (req, res) => { 
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    res.json(currentUser);
  };

  // find enrolled courses for a user
  const findCoursesForEnrolledUser = (req, res) => {
    let { userId } = req.params;
    if (userId === "current") {
        const currentUser = req.session["currentUser"];
        if (!currentUser) {
        res.sendStatus(401);
        return;
        }
        userId = currentUser._id;
    }
    const courses = courseDao.findCoursesForEnrolledUser(userId);
    res.json(courses);
  };
  app.get("/api/users/:userId/courses", findCoursesForEnrolledUser);

  // delete user by id from db
  const deleteUser = async (req, res) => {
    const status = await dao.deleteUser(req.params.userId);
    res.json(status);
  };
  app.delete("/api/users/:userId", deleteUser);

  app.post("/api/users/signup", signup);
  app.post("/api/users/signin", signin);
  app.post("/api/users/signout", signout);
  app.post("/api/users/profile", profile);

  // enroll user in a new course
  app.post("/api/users/:userId/enrollments", (req, res) => {
    try {
      let { userId } = req.params;
      const { courseId } = req.body;
  
      if (userId === "current") {
        const currentUser = req.session["currentUser"];
        if (!currentUser) {
          return res.sendStatus(401);
        }
        userId = currentUser._id;
      }
  
      const newEnrollment = enrollmentsDao.enrollUserInCourse(userId, courseId);
  
      if (newEnrollment.error) {
        return res.status(400).json(newEnrollment);
      }
      res.status(201).send(newEnrollment);
    } catch (err) {
      res.status(500).send({ error: "Internal Server Error" });
    }
  });

  // uneroll user from a course
  app.delete("/api/users/:userId/enrollments", async (req, res) => {
    let { userId } = req.params;
    const { courseId } = req.body;
    console.log("REQ.BODY", req.body);

    if (userId === "current") {
        const currentUser = req.session["currentUser"];
        if (!currentUser) {
        res.sendStatus(401);
        return;
        }
        userId = currentUser._id;
    }

    try {
        const status = await enrollmentsDao.unenrollUserFromCourse(userId, courseId);
        if (status.success) {
            res.status(200).json({ success: true });
          } else {
            res.status(404).json({ success: false, message: "Enrollment not found" });
          }
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
  })
}
