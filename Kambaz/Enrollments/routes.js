import * as EnrollmentsDao from "./dao.js";

export default function EnrollmentsRoutes(app) {

    // retrieve the enrollments
    app.get("/api/enrollments", async (req, res) => {
      const enrollments = await EnrollmentsDao.getEnrollments();
      res.send(enrollments);
    });


}