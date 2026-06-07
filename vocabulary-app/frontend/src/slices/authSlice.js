import { createSlice } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode'; // ĐÃ SỬA: DÙNG NAMED EXPORT

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('token') || null,
    role: localStorage.getItem('role') || null,
    userId: localStorage.getItem('userId') || null
  },
  reducers: {
    setCredentials: (state, action) => {
      const { token } = action.payload;
      state.token = token;

      if (token) {
        try {
          const decoded = jwtDecode(token); // DÙNG ĐÚNG HÀM
          state.userId = decoded.id;
          state.role = decoded.role;
        } catch (error) {
          console.error('Token không hợp lệ:', error);
        }
      }

      localStorage.setItem('token', token);
      localStorage.setItem('userId', state.userId);
      localStorage.setItem('role', state.role);
    },
    logout: (state) => {
      state.token = null;
      state.role = null;
      state.userId = null;
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('userId');
    }
  }
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;