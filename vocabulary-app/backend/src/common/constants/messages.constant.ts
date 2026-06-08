/**
 * Application-wide message constants.
 * No magic strings allowed — all user-facing messages go here.
 */
export const MESSAGES = {
  AUTH: {
    LOGIN_SUCCESS: 'Đăng nhập thành công',
    REGISTER_SUCCESS: 'Đăng ký thành công',
    LOGOUT_SUCCESS: 'Đã đăng xuất',
    INVALID_CREDENTIALS: 'Sai email hoặc mật khẩu',
    UNAUTHORIZED: 'Không có quyền truy cập',
    TOKEN_EXPIRED: 'Phiên đăng nhập đã hết hạn',
  },
  ROOMS: {
    CREATE_SUCCESS: 'Tạo phòng thành công',
    JOIN_SUCCESS: 'Tham gia phòng thành công',
    DELETE_SUCCESS: 'Xóa phòng thành công',
    NOT_FOUND: 'Không tìm thấy phòng học',
    WRONG_PASSWORD: 'Sai mật khẩu phòng học',
    ALREADY_MEMBER: 'Bạn đã là thành viên của phòng này',
    FORBIDDEN: 'Bạn không có quyền thực hiện thao tác này trên phòng học này',
  },
  VOCABULARY: {
    CREATE_SUCCESS: 'Thêm từ vựng thành công',
    DELETE_SUCCESS: 'Xóa từ vựng thành công',
    UPLOAD_SUCCESS: 'Tải lên từ vựng thành công',
    NOT_FOUND: 'Không tìm thấy từ vựng',
  },
  LEARNING: {
    SUBMIT_SUCCESS: 'Nộp bài thành công',
    INVALID_TEST: 'Không tìm thấy đề thi',
  },
  STATS: {
    FETCH_SUCCESS: 'Lấy dữ liệu thống kê thành công',
    RESET_SUCCESS: 'Đặt lại dữ liệu học tập thành công',
  },
  GENERAL: {
    NOT_FOUND: 'Không tìm thấy tài nguyên yêu cầu',
    INTERNAL_ERROR: 'Lỗi hệ thống, vui lòng thử lại sau',
    BAD_REQUEST: 'Yêu cầu không hợp lệ',
    FORBIDDEN: 'Bạn không có quyền thực hiện thao tác này',
  },
} as const;
