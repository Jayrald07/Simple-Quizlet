import Answer from "../model/Answer";
import User from "../model/User";
import Question from "../model/Questions";
import UserAnswer from "../model/UserAnswer";
const resolvers = {
  Query: {
    async getQuestions() {
      let questions = await Question.find().populate("options");
      return questions;
    },
    async checkQuestionAnswer(
      _: any,
      { user_id, question_id, answer_id }: any
    ) {
      let has = await Question.findOne({ _id: question_id, answer: answer_id });
      let message = "wrong";

      if (has) message = "correct";

      let point = new UserAnswer({
        user: user_id,
        question: question_id,
        point: message === "correct" ? 100 : 0,
      });

      let point_res = await point.save();
      if (point_res) return { message };
    },
  },
  Mutation: {
    async insertUser(_: any, { email }: any) {
      let user = new User({
        email,
      });
      await user.save();
      return user;
    },
    async insertAnswer(_: any, { answer }: any) {
      let ans = new Answer({
        answer,
      });

      let ans_output = await ans.save();

      return ans_output;
    },
    async insertQuestion(_: any, { question, answer, options }: any) {
      let ques = new Question({
        question,
        answer,
        options,
      });

      let ques_res = ques.save();

      if (ques_res) return { message: "success" };
      else return { message: "error" };
    },
  },
};

export default resolvers;
