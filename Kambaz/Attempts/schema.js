import mongoose from "mongoose";

const attemptSchema = new mongoose.Schema(
    {
        quizId: { type: String, required: true },
        userId: { type: String, required: true },
        answers: { type: mongoose.Schema.Types.Mixed, default: {} },
        score: { type: Number, default: 0 },
        percentageScore: { type: Number },
        submittedAt: { type: Date, default: Date.now },
        isPreview: { type: Boolean, default: false }
    },
    { collection: "quizAttempts" }
);

attemptSchema.index({ quizId: 1, userId: 1, isPreview: 1 });
attemptSchema.index({ submittedAt: -1 });

export default attemptSchema;