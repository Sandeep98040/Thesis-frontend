// import React, { useState } from 'react';
// import axios from 'axios';

// const courses = [
//     "Artificial Intelligence",
//     "Data Structures and Algorithms",
//     "Database Management Systems",
//     "Operating Systems",
//     "Computer Networks",
//     "Software Engineering",
//     "Machine Learning",
//     "Cybersecurity",
//     "Cloud Computing",
//     "Web Development",
//     "Object-Oriented Programming",
//     "Mobile Computing",
//     "Human-Computer Interaction",
//     "Big Data Analytics",
//     "Computer Graphics",
// ];

// function App() {
//     const [selectedCourses, setSelectedCourses] = useState([]);

//     const handleCheckboxChange = (course) => {
//         if (selectedCourses.includes(course)) {
//             setSelectedCourses(selectedCourses.filter(c => c !== course));
//         } else {
//             setSelectedCourses([...selectedCourses, course]);
//         }
//     };

//     const handleSubmit = async () => {
//         try {
//             const response = await axios.post('http://localhost:5000/api/courses', {
//                 user: 'Asmita',
//                 selectedCourses,
//             });
//             console.log('Saved:', response.data);
//         } catch (error) {
//             console.error('Error saving courses:', error);
//         }
//     };

//     return (
//         <div style={{ padding: "20px" }}>
//             <h1>Select Courses</h1>
//             {courses.map(course => (
//                 <div key={course}>
//                     <input
//                         type="checkbox"
//                         id={course}
//                         value={course}
//                         onChange={() => handleCheckboxChange(course)}
//                     />
//                     <label htmlFor={course}>{course}</label>
//                 </div>
//             ))}
//             <button onClick={handleSubmit}>Save</button>
//         </div>
//     );
// }

// export default App;

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ContentList from "./pages/ContentList";
import CourseSelection from "./pages/CounseSelection";
import Login from "./pages/Login";
import Quiz from "./pages/Quiz";
import QuizPage from "./pages/QuizPage";
import Register from "./pages/Register";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/courses" element={<CourseSelection />} />
        <Route path="/content/:course" element={<ContentList />} />
        <Route path="/quiz/:content/:course" element={<Quiz />} />

        {/* Add this line */}
      </Routes>
    </Router>
  );
}

export default App;
