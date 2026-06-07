import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

function StudentDashboard() {
  const [roomName, setRoomName] = useState('');
  const [roomPassword, setRoomPassword] = useState('');
  const [room, setRoom] = useState(null);
  const [answers, setAnswers] = useState({});
  const token = useSelector(state => state.auth.token);

  const joinRoom = async () => {
    try {
      const res = await axios.post('http://localhost:3010/learning/join', { name: roomName, password: roomPassword }, { headers: { Authorization: `Bearer ${token}` } });
      setRoom(res.data.room);
    } catch (error) {
      alert('Invalid room or password');
    }
  };

  const submitAnswers = async () => {
    try {
      const res = await axios.post('http://localhost:3010/learning/submit', { roomId: room.id, answers: Object.entries(answers).map(([questionId, selectedAnswer]) => ({ questionId, selectedAnswer })) }, { headers: { Authorization: `Bearer ${token}` } });
      alert(`Score: ${res.data.score}`);
    } catch (error) {
      alert('Error submitting');
    }
  };

  // Giao diện form tham gia và quiz
  return (
    <div>
      <h2>Student Dashboard</h2>
      <input placeholder="Room Name" onChange={(e) => setRoomName(e.target.value)} />
      <input placeholder="Password" onChange={(e) => setRoomPassword(e.target.value)} />
      <button onClick={joinRoom}>Join Room</button>

      {room && (
        <div>
          <h3>Quiz in Room {room.name}</h3>
          {/* Loop questions, radio for options, update answers */}
          <button onClick={submitAnswers}>Submit</button>
        </div>
      )}
    </div>
  );
}

export default StudentDashboard;