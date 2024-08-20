import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function ContentPage() {
    const { username, course } = useParams();
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/content/${username}/${course}`);
                setContent(response.data.content);
            } catch (error) {
                console.error('Error fetching content:', error);
            }
        };

        fetchContent();
    }, [username, course]);

    const handleQuizButton = () => {
        navigate(`/quiz/${username}/${course}`);
    };

    const speak = () => {
        const utterance = new SpeechSynthesisUtterance(content);
        window.speechSynthesis.speak(utterance);
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Generated Content for {course}</h1>
            <div style={styles.contentContainer}>
                <p style={styles.contentText}>{content}</p>
                <button onClick={speak} style={styles.speakButton}>🔊 Speak</button>
            </div>
            <button onClick={handleQuizButton} style={styles.quizButton}>Take Quiz</button>
        </div>
    );
}

const styles = {
    container: {
        padding: "40px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        backgroundColor: "#f4f7f9",
        borderRadius: "8px",
        boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.2)",
        maxWidth: "900px",
        margin: "0 auto",
        color: "#333",
    },
    heading: {
        fontSize: "36px",
        color: "#333",
        marginBottom: "30px",
        textAlign: "center",
        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)",
    },
    contentContainer: {
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        marginBottom: "30px",
        position: "relative",
    },
    contentText: {
        fontSize: "18px",
        lineHeight: "1.6",
        color: "#555",
    },
    speakButton: {
        position: "absolute",
        top: "20px",
        right: "20px",
        backgroundColor: "#007bff",
        color: "#fff",
        border: "none",
        borderRadius: "50%",
        width: "40px",
        height: "40px",
        cursor: "pointer",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
        transition: "background-color 0.3s ease",
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
        boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
        transition: "background-color 0.3s ease",
    },
};

export default ContentPage;
