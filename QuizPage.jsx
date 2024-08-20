import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function QuizPage() {
  const { username, course } = useParams();
  console.log('course',course)
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [timer, setTimer] = useState(600); // 10 minutes in seconds
  const [score, setScore] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/quiz/${course}`
        );
        setQuestions(response.data);
      } catch (error) {
        console.error("Error fetching quiz questions:", error);
      }
    };

    fetchQuestions();
  }, [course]);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);

    return () => clearInterval(countdown);
  }, []);

  const handleAnswerChange = (questionIndex, answer) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionIndex]: answer,
    }));
  };

  const handleSubmit = async () => {
    const correctAnswers = questions.reduce((acc, question, index) => {
      if (question.answer === answers[index]) {
        return acc + 1;
      }
      return acc;
    }, 0);

    setScore(correctAnswers);

    try {
      await axios.post("http://localhost:5000/api/quiz/submit", {
        user: username,
        course,
        score: correctAnswers,
      });
    } catch (error) {
      console.error("Error submitting quiz result:", error);
    }
  };

  if (score !== null) {
    return (
      <div style={styles.container}>
        <h1 style={styles.heading}>Quiz Results</h1>
        <p style={styles.text}>
          Your score is: {score} out of {questions.length}
        </p>
        <button style={styles.button} onClick={() => navigate("/courses")}>Back to Courses</button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Quiz for {course}</h1>
      <p style={styles.timer}>
        Time remaining: {Math.floor(timer / 60)}:
        {String(timer % 60).padStart(2, "0")}
      </p>
      {questions.map((question, index) => (
        <div key={index} style={styles.questionContainer}>
          <h3 style={styles.questionText}>{question.question}</h3>
          {question.options.map((option, i) => (
            <div key={i} style={styles.optionContainer}>
              <input
                type="radio"
                name={`question-${index}`}
                value={option}
                onChange={() => handleAnswerChange(index, option)}
                style={styles.radio}
              />
              <label style={styles.label}>{option}</label>
            </div>
          ))}
        </div>
      ))}
      <button style={styles.submitButton} onClick={handleSubmit} disabled={timer === 0}>
        Submit Quiz
      </button>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    fontFamily: "'Arial', sans-serif",
    maxWidth: "800px",
    margin: "0 auto",
    textAlign: "center",
  },
  heading: {
    fontSize: "32px",
    color: "#333",
    marginBottom: "20px",
  },
  text: {
    fontSize: "18px",
    color: "#555",
  },
  timer: {
    fontSize: "20px",
    color: "#D9534F",
    marginBottom: "20px",
  },
  questionContainer: {
    marginBottom: "20px",
    padding: "10px",
    borderRadius: "5px",
    backgroundColor: "#F9F9F9",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  },
  questionText: {
    fontSize: "20px",
    color: "#333",
    marginBottom: "10px",
  },
  optionContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: "10px",
  },
  radio: {
    marginRight: "10px",
  },
  label: {
    fontSize: "16px",
    color: "#555",
  },
  submitButton: {
    padding: "10px 20px",
    fontSize: "16px",
    color: "#fff",
    backgroundColor: "#007BFF",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "20px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    color: "#fff",
    backgroundColor: "#007BFF",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default QuizPage;
