// src/components/TeacherList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TeacherList = ({ courseId }) => {
  const [teachers, setTeachers] = useState([]);
  const [selectedTeachers, setSelectedTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/teachers');
        setTeachers(response.data);
      } catch (err) {
        setError('Error fetching teachers');
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  const handleTeacherSelect = (teacherId) => {
    setSelectedTeachers((prevSelected) =>
      prevSelected.includes(teacherId)
        ? prevSelected.filter((id) => id !== teacherId)
        : [...prevSelected, teacherId]
    );
  };

  const handleAssignTeachers = async () => {
    try {
      
      await axios.put(`http://localhost:5000/api/courses/${courseId}`, {
        courseTeachers: selectedTeachers,
      });

      await Promise.all(
        selectedTeachers.map(async (teacherId) => {
          await axios.put(`http://localhost:5000/api/teachers/${teacherId}`, {
            courses: courseId,
          });
        })
      );

      alert('Teachers assigned successfully!');
    } catch (error) {
      const message = error.response ? error.response.data.message : error.message;
      alert(`Failed to assign teachers: ${message}`);
    }
  };

  if (loading) {
    return (
      <div style={styles.centered}>
        <div style={styles.loader}></div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ ...styles.alert, ...styles.error }}>{error}</div>
    );
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Select Teachers for the Course</h2>

      <ul style={styles.list}>
        {teachers.map((teacher) => (
          <li key={teacher._id} style={styles.listItem}>
            <label style={styles.label}>
              <input
                type="checkbox"
                checked={selectedTeachers.includes(teacher._id)}
                onChange={() => handleTeacherSelect(teacher._id)}
                style={styles.checkbox}
              />
              {teacher.firstName} {teacher.lastName}
            </label>
          </li>
        ))}
      </ul>

      <button
        onClick={handleAssignTeachers}
        style={{
          ...styles.button,
          ...(selectedTeachers.length === 0 && styles.buttonDisabled),
        }}
        disabled={selectedTeachers.length === 0}
      >
        Assign Selected Teachers
      </button>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '50px auto',
    padding: '20px',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  heading: {
    fontSize: '24px',
    marginBottom: '20px',
    color: '#333',
  },
  list: {
    listStyleType: 'none',
    padding: 0,
    marginBottom: '20px',
  },
  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '10px',
  },
  label: {
    fontSize: '18px',
    color: '#555',
  },
  checkbox: {
    marginRight: '10px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#4caf50',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
    cursor: 'not-allowed',
  },
  centered: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  loader: {
    width: '50px',
    height: '50px',
    border: '5px solid #f3f3f3',
    borderTop: '5px solid #3498db',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  alert: {
    maxWidth: '400px',
    margin: '20px auto',
    padding: '10px',
    borderRadius: '5px',
    textAlign: 'center',
  },
  error: {
    backgroundColor: '#f8d7da',
    color: '#721c24',
  },
};

export default TeacherList;
