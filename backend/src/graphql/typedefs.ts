import { gql } from "apollo-server";

const typeDefs = gql`
  input User {
    email: String!
  }

  type UserOutput {
    _id: ID!
  }

  input Option {
    _id: ID
    answer: String
  }

  type AnswerOutput {
    _id: ID
    answer: String
  }

  type MessageOutput {
    message: String!
  }

  type Question {
    _id: ID
    question: String
    options: [AnswerOutput]
  }

  type Query {
    getQuestions: [Question]
    checkQuestionAnswer(
      user_id: ID
      question_id: ID
      answer_id: ID
    ): MessageOutput
  }

  type Mutation {
    insertUser(email: String!): UserOutput
    insertAnswer(answer: String!): AnswerOutput
    insertQuestion(question: String!, answer: ID, options: [ID]): MessageOutput
  }
`;

export default typeDefs;
