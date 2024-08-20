import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useNavigate, useParams } from "react-router-dom";
import rehypeRaw from "rehype-raw";

const ContentList = () => {
  const { course } = useParams();
  const [content, setContent] = useState(null);
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(null);
  const navigate = useNavigate();
  const utteranceRef = useRef(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/content/${course}`)
      .then((response) => {
        setContent(response.data);
      })
      .catch((error) => console.error("Error fetching content:", error));
  }, [course]);

  const speak = () => {
    if (!content) return;

    const cleanedText = content.content.replace(/[#*.]/g, "");
    const sentences = cleanedText.match(/[^\.!\?]+[\.!\?]+/g) || [cleanedText];

    if (utteranceRef.current) {
      window.speechSynthesis.cancel();
    }

    let index = 0;

    const speakSentence = (sentence) => {
      const utterance = new SpeechSynthesisUtterance(sentence);
      utteranceRef.current = utterance;

      utterance.onstart = () => {
        setCurrentSentenceIndex(index);
      };

      utterance.onend = () => {
        index++;
        if (index < sentences.length) {
          speakSentence(sentences[index]);
        } else {
          setCurrentSentenceIndex(null);
        }
      };

      window.speechSynthesis.speak(utterance);
    };

    speakSentence(sentences[index]);
  };

  const pause = () => {
    window.speechSynthesis.pause();
  };

  const resume = () => {
    window.speechSynthesis.resume();
  };

  const stop = () => {
    window.speechSynthesis.cancel();
    setCurrentSentenceIndex(null);
  };

  const handleQuizButton = () => {
    const encodedContent = encodeURIComponent(content.content);
    navigate(`/quiz/${encodedContent}/${course}`);
  };

  if (!content) {
    return <div style={styles.loading}>Loading...</div>;
  }

  const cleanedText = content.content.replace(/[#*.]/g, "");
  const sentences = cleanedText.match(/[^\.!\?]+[\.!\?]+/g) || [cleanedText];

  const highlightedContent = sentences
    .map((sentence, index) => {
      if (index === currentSentenceIndex) {
        return `<mark>${sentence}</mark>`;
      }
      return sentence;
    })
    .join(" ");

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Content for course {content.course}</h1>
      <div style={styles.controls}>
        <button onClick={speak} style={styles.controlButton}>
          <i className="fas fa-play"></i> Play
        </button>
        <button onClick={pause} style={styles.controlButton}>
          <i className="fas fa-pause"></i> Pause
        </button>
        <button onClick={resume} style={styles.controlButton}>
          <i className="fas fa-play"></i> Resume
        </button>
        <button onClick={stop} style={styles.controlButton}>
          <i className="fas fa-stop"></i> Stop
        </button>
      </div>

      <h2 style={styles.subheading}>
        {content.title || "Title: Introduction to Artificial Intelligence"}
      </h2>

      <div style={styles.contentContainer}>
        <ReactMarkdown rehypePlugins={[rehypeRaw]}>{highlightedContent}</ReactMarkdown>
      </div>
      
      <button onClick={handleQuizButton} style={styles.quizButton}>Start Quiz</button>
    </div>
  );
};

const styles = {
  container: {
    padding: "40px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: "#f9f9fb",
    borderRadius: "8px",
    boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
    maxWidth: "900px",
    margin: "0 auto",
    color: "#333",
  },
  heading: {
    fontSize: "36px",
    color: "#007bff",
    marginBottom: "20px",
    textAlign: "center",
    textShadow: "1px 1px 3px rgba(0, 0, 0, 0.1)",
  },
  subheading: {
    fontSize: "24px",
    color: "#555",
    marginBottom: "20px",
    textAlign: "center",
  },
  controls: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "20px",
  },
  controlButton: {
    padding: "10px 20px",
    fontSize: "16px",
    color: "#fff",
    backgroundColor: "#007bff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  },
  contentContainer: {
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    marginBottom: "30px",
    fontSize: "18px",
    lineHeight: "1.6",
    color: "#333",
  },
  quizButton: {
    display: "block",
    padding: "15px 30px",
    fontSize: "18px",
    color: "#fff",
    backgroundColor: "#28a745",
    border: "none",
    borderRadius: "50px",
    cursor: "pointer",
    margin: "0 auto",
    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
    transition: "background-color 0.3s ease",
  },
  loading: {
    fontSize: "24px",
    textAlign: "center",
    padding: "20px",
  },
};

export default ContentList;
