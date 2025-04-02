const assignment = {
    id: 1, title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10", completed: false, score: 0,
  };
  const module = {
    id: "1234",
    name: "Introduction to Programming",
    description: "Learn the basics of programming with hands-on exercises.",
    course: "CS101"
  };
  export default function WorkingWithObjects(app) {
    app.get("/lab5/assignment", (req, res) => {
        res.json(assignment);
    });
    app.get("/lab5/assignment/title", (req, res) => {
        res.json(assignment.title);
    });   
    app.get("/lab5/assignment/title/:newTitle", (req, res) => {
        const { newTitle } = req.params;
        assignment.title = newTitle;
        res.json(assignment);
    });
    // get assignment score
    app.get("/lab5/assignment/score", (req, res) => {
        res.json(assignment.score);
    })
    // update the assignment score
    app.get("/lab5/assignment/score/:newScore", (req, res) => {
        const { newScore } = req.params;
        assignment.score = newScore;
        res.json(assignment);
    });
    // get the complete status of assignment 
    app.get("/lab5/assignment/completed", (req, res) => {
        res.json(assignment.completed);
    });
    // update the complete status of assignment 
    app.get("/lab5/assignment/completed/:completed", (req, res) => {
        const { completed } = req.params;
        assignment.completed = completed === "true";
        res.json(assignment);
    });
    
    // retrieve the module object
    app.get("/lab5/module", (req, res) => {
        res.json(module);
    })
    // retrieve the module name
    app.get("/lab5/module/name", (req, res) => {
        res.send(module.name);
    })
    // update the module name
    app.get("/lab5/module/name/:newName", (req, res) => {
        const newName = req.params;
        module.name = newName;
        res.json(module);
    })
  };
  
  