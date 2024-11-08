import React, { useState } from 'react';
import axios from 'axios';

const SendMessage = () => {
  const [recipient, setRecipient] = useState('');
  const [content, setContent] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [error, setError] = useState('');

  const handleSendMessage = async () => {
    setConfirmation('');
    setError('');

    if (!recipient || !content) {
      setError('Please fill in all required fields.');
      return;
    }

    try {
      const senderId = '63f8e2d3b14c5a5f7e8b45d9'; // Replace with actual sender ID from authentication or state
      const response = await axios.post('http://localhost:5000/api/messaging-system/send', {
        senderId,
        recipientId: "63f8e2d3b14c5a5f7e8b45da",
        content,
      });

      if (response.data.success) {
        setConfirmation(`Message sent at ${new Date().toLocaleString()}`);
      } else {
        setError(response.data.message || 'Message failed to send.');
      }
    } catch (err) {
      if (err.response && err.response.status === 500) {
        setError('System error – unable to send message. Please try again later.');
      } else {
        setError('Recipient not available.');
      }
    }
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.container}>
        <h2 style={styles.heading}>Send Message</h2>

        <div style={styles.formGroup}>
          <label style={styles.label}>Recipient:</label>
          <select
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            style={styles.select}
          >
            <option value="">Select Recipient</option>
            <option value="chairman">Department Chairman</option>
            <option value="examCommittee">Exam Committee</option>
          </select>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Message Content:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter your message here"
            style={styles.textarea}
          />
        </div>

        <button onClick={handleSendMessage} style={styles.button}>Send Message</button>

        {confirmation && (
          <div style={styles.confirmation}>
            <p>{confirmation}</p>
          </div>
        )}

        {error && (
          <div style={styles.error}>
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  pageContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#f0f0f0',
  },
  container: {
    width: '100%',
    maxWidth: '500px',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#ffffff',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333',
  },
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '5px',
  },
  select: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  textarea: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    resize: 'vertical',
    minHeight: '80px',
  },
  button: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#4CAF50',
    color: 'white',
    cursor: 'pointer',
  },
  confirmation: {
    marginTop: '20px',
    padding: '10px',
    backgroundColor: '#e7f4e4',
    borderRadius: '4px',
    color: '#2c662d',
    textAlign: 'center',
  },
  error: {
    marginTop: '20px',
    padding: '10px',
    backgroundColor: '#fdecea',
    borderRadius: '4px',
    color: '#a94442',
    textAlign: 'center',
  },
};

export default SendMessage;

