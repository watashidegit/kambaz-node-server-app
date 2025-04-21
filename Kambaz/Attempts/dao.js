import AttemptModel from "./model.js";

export const createAttempt = (attempt) => AttemptModel.create(attempt);

export const findAttemptByQuizAndUser = (quizId, userId, isPreview = false) =>
    AttemptModel.findOne({ quizId, userId, isPreview });

export const updateAttempt = (attemptId, attempt) =>
    AttemptModel.updateOne({ _id: attemptId }, { $set: attempt });

export const findAttemptsByQuizAndUser = (quizId, userId) =>
    AttemptModel.find({
                          quizId,
                          userId,
                          isPreview: false
                      })
        .sort({ submittedAt: -1 });

export const findLatestAttemptByQuizAndUser = async (quizId, userId) => {
    const attempts = await AttemptModel.find({
                                                 quizId,
                                                 userId,
                                                 isPreview: false
                                             })
        .sort({ submittedAt: -1 })
        .limit(1);

    return attempts.length > 0 ? attempts[0] : null;
};