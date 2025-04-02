let todos = [ { id: 1, title: "Task 1", description: "Description 1", completed: false },  
              { id: 2, title: "Task 2", description: "Description 2", completed: true },
              { id: 3, title: "Task 3", description: "Description 3", completed: false },  
              { id: 4, title: "Task 4", description: "Description 4", completed: true }, ];
export default function WorkingWithArrays(app) {
    // create newTodo using get
    app.get("/lab5/todos/create", (req, res) => {
        const newTodo = {
          id: new Date().getTime(),
          title: "New Task",
          completed: false,
        };
        todos.push(newTodo);
        res.json(todos);
      });  
      
    // create newTodo using post
    app.post("/lab5/todos", (req, res) => {
        const newTodo = {...req.body, id: new Date().getTime() };
        todos.push(newTodo);
        res.json(newTodo);
    })

    // delete todo with get
    app.get("/lab5/todos/:id/delete", (req, res) => {
        const { id } = req.params;
        const todoIndex = todos.findIndex((t) => t.id === parseInt(id));
        if (todoIndex !== -1) {
            todos.splice(todoIndex, 1)
        }
        res.json(todos);
    });
    
    // delete todo with delete 
    app.delete("/lab5/todos/:id", (req, res) => {
        const { id } = req.params;
        const todoIndex = todos.findIndex((t) => t.id === parseInt(id));
        if (todoIndex !== -1) {
            todos.splice(todoIndex, 1)
        }
        res.sendStatus(200);
    })
    
    // update todo's title
    app.get("/lab5/todos/:id/title/:title", (req, res) => {
        const { id, title } = req.params;
        const todo = todos.find((t) => t.id === parseInt(id));
        todo.title = title;
        res.json(todos);
    });

    // update todo's description
    app.get("/lab5/todos/:id/description/:description", (req, res) => {
        const { id, description } = req.params;
        const todo = todos.find((t) => t.id === parseInt(id));
        if (todo) {
            todo.description = description;
            res.json(todo);
        } else {
            res.status(404).send("Todo not found");
        }
    })

    // update todo's complete status
    app.get("/lab5/todos/:id/completed/:completed", (req, res) => {
        const { id, completed } = req.params;
        const todo = todos.find ((t) => t.id === parseInt(id));
        if (todo) {
            todo.completed = completed === "true";
            res.json(todo);
        } else {
            res.status(404).send("Todo not found");
        }     
    })
    
    // retrieve todo with id
    app.get("/lab5/todos/:id", (req, res) => {
        const { id } = req.params;
        const todo = todos.find((t) => t.id === parseInt(id));
        res.json(todo);
    });

    // retrieve completed todos 
    app.get("/lab5/todos", (req, res) => {
        const { completed } = req.query;
        if (completed !== undefined) {
            const completedBool = completed === "true";
            const completedTodos = todos.filter(
                (t) => t.completed === completedBool);
            res.json(completedTodos);
            return;
        }
        res.json(todos); // when no complete query is send 
    });
};
