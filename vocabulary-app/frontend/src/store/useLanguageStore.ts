import { create } from 'zustand';

export type Language = 'en' | 'vi';

export const translations = {
  en: {
    navbar: {
      schoolPlans: "School Plans",
      library: "Library",
      business: "For Business",
      dashboard: "Dashboard",
      learn: "Learn",
      quiz: "Quiz",
      stats: "Stats",
      logout: "Logout",
      login: "Login",
      register: "Register",
      getQuote: "Get a quote",
      enterCode: "Enter code",
      settings: "Settings",
    },
    settings: {
      title: "Settings",
      language: "Language",
      english: "English",
      vietnamese: "Vietnamese",
      languageDesc: "Select your preferred interface language",
      titleDesc: "Customize your application preferences",
    },
    dashboard: {
      title: "TOEIC Master",
      level: "Level: Intermediate",
      needHelp: "Need help?",
      overview: "Overview",
      rooms: "Vocabulary Rooms",
      quizzes: "Practice & Quizzes",
      performance: "Performance & Stats",
      streak: "Daily Streak",
      weeklyStudy: "Weekly Study",
      completedLessons: "Completed Lessons",
      curriculumComplete: "of curriculum complete",
      recommended: "Recommended Lessons",
      upcomingTests: "Upcoming Mock Tests",
      flashcards: "Vocabulary Flashcards",
      reviewLink: "Review",
      accuracy: "Overall Accuracy",
      strongSkills: "Strong Skills",
      weakSkills: "Weak Skills",
    }
  },
  vi: {
    navbar: {
      schoolPlans: "Kế hoạch học tập",
      library: "Thư viện",
      business: "Doanh nghiệp",
      dashboard: "Bảng điều khiển",
      learn: "Học tập",
      quiz: "Kiểm tra",
      stats: "Thống kê",
      logout: "Đăng xuất",
      login: "Đăng nhập",
      register: "Đăng ký",
      getQuote: "Nhận báo giá",
      enterCode: "Nhập mã",
      settings: "Cài đặt",
    },
    settings: {
      title: "Cài đặt",
      language: "Ngôn ngữ",
      english: "Tiếng Anh",
      vietnamese: "Tiếng Việt",
      languageDesc: "Chọn ngôn ngữ hiển thị mong muốn",
      titleDesc: "Tùy chỉnh cấu hình ứng dụng của bạn",
    },
    dashboard: {
      title: "Luyện thi TOEIC",
      level: "Trình độ: Trung cấp",
      needHelp: "Hỗ trợ?",
      overview: "Tổng quan",
      rooms: "Phòng từ vựng",
      quizzes: "Luyện tập & Kiểm tra",
      performance: "Hiệu suất & Thống kê",
      streak: "Chuỗi ngày học",
      weeklyStudy: "Thời gian học tuần",
      completedLessons: "Bài học đã hoàn thành",
      curriculumComplete: "lộ trình hoàn thành",
      recommended: "Bài học gợi ý",
      upcomingTests: "Lịch thi thử sắp tới",
      flashcards: "Thẻ từ vựng",
      reviewLink: "Ôn tập",
      accuracy: "Độ chính xác chung",
      strongSkills: "Kỹ năng tốt",
      weakSkills: "Kỹ năng yếu",
    }
  }
} as const;

interface LanguageState {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (path: string) => string;
}

export const useLanguageStore = create<LanguageState>((set, get) => {
  // Safe localStorage check for Client-Side Rendering
  const getInitialLanguage = (): Language => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('language') as Language;
      if (saved === 'en' || saved === 'vi') return saved;
    }
    return 'vi'; // Default to Vietnamese
  };

  return {
    language: getInitialLanguage(),
    setLanguage: (lang) => {
      if (typeof window !== 'undefined') {
        localStorage.setItem('language', lang);
      }
      set({ language: lang });
    },
    t: (path) => {
      const lang = get().language;
      const keys = path.split('.');
      let current: any = translations[lang];

      for (const key of keys) {
        if (current && typeof current === 'object' && key in current) {
          current = current[key];
        } else {
          return path; // Return key path as fallback
        }
      }

      return typeof current === 'string' ? current : path;
    }
  };
});
