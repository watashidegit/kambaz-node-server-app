import * as QuizzesDao from "./dao.js";
import * as AttemptsDao from "../Attempts/dao.js";

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

    app.get("/api/quizzes/:qid/preview/:uid", async (req, res) => {
        try {
            const { qid, uid } = req.params;
            const attempt = await AttemptsDao.findAttemptByQuizAndUser(qid, uid, true);
            if (!attempt) {
                return res.status(404).json({ message: "No preview found" });
            }
            res.json(attempt);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    app.post("/api/quizzes/:qid/preview", async (req, res) => {
        try {
            const { qid } = req.params;
            const attempt = {
                ...req.body,
                quizId: qid,
                isPreview: true
            };

            const existing = await AttemptsDao.findAttemptByQuizAndUser(qid, attempt.userId, true);

            let result;
            if (existing) {
                result = await AttemptsDao.updateAttempt(existing._id, attempt);
            } else {
                result = await AttemptsDao.createAttempt(attempt);
            }

            res.json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    app.get("/api/quizzes/:qid/attempts/:uid", async (req, res) => {
        try {
            const { qid, uid } = req.params;
            const attempts = await AttemptsDao.findAttemptsByQuizAndUser(qid, uid);
            res.json(attempts);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    app.get("/api/quizzes/:qid/attempts/:uid/latest", async (req, res) => {
        try {
            const { qid, uid } = req.params;
            const attempt = await AttemptsDao.findLatestAttemptByQuizAndUser(qid, uid);
            if (!attempt) {
                return res.status(404).json({ message: "No attempts found" });
            }
            res.json(attempt);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    app.post("/api/quizzes/:qid/attempts", async (req, res) => {
        try {
            console.log("Received attempt data:", req.body);

            const { qid } = req.params;
            const attempt = {
                ...req.body,
                quizId: qid,
                isPreview: false,
                submittedAt: req.body.submittedAt || new Date().toISOString()
            };

            const result = await AttemptsDao.createAttempt(attempt);
            res.json(result);
        } catch (error) {
            console.error("Error saving attempt:", error);
            res.status(500).json({ error: error.message });
        }
    });
}