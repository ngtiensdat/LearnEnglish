# Báo Cáo Rà Soát Chất Lượng & Bảo Mật Codebase (AI Code Audit Report)
**Ngày thực hiện:** 08/06/2026

Báo cáo này được thực hiện dựa trên quy trình rà soát chất lượng mã nguồn dự án Học Từ Vựng (Monorepo gồm NestJS backend và Next.js 16 frontend).

---

## 1. Điểm số chất lượng codebase (Codebase Scoring)

Dưới đây là điểm số đánh giá dự án trên thang điểm 10 ở các tiêu chí cốt lõi:

| Tiêu chí đánh giá | Điểm số | Nhận xét tóm tắt |
| :--- | :---: | :--- |
| **Tính Bảo mật (Security)** | **6.5 / 10** | Hệ thống đã có cơ chế phân quyền (Guard) và chống IDOR tốt, tuy nhiên tồn tại lỗ hổng Path Traversal nghiêm trọng ở tính năng nộp bài TOEIC và lưu trữ token kém an toàn ở frontend. |
| **Kiến trúc (Clean Architecture)** | **8.5 / 10** | Phân lớp cực kỳ rõ ràng giữa Controller và Service. Controller không chứa business logic hay DB queries. Cấu trúc monorepo gọn gàng. |
| **Khả năng Bảo trì (Maintainability)** | **7.5 / 10** | Mã nguồn có cấu trúc tốt, tự động hóa build check và test check. Tuy nhiên dự án chưa thực sự có unit test thực tế và thiếu bộ linter chuẩn. |
| **Độ hoàn thiện (Production Readiness)** | **7.0 / 10** | Đã cấu hình và chạy thử thành công trên Render + Vercel + Neon Postgres. Cần cải thiện xử lý ảnh lỗi và chuẩn hóa cấu hình biến môi trường. |

---

## 2. Danh sách các lỗi phát hiện & Kiến nghị sửa đổi

### 🔴 [NGHIÊM TRỌNG] Lỗ hổng Path Traversal (Arbitrary File Read)
- **Vị trí**: File [learning.service.ts](file:///e:/LearnEnglish/vocabulary-app/backend/src/modules/learning/learning.service.ts#L70-L105) (Phương thức `submitToeic`)
- **Nguyên nhân**: Dữ liệu đầu vào `testId` và `part` nhận từ DTO `SubmitToeicDto` được đưa trực tiếp vào hàm `path.join` để đọc file hệ thống bằng `fs.readFileSync` mà không qua bất kỳ lớp kiểm tra tính hợp lệ của đường dẫn (path validation) nào.
  ```typescript
  const filePath = path.join(toeicDir, `test${testId}`, `${part}.json`);
  if (!fs.existsSync(filePath)) { ... }
  const fileContent = fs.readFileSync(filePath, 'utf8');
  ```
- **Nguy cơ**: Kẻ tấn công có thể thay đổi payload gửi lên API với `testId` dạng `../../` và `part` dạng `package` để đọc các file cấu hình nhạy cảm khác trên server (như các file cấu hình JSON, `package.json`...).
- **Giải pháp khắc phục**:
  1. Sử dụng thư viện `class-validator` để ràng buộc kiểu dữ liệu cho `testId` và `part` trong DTO chỉ được phép chứa các ký tự chữ và số (Alphanumeric):
     ```typescript
     @IsAlphanumeric()
     testId: string;
     ```
  2. Hoặc kiểm tra và sanitize đường dẫn trước khi đọc file để loại bỏ các ký tự điều hướng thư mục (`..`, `/`, `\`):
     ```typescript
     const safeTestId = testId.replace(/[^a-zA-Z0-9_-]/g, '');
     const safePart = part.replace(/[^a-zA-Z0-9_-]/g, '');
     ```

---

### 🟡 [TRUNG BÌNH] Lưu trữ Token nhạy cảm trong LocalStorage
- **Vị trí**: File [useAuthStore.ts](file:///e:/LearnEnglish/vocabulary-app/frontend/src/store/useAuthStore.ts#L24-L39)
- **Nguyên nhân**: Token JWT và thông tin phiên đăng nhập được lưu trữ trực tiếp vào `localStorage` của trình duyệt.
- **Nguy cơ**: Dễ bị tấn công **XSS (Cross-Site Scripting)**. Nếu hacker tiêm được script độc hại vào trang web thông qua các thư viện bên thứ 3 hoặc lỗ hổng tiêm dữ liệu, chúng có thể đọc trực tiếp `localStorage.getItem('token')` và đánh cắp phiên đăng nhập của người dùng.
- **Giải pháp khắc phục**: Chuyển sang lưu trữ token trong **HTTP-Only, Secure Cookies**. Trình duyệt sẽ tự động đính kèm cookie này trong các yêu cầu gửi lên API mà mã nguồn JavaScript không thể can thiệp hay đọc được, loại bỏ hoàn toàn nguy cơ bị XSS đánh cắp token.

---

### 🟡 [TRUNG BÌNH] Sử dụng Magic String cho Vai trò người dùng (User Role)
- **Vị trí**: File [vocabulary.service.ts](file:///e:/LearnEnglish/vocabulary-app/backend/src/modules/vocabulary/vocabulary.service.ts#L37)
- **Nguyên nhân**: Sử dụng chuỗi thô `'admin'` thay vì Enum được định nghĩa trong cơ sở dữ liệu.
  ```typescript
  if (role !== 'admin' && vocab.creator !== userId) { ... }
  ```
- **Nguy cơ**: Dễ xảy ra sai sót gõ nhầm (typo) trong mã nguồn dẫn đến lỗi phân quyền nghiêm trọng lúc runtime mà TypeScript compiler không thể cảnh báo.
- **Giải pháp khắc phục**: Import và sử dụng Enum `UserRole` từ thư viện `@prisma/client`:
  ```typescript
  import { UserRole } from '@prisma/client';
  
  if (role !== UserRole.admin && vocab.creator !== userId) { ... }
  ```

---

### 🟢 [THẤP] Sử dụng thẻ `<img>` thô không có cơ chế Fallback
- **Vị trí**: File [page.tsx (TOEIC Test Player)](file:///e:/LearnEnglish/vocabulary-app/frontend/src/app/toeic/%5Bid%5D/%5Bpart%5D/page.tsx#L154-L159)
- **Nguyên nhân**: Sử dụng thẻ `<img>` tiêu chuẩn của HTML mà không có cơ chế xử lý lỗi khi ảnh bị 404 (onError fallback).
- **Nguy cơ**: Nếu đường dẫn ảnh của câu hỏi thi TOEIC bị lỗi hoặc không tồn tại trên server, giao diện người dùng sẽ hiện biểu tượng ảnh vỡ gây mất thẩm mỹ và giảm trải nghiệm người dùng.
- **Giải pháp khắc phục**: Cấu hình thêm hàm xử lý lỗi hoặc xây dựng một component `SafeImage` có cơ chế tải ảnh fallback (ảnh mặc định) khi có lỗi xảy ra:
  ```tsx
  <img
    src={imageSrc}
    alt={`Question ${q.id}`}
    onError={(e) => {
      e.currentTarget.src = '/assets/images/default-question.png';
    }}
  />
  ```

---

### 🟢 [THẤP] Dọn dẹp thư mục rác trong Backend
- **Vị trí**: Thư mục gốc dự án Backend
- **Nguyên nhân**: Tồn tại nhiều thư mục thừa như `api-gateway`, `auth`, `learning`, `notification`, `room`, `stats`, `vocabulary` nằm trực tiếp dưới thư mục `backend`. Đây có vẻ là các thư mục cũ từ cấu trúc microservices trước đó nhưng không còn được sử dụng trong phiên bản NestJS Monolith hiện tại.
- **Nguy cơ**: Gây bối rối cho lập trình viên mới gia nhập dự án và làm nặng git repository không cần thiết.
- **Giải pháp khắc phục**: Thực hiện xóa bỏ các thư mục không sử dụng này để giữ thư mục gốc sạch sẽ, chỉ tập trung vào mã nguồn trong `src/`.

---

## 3. Điểm mạnh lớn nhất (Biggest Strengths)

1. **Khả năng phòng chống IDOR (Insecure Direct Object Reference) tốt**: Ở các nghiệp vụ nhạy cảm như xóa phòng, thêm câu hỏi, hay ôn tập từ vựng, hệ thống đều kiểm tra kỹ lưỡng xem người gửi yêu cầu có phải là người tạo ra phòng/từ vựng đó hay không (`room.createdBy !== userId`).
2. **Cấu trúc NestJS & Codebase sạch sẽ**: Áp dụng chuẩn thiết kế tốt, sử dụng Validation Pipes, Dependency Injection và tách biệt rõ ràng trách nhiệm của các lớp.

---

## 4. Giải pháp cải tiến đề xuất (Top 5 Improvements)

1. **Sửa đổi lỗ hổng Path Traversal**: Áp dụng `@IsAlphanumeric()` cho DTO kiểm tra đề thi TOEIC.
2. **Chuyển cơ chế lưu Token**: Chuyển đổi từ `localStorage` sang HTTP-Only Cookie cho cả Frontend và Backend.
3. **Cấu hình lại Linter cho Next.js**: Xử lý lỗi lệnh `next lint` trong Next.js 16 bằng cách bổ sung cấu hình ESLint chuẩn vào `devDependencies`.
4. **Bổ sung Unit Tests thực tế**: Viết các file test `.spec.ts` thực sự cho các service cốt lõi (như tính toán giãn cách ôn tập SM-2 trong `VocabularyService`).
5. **Xây dựng Component hiển thị hình ảnh an toàn**: Sử dụng component `SafeImage` để xử lý fallback khi các tài nguyên học tập (ảnh, audio) bị thiếu.
