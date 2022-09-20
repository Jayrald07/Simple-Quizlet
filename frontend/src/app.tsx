import React, { useState, useEffect } from "react";
import { Form, Input, Button, Steps, Radio, Space, message, Modal } from "antd";
import axios from "axios";

// CHANGE THIS VARIABLE TO URI WHERE YOUR GRAPHQL RESIDES
const GRAPHQL_URI = "http://localhost:4000/graphql";
const { Step } = Steps;

const Main = () => {
  const [userId, setUserId] = useState("");
  const [isAuthed, setIsAuthed] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [radioDisabled, setRadioDisabled] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);
  const [points, setPoints] = useState(0);
  const [isShowPoints, setIsShowPoints] = useState(false);
  const [timer, setTimer] = useState(15);
  const [changeDependentTimer, setChangeDependentTimer] = useState(false);

  const questionsHandle = async () => {
    let response = await axios.post(GRAPHQL_URI, {
      query: `
          query {
              getQuestions {
                _id
                question
                options {
                  _id
                  answer
                }
              }
          }
      `,
    });

    let { data } = response.data;

    if (data.getQuestions) setQuestions(data.getQuestions);
  };

  const signupHandle = async (value) => {
    let response = await axios.post(GRAPHQL_URI, {
      query: `
          mutation {
              insertUser(email: \"${value.email}\") {
                  _id
              }
          }
      `,
    });
    let { data } = response.data;
    if (data.insertUser) {
      setUserId(data.insertUser._id);
      setIsAuthed(true);
      questionsHandle();
    }
  };

  const nextHandle = () => {
    setCurrent(current + 1);
  };

  const previousHandle = () => {
    setCurrent(current - 1);
  };

  const radioValueHandle = async (e, type) => {
    let response = await axios.post(GRAPHQL_URI, {
      query: `
        query {
          checkQuestionAnswer(user_id: \"${userId}\",question_id: \"${questions[current]._id}\",answer_id: \"${e.target.value}\") {
            message
          }
        }
      `,
    });
    let { data } = response.data;
    if (data.checkQuestionAnswer.message === "wrong") {
      if (type === "choice") message.error("Wrong!");
    } else {
      message.success("Right!");
      setPoints(points + 100);
    }
    setChangeDependentTimer(true);
    let updated = radioDisabled;
    updated[current] = true;
    setRadioDisabled(updated);

    if (current < questions.length) nextHandle();
    if (current == questions.length - 1) setIsShowPoints(true);
  };

  useEffect(() => {
    if (isAuthed) {
      if (current < questions.length) {
        let ref_timer = setTimeout(() => {
          if (timer == 0) {
            message.error("Time Over!");
            radioValueHandle(
              { target: { value: "61e52fa261fa34dbcf0f232c" } },
              "auto"
            );

            setTimer(15);
            if (current >= questions.length - 1) clearTimeout(ref_timer);
          } else {
            if (changeDependentTimer) setTimer(15);
            else setTimer(timer - 1);
            setChangeDependentTimer(false);
          }
        }, 1000);
      }
    }
  }, [isAuthed, timer, questions]);

  return (
    <div className="center">
      <Modal
        visible={isShowPoints}
        onCancel={() => setIsShowPoints(false)}
        title="Points Accumulated"
      >
        <h1>Your Points: {points}</h1>
      </Modal>
      {!isAuthed ? (
        <Form onFinish={signupHandle}>
          <Form.Item name="email">
            <Input placeholder="example@gmail.com" />
          </Form.Item>
          <Button htmlType="submit" type="primary">
            Sign Up
          </Button>
        </Form>
      ) : (
        <div className="padding">
          <h2>{timer}</h2>
          <Steps current={current} progressDot>
            {questions.map((q, i) => {
              return <Step key={q._id} title={`Question ${i + 1}`} />;
            })}
            <Step key="END" title="Finish" />
          </Steps>
          <h1 style={{ margin: "40px 0" }}>{questions?.[current]?.question}</h1>
          <Radio.Group
            onChange={(e) => radioValueHandle(e, "choice")}
            disabled={radioDisabled[current]}
          >
            <Space direction="vertical">
              {questions?.[current]?.options.map((op) => {
                return (
                  <Radio key={op._id} value={op._id}>
                    {op.answer}
                  </Radio>
                );
              })}
            </Space>
          </Radio.Group>
          <div className="block">
            {current !== 0 ? (
              <Button type="primary" onClick={previousHandle}>
                Previous
              </Button>
            ) : null}
            {current !== questions.length ? (
              <Button type="primary" onClick={nextHandle}>
                Next
              </Button>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default Main;
