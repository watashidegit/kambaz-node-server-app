import * as dao from "./dao.js";

export default function AttemptRoutes(app) {
    app.get("/api/quizzes/:qid/preview/:uid", async (req, res) => {
        try {
            const { qid, uid } = req.params;
            const attempt = await dao.findAttemptByQuizAndUser(qid, uid, true);
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

            const existing = await dao.findAttemptByQuizAndUser(qid, attempt.userId, true);

            let result;
            if (existing) {
                result = await dao.updateAttempt(existing._id, attempt);
            } else {
                result = await dao.createAttempt(attempt);
            }

            res.json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    app.get("/api/quizzes/:qid/attempts/:uid", async (req, res) => {
        try {
            const { qid, uid } = req.params;
            const attempts = await dao.findAttemptsByQuizAndUser(qid, uid);
            res.json(attempts);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    app.get("/api/quizzes/:qid/attempts/:uid/latest", async (req, res) => {
        try {
            const { qid, uid } = req.params;
            const attempt = await dao.findLatestAttemptByQuizAndUser(qid, uid);
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

            const result = await dao.createAttempt(attempt);
            res.json(result);
        } catch (error) {
            console.error("Error saving attempt:", error);
            res.status(500).json({ error: error.message });
        }
    });

}