import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const courses = [
  "Artificial Intelligence",
  "Data Structures and Algorithms",
  "Database Management Systems",
  "Operating Systems",
  "Computer Networks",
  "Software Engineering",
  "Machine Learning",
  "Cybersecurity",
  "Cloud Computing",
  "Web Development",
  "Object-Oriented Programming",
  "Mobile Computing",
  "Human-Computer Interaction",
  "Big Data Analytics",
  "Computer Graphics",
];

function CourseSelection() {
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [savedCourses, setSavedCourses] = useState([]);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
      fetchSavedCourses(storedUsername);
    }
  }, []);

  const fetchSavedCourses = async (username) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/courses/${username}`
      );
      setSavedCourses(response.data.selectedCourses);
    } catch (error) {
      console.error("Error fetching saved courses:", error);
    }
  };

  const handleCheckboxChange = (course) => {
    if (selectedCourses.includes(course)) {
      setSelectedCourses(selectedCourses.filter((c) => c !== course));
    } else {
      setSelectedCourses([...selectedCourses, course]);
    }
  };

  const handleGenerateContent = async (course) => {
    try {
      navigate(`/content/${course}`);
    } catch (error) {
      console.error("Error generating content:", error);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/courses", {
        user: username,
        selectedCourses,
      });
      console.log("Saved:", response.data);
      setSavedCourses(response.data.selectedCourses);
    } catch (error) {
      console.error("Error saving courses:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Select Courses</h1>
      <h2 style={styles.subheading}>Welcome, {username}</h2>
      <div style={styles.coursesList}>
        {courses.map((course) => (
          <div key={course} style={styles.courseItem}>
            <input
              type="checkbox"
              id={course}
              value={course}
              onChange={() => handleCheckboxChange(course)}
              style={styles.checkbox}
            />
            <label htmlFor={course} style={styles.label}>{course}</label>
          </div>
        ))}
      </div>
      <div style={styles.buttonsContainer}>
        <button onClick={handleSubmit} style={styles.saveButton}>Save</button>
        <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
      </div>
      <h2 style={styles.subheading}>Saved Courses</h2>
      <div style={styles.savedCoursesContainer}>
        {savedCourses.map((course) => (
          <div key={course} style={styles.savedCourseItem}>
            <h3 style={styles.courseTitle}>{course}</h3>
            <button onClick={() => handleGenerateContent(course)} style={styles.viewButton}>
              View Content
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "40px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    background: "linear-gradient(135deg, #ece9e6, #ffffff)",
    borderRadius: "15px",
    boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
    maxWidth: "1000px",
    margin: "50px auto",
  },
  heading: {
    fontSize: "40px",
    color: "#2c3e50",
    marginBottom: "20px",
    textAlign: "center",
    fontWeight: "bold",
  },
  subheading: {
    fontSize: "28px",
    color: "#34495e",
    marginBottom: "30px",
    textAlign: "center",
    fontWeight: "600",
  },
  coursesList: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: "30px",
  },
  courseItem: {
    width: "45%",
    marginBottom: "15px",
    display: "flex",
    alignItems: "center",
    padding: "15px",
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
    cursor: "pointer",
    transition: "background-color 0.3s ease, transform 0.3s ease",
  },
  checkbox: {
    marginRight: "10px",
  },
  label: {
    fontSize: "20px",
    color: "#2c3e50",
    cursor: "pointer",
  },
  buttonsContainer: {
    marginBottom: "30px",
    textAlign: "center",
  },
  saveButton: {
    padding: "12px 25px",
    fontSize: "18px",
    color: "#fff",
    backgroundColor: "#28a745",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    marginRight: "15px",
    transition: "background-color 0.3s ease, transform 0.3s ease",
  },
  logoutButton: {
    padding: "12px 25px",
    fontSize: "18px",
    color: "#fff",
    backgroundColor: "#dc3545",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background-color 0.3s ease, transform 0.3s ease",
  },
  savedCoursesContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  savedCourseItem: {
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    padding: "20px",
    margin: "10px",
    width: "calc(33% - 20px)",
    boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.15)",
    textAlign: "center",
    transition: "transform 0.3s ease",
    backgroundImage: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
    color: "#fff",
  },
  courseTitle: {
    fontSize: "22px",
    color: "#fff",
    marginBottom: "15px",
    fontWeight: "600",
  },
  viewButton: {
    padding: "10px 20px",
    fontSize: "16px",
    color: "#ffffff",
    backgroundColor: "#007bff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background-color 0.3s ease, transform 0.3s ease",
  },
};

export default CourseSelection;
