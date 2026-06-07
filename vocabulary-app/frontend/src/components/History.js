import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

function History() {
  const [history, setHistory] = useState([]);
  const token = useSelector(state => state.auth.token);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get('http://localhost:3010/stats/history', { headers: { Authorization: `Bearer ${token}` } });
        setHistory(res.data.history);
      } catch (error) {
        alert('Error fetching history');
      }
    };
    fetchHistory();
  }, [token]);

  return (
    <div>
      <h2>Lịch Sử</h2>
      <ul>
        {history.map((item) => (
          <li key={item._id}>{item.action} - {item.details} at {item.createdAt}</li>
        ))}
      </ul>
    </div>
  );
}

export default History;