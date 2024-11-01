import React, { useState, useEffect } from "react";
import routine from "../resources/images/semester_routine.jpg";
import academicCalendar from "../resources/images/academic_calender.jpg"; // Assuming you have this image

const TeacherDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [showCalendar, setShowCalendar] = useState(false); // State to show/hide calendar preview

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/teacher-dashboard/6722664b2722d82a38dd1fc8");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "red":
        return "#e74c3c"; // Red color
      case "orange":
        return "#e67e22"; // Orange color
      case "yellow":
        return "#f1c40f"; // Yellow color
      case "green":
        return "#2ecc71"; // Green color
      case "blue":
        return "#3498db"; // Blue color
      case "purple":
        return "#9b59b6"; // Purple color
      default:
        return "#7f8c8d"; // Default gray color for undefined priorities
    }
  };
  

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontFamily: "Arial, sans-serif",
        padding: "20px",
        backgroundColor: "#f4f6f9",
        color: "#333",
      }}
    >
      {/* Button to Toggle Calendar Preview */}
      <button
        onClick={() => setShowCalendar(true)}
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          padding: "10px 15px",
          backgroundColor: "#4a90e2",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "1em",
        }}
      >
        Academic Calendar
      </button>

      <h1 style={{ fontSize: "2.5em", color: "#4a90e2", marginBottom: "20px" }}>Teacher Dashboard</h1>

      {/* Routine Image */}
      <div
        style={{
          width: "60%",
          maxWidth: "800px",
          margin: "20px 0",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <img
          src={routine}
          alt="Routine"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "10px",
            transition: "transform 0.3s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        />
      </div>


      {/* Task List */}
      <div
        style={{
          width: "80%",
          maxWidth: "600px",
          backgroundColor: "#ffffff",
          borderRadius: "10px",
          padding: "20px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          marginTop: "20px",
        }}
      >
        <h2 style={{ fontSize: "1.8em", color: "#333", marginBottom: "15px", textAlign: "center" }}>Top Priority Tasks</h2>
        <ul style={{ listStyleType: "none", padding: "0" }}>
          {tasks.map((task) => (
            <li
              key={task.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "#d5d9ed",
                margin: "8px 0",
                padding: "10px 15px",
                borderRadius: "8px",
                boxShadow: "0 2px 6px rgba(0, 0, 0, 0.05)",
                fontSize: "1.1em",
                color: "#333",
              }}
            >
              <strong style={{ color: "#4a90e2" }}>{task.title}</strong>
              
              <div style={{ display: "flex", alignItems: "center", fontSize: "0.9em" }}>
                <span style={{ marginRight: "10px", color: "#555" }}>Deadline: {new Date(task.deadline).toLocaleDateString()}</span>
                <span
                  style={{
                    backgroundColor: getPriorityColor(task.priority),
                    padding: "3px 8px",
                    borderRadius: "4px",
                    fontWeight: "bold",
                    color: "#fff",
                  }}
                >
                  {task.priority}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>



      {/* Calendar Overlay */}
      {showCalendar && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: "1000",
          }}
          onClick={() => setShowCalendar(false)} // Hide overlay on click
        >
          <img
            src={academicCalendar}
            alt="Academic Calendar"
            style={{
              width: "40%",
              height: "100%",
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default TeacherDashboard;
