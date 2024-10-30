import React from "react";
import { useState, useEffect } from "react";
import routine from "../resources/images/semester_routine.jpg";

const TeacherDashboard = () => {

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        // Replace with your actual API endpoint if using a real backend
        const response = await fetch("http://localhost:5000/api/teacher-dashboard/dsfvarswet4534sd");
        
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

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontFamily: "Arial, sans-serif",
        padding: "20px",
        backgroundColor: "#f4f6f9",
        color: "#333",
      }}
    >
      <h1 style={{ fontSize: "2.5em", color: "#4a90e2", marginBottom: "20px" }}>Teacher Dashboard</h1>

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
                backgroundColor: "#f9f9f9",
                margin: "8px 0",
                padding: "10px 15px",
                borderRadius: "8px",
                boxShadow: "0 2px 6px rgba(0, 0, 0, 0.05)",
                fontSize: "1.1em",
                color: "#333",
              }}
            >
              <strong style={{ color: "#4a90e2" }}>{task.title}</strong>
              <span
                style={{
                  backgroundColor: "#e7f3ff",
                  padding: "3px 8px",
                  borderRadius: "4px",
                  fontWeight: "bold",
                  color: "#333",
                }}
              >
                {task.priority}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TeacherDashboard;
