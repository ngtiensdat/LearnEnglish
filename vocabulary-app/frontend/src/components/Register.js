import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('http://localhost:3010/auth/register', { 
  username,
  email,
  password,
  role
}, { 
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' }
});
      const { token } = res.data;
      if (!token) {
        throw new Error('Không nhận được token từ server');
      }
      // Lấy role từ token (giả định backend mã hóa role vào token)
      const decoded = JSON.parse(atob(token.split('.')[1]));
      dispatch(setCredentials({ token, role: decoded.role }));
      navigate('/dashboard');
    } catch (error) {
      console.error('Lỗi đăng ký:', error.response?.data || error.message);
      setError(
        error.response?.data?.message ||
        (error.code === 'ECONNABORTED' ? 'Kết nối timeout. Vui lòng kiểm tra server.' :
         error.message) ||
        'Đăng ký thất bại. Vui lòng thử lại.'
      );
    }
  };

  return (
    <motion.div
      className="flex justify-center items-center min-h-screen"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="card w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Đăng Ký</h2>
        {error && (
          <motion.div
            className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {error}
          </motion.div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2 font-medium">Tên Người Dùng</label>
            <input
              type="text"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Nhập tên người dùng"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2 font-medium">Email</label>
            <input
              type="email"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Nhập email"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2 font-medium">Mật Khẩu</label>
            <input
              type="password"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Nhập mật khẩu"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2 font-medium">Vai Trò</label>
            <select
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="student">Học Sinh</option>
              <option value="teacher">Giáo Viên</option>
              <option value="admin">Quản Trị Viên</option>
            </select>
          </div>
          <motion.button
            type="submit"
            className="btn-primary w-full"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Đăng Ký
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
}

export default Register;