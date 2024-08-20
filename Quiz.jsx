import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

const Quiz = () => {
  const { course } = useParams();
  const location = useLocation();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(300); // 5 minutes timer in seconds
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [score, setScore] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchQuizQuestions = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const apiResponse = await axios.get(
        `http://localhost:5000/api/quiz/generate/${course}`
      );
      setQuestions(apiResponse.data);
    } catch (err) {
      setError("Failed to fetch questions. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [course, location.search]);

  useEffect(() => {
    fetchQuizQuestions();
  }, [fetchQuizQuestions]);

  const validateQuestion = (question) => {
    // Validate if the question has the necessary fields and correct format
    if (!question.question || !question.options || !question.answer) {
      return false;
    }

    // Ensure the correct answer is one of the provided options
    const correctOptionIndex = "abcd".indexOf(question.answer.toLowerCase());
    if (
      correctOptionIndex === -1 ||
      correctOptionIndex >= question.options.length
    ) {
      return false;
    }

    return true;
  };

  const calculateScore = useCallback(
    (answers) => {
      let newScore = 0;
      questions.forEach((question, index) => {
        if (validateQuestion(question)) {
          const correctOptionIndex = "abcd".indexOf(
            question.answer.toLowerCase()
          );
          if (
            correctOptionIndex !== -1 &&
            answers[index] === correctOptionIndex
          ) {
            newScore += 1;
          }
        }
      });
      setScore(newScore);
    },
    [questions]
  );

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer > 0) {
          return prevTimer - 1;
        } else {
          clearInterval(countdown);
          alert("Time's up!");
          calculateScore(selectedAnswers);
          setShowModal(true);
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, [calculateScore, selectedAnswers]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const handleAnswerClick = (questionIndex, answerIndex) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[questionIndex] = answerIndex;
    setSelectedAnswers(newSelectedAnswers);

    if (questionIndex === questions.length - 1) {
      calculateScore(newSelectedAnswers);
      setShowModal(true); // Show the modal when the last answer is clicked
    }
  };

  return (
    <div style={styles.container}>
      <h1>Quiz for course: {course}</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {timer > 0 && (
        <div>
          <h2 style={styles.timer}>Time Remaining: {formatTime(timer)}</h2>
          {questions.length > 0 && (
            <div>
              <h2>Quiz Questions</h2>
              <ol>
                {questions.map((q, index) => (
                  <li key={index} style={styles.question}>
                    <p>{q.question}</p>
                    <ul style={styles.optionsList}>
                      {q.options.map((option, i) => (
                        <li
                          key={i}
                          onClick={() => handleAnswerClick(index, i)}
                          style={{
                            ...styles.option,
                            backgroundColor:
                              selectedAnswers[index] === i
                                ? "lightgray"
                                : "white",
                          }}
                        >
                          {option}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      )}
      {timer === 0 && <p>Time's up! The quiz is over.</p>}

      {showModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h2>Quiz Completed!</h2>
            {score !== null && (
              <p>
                Your score: {score} / {questions.length}
              </p>
            )}
            <button onClick={() => setShowModal(false)} style={styles.button}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    padding: "20px",
  },
  timer: {
    color: "red",
  },
  question: {
    marginBottom: "20px",
  },
  optionsList: {
    listStyleType: "none",
    paddingLeft: "0",
  },
  option: {
    cursor: "pointer",
    padding: "10px",
    marginBottom: "5px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    transition: "background-color 0.3s",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.7)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    maxWidth: "500px",
    textAlign: "center",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#007BFF",
    color: "#fff",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
};

export default Quiz;
