import * as QuizzesDao from "./dao.js";

export default function QuizzesRoutes(app) {

    // retrieve the quiz by id
    app.get("/api/quizzes/:quizId", async (req, res) => {
      const { quizId } = req.params;
      const quiz = await QuizzesDao.findQuizById(quizId);
      res.send(quiz);
    });

    // delete the quiz by id
    app.delete("/api/quizzes/:quizId", async (req, res) => {
        const { quizId } = req.params;
        const status = await QuizzesDao.deleteQuiz(quizId);
        res.send(status); 
    })

    // update the quiz
    app.put("/api/quizzes/:quizId", async (req, res) => {
        const { quizId } = req.params;
        const quizUpdates = req.body;
        console.log("Trying to update quiz", quizId, "with", quizUpdates);
        const status = await QuizzesDao.updateQuiz(quizId, quizUpdates);
        console.log(status);
        res.send(status);
    })

}