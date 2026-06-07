import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

function TeacherDashboard() {
  const [roomName, setRoomName] = useState('');
  const [roomPassword, setRoomPassword] = useState('');
  const [showScore, setShowScore] = useState(true);
  const [questionContent, setQuestionContent] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [roomId, setRoomId] = useState(''); // For adding questions
  const token = useSelector(state => state.auth.token);

  const createRoom = async () => {
    try {
      await axios.post('http://localhost:3010/rooms', { name: roomName, password: roomPassword, showScore }, { headers: { Authorization: `Bearer ${token}` } });
      alert('Room created');
    } catch (error) {
      alert('Error creating room');
    }
  };

  const addQuestion = async () => {
    try {
      await axios.post(`http://localhost:3010/rooms/${roomId}/questions`, { content: questionContent, options, correctAnswer }, { headers: { Authorization: `Bearer ${token}` } });
      alert('Question added');
    } catch (error) {
      alert('Error adding question');
    }
  };

  const deleteRoom = async () => {
    try {
      await axios.delete(`http://localhost:3010/rooms/${roomId}`, { headers: { Authorization: `Bearer ${token}` } });
      alert('Room deleted');
    } catch (error) {
      alert('Error deleting room');
    }
  };

  // Giao diện form...
  return (
    <div>
      <h2>Teacher Dashboard</h2>
      <input placeholder="Room Name" onChange={(e) => setRoomName(e.target.value)} />
      <input placeholder="Password" onChange={(e) => setRoomPassword(e.target.value)} />
      <label>Show Score: <input type="checkbox" checked={showScore} onChange={(e) => setShowScore(e.target.checked)} /></label>
      <button onClick={createRoom}>Create Room</button>

      <hr />
      <input placeholder="Room ID" onChange={(e) => setRoomId(e.target.value)} />
      <input placeholder="Question Content" onChange={(e) => setQuestionContent(e.target.value)} />
      {/* Input for options and correctAnswer */}
      <button onClick={addQuestion}>Add Question</button>
      <button onClick={deleteRoom}>Delete Room</button>
    </div>
  );
}

export default TeacherDashboard;