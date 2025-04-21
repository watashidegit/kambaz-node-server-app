import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
    {
      title: String,
      questionText: String,
      type: {
        type: String,
        enum: ["Multiple Choice", "True/False", "Fill in the Blank"]
      },
      correctAnswer: {
        type: mongoose.Schema.Types.Mixed,
        required: function () {
          return this.type === "Multiple Choice" || this.type === "True/False";
        },
        validate: {
          validator: function (v) {
            if (this.type === "Multiple Choice") {
              return typeof v === "number" && v >= 0 && v < this.options.length;
            }
            if (this.type === "True/False") {
              return v === "true" || v === "false";
            }
            return true;
          },
          message: (props) => `Invalid correctAnswer value for question type.`
        }
      },
      points: Number,
      options: [String], // for Multiple Choice
      correctAnswers: [String], // for Fill in the Blank
      caseSensitive: Boolean
    },
    { collection: "questions" }
);

const schema = new mongoose.Schema(
  {
    _id: String,
    title: String,
    course: { type: String, ref: "CourseModel" },
    description: String,
    quizType: String,
    assignmentGroup: String,
    shuffleAnswer: Boolean,
    timeLimit: Number,
    points: Number,
    multipleAttempts: Boolean,
    attempts: Number,
    dueDate: String,
    assignTo: String,
    availableFrom: String,
    availableUntil: String,
    published: Boolean,
    oneQuestionAtATime: Boolean,
    webcamRequired: Boolean,
    lockQuestionsAfterAnswering: Boolean,
    showCorrectAnswers: Boolean,
    questions: [questionSchema],
  },
  { collection: "quizzes" }
);

export default schema;