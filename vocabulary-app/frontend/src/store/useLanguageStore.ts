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
    login: {
      title: "Welcome Back",
      subtitle: "Sign in to your Learn English account",
      email: "Email",
      password: "Password",
      signIn: "Sign In",
      loggingIn: "Logging in...",
      noAccount: "Don't have an account?",
      registerHere: "Register here",
      error: "Login failed. Please check your credentials.",
    },
    register: {
      title: "Create Account",
      subtitle: "Start your English journey today",
      username: "Username",
      usernamePlaceholder: "Your name",
      email: "Email",
      emailPlaceholder: "name@example.com",
      password: "Password",
      passwordPlaceholder: "•••••••• (Min 6 characters)",
      role: "Role",
      student: "Student",
      teacher: "Teacher",
      admin: "Administrator",
      submit: "Register",
      loading: "Creating Account...",
      hasAccount: "Already have an account?",
      signInHere: "Sign In here",
      error: "Registration failed. Please try again.",
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
      // Extra details
      scoreProgress: "TOEIC Score Progress",
      targetText: "Target: 750+",
      searchPlaceholder: "Search lessons, tests, vocabularies...",
      practiceMetrics: "TOEIC Practice Metrics",
      streakLabel: "Streak",
      streakDays: "Days",
      studyHrs: "Hrs",
      performanceAnalytics: "Performance Analytics",
      availableClassrooms: "Available Vocabulary Classrooms",
      noClassroomsFound: "No classrooms found. Join or create a room above.",
      deleteConfirmText: "Are you sure you want to delete this vocabulary room and all related questions?",
      deleteSuccess: "Delete room successful",
      deleteFailed: "Delete failed",
      joinSuccess: "Joined successfully",
      joinFailed: "Join failed",
      createSuccess: "Room created successfully",
      createFailed: "Create room failed: ",
      addVocabSuccess: "Word added successfully",
      addVocabFailed: "Add word failed: ",
      uploadSuccessCount: "Successfully uploaded {count} vocabulary words",
      uploadFailed: "Upload failed: ",
      saveQuizSuccess: "Questions saved successfully",
      saveQuizFailed: "Save failed: ",
      roomRequired: "Please select a room",
      optError: "Please fill in all questions and 4 options",
      minOneQuestion: "Must have at least 1 question",
      deleteVocabSuccess: "Word deleted successfully",
      deleteVocabFailed: "Delete failed",
      loadVocabFailed: "Unable to load vocabulary",
      emptyVocabInRoom: "No vocabulary words found in this room.",
      // Sub-pages/Tabs content translations
      roomsTab: {
        createTitle: "Create Vocabulary Room",
        joinTitle: "Join Vocabulary Room",
        roomName: "Room Name",
        roomPassword: "Room Password",
        displayScore: "Display scores to students",
        submitJoin: "Join Room",
        submitCreate: "Create Room",
        addWord: "Add Words to Room",
        wordLabel: "Word (English)",
        meaningLabel: "Meaning (Vietnamese)",
        exampleLabel: "Example Sentence (Optional)",
        targetRoom: "Target Room ID",
        submitAddWord: "Add Word",
        uploadExcel: "Upload Excel file of vocabulary",
        selectFile: "Choose File",
        selectRoomToInspect: "Select target room to inspect word database",
        noWords: "No vocabulary words found in this room.",
        orUploadExcel: "Or upload vocabulary Excel file (.xlsx)",
        uploadSpreadsheet: "Upload spreadsheet"
      },
      quizzesTab: {
        historyTitle: "Practice History & Quizzes",
        historyDesc: "Review your recent classroom scores and exercise logs.",
        joinSession: "Join new session",
        readyTitle: "Quiz Practice Module is Ready",
        readyDesc: "Please head to the 'Vocabulary Rooms' tab, select a joined classroom, and click 'Take Quiz' to begin testing your knowledge.",
        createMockQuestions: "Create Mock Practice Questions",
        selectTargetRoom: "Select target room",
        questionPlaceholder: "Question #{num} Content",
        optionPlaceholder: "Option {char}",
        correctAnswerOption: "Correct Answer Option:",
        removeQuestion: "Remove this question",
        addQuestionBlock: "+ Add Question Block",
        saveQuestionsToDb: "Save Questions to DB"
      },
      statsTab: {
        allocationTitle: "Weekly Study Allocation",
        insightsTitle: "Learning Insights",
        nextGoal: "Next Achievement Goal",
        activeLearnerDesc: "Complete 3 more vocabulary flashcard reviews this week to unlock the 'Active Learner' badge!",
        memorized: "Vocabulary memorized",
        mockTestsTaken: "Total mock tests taken",
        avgRating: "Average test rating",
        wordsText: "words",
        testsText: "tests"
      }
    },
    landing: {
      sparkles: "Next-Generation TOEIC Practice",
      titleBefore: "Master the TOEIC Exam with ",
      titleHighlight: "AI-Powered",
      titleAfter: " Practice",
      subtitle: "A structured, personalized learning platform designed to help university students and job seekers achieve their target score of 750+ through smart analytics and active recall.",
      startBtn: "Start practicing free",
      pricingBtn: "View pricing plans",
      estScore: "Estimated Score",
      sidebar: {
        studyDeck: "Study Deck",
        overview: "Overview",
        flashcards: "Flashcards",
        mockTests: "Mock Tests",
        analytics: "Analytics"
      },
      metrics: {
        title: "TOEIC Practice Metrics",
        accuracy: "Accuracy",
        streak: "Streak",
        streakDays: "12 Days",
        recTitle: "Recommended Today",
        recSub: "Gerunds vs Infinitives",
        sm2Title: "SM-2 Flashcards",
        sm2Review: "Review today",
        sm2Days: "2 days left"
      },
      features: {
        title: "Engineered for score improvement",
        subtitle: "No tricks, just effective study frameworks optimized for language acquisition.",
        feat1Title: "AI Answer Explanations",
        feat1Desc: "Instant grammatical breakdowns and sentence structures for Part 5, 6, and 7 questions. Understand why your answers are correct or incorrect.",
        feat2Title: "SM-2 Spaced Repetition",
        feat2Desc: "Flashcard schedules dynamically adapt to your learning pace. Retain high-frequency business vocabulary with minimal daily effort.",
        feat3Title: "Classroom Rooms",
        feat3Desc: "Join active study rooms created by teachers or study groups. Practice quizzes collaboratively and keep up with group milestones.",
        feat4Title: "Detailed Analytics",
        feat4Desc: "Identify accuracy rates and trace weak skills down to specific Parts. Focus your study hours exactly where you leak points."
      },
      roadmap: {
        title: "A structured path to 750+",
        subtitle: "Our four-step cycle translates effort into quantifiable score growth.",
        step1Title: "Diagnostic Assessment",
        step1Desc: "Establish your initial score baseline with a fast, targeted grammar and vocabulary evaluation.",
        step2Title: "Targeted Exercises",
        step2Desc: "Receive recommended reading and listening exercises based on your weakness areas. Stop wasting time on what you already know.",
        step3Title: "Spaced Vocabulary Reinforcement",
        step3Desc: "Review flashcards compiled from your mistakes. Our SM-2 scheduler will prompt review intervals to shift words to long-term memory.",
        step4Title: "Simulated Exam Testing",
        step4Desc: "Take full-length mock exams timed under standard conditions. Track your projected score trajectory week by week."
      },
      aiHighlight: {
        tag: "Interactive Explanations",
        title: "Learn from mistakes with immediate AI feedback",
        desc: "No more flipping to the back of test prep books to find minimal explanations. Our AI assistant analyzes the sentence context, explains grammar rules, and defines challenging vocabulary options dynamically.",
        bullet1: "Full Part 5-7 grammatical mapping",
        bullet2: "Contextual translations of business idioms",
        bullet3: "Adapted score improvement tips",
        questionTag: "Question #14 (Part 5)",
        correctTag: "substantial (Correct)",
        aiExplanation: "AI Explanation",
        aiExplanationText: "Since the blank space precedes the compound noun financial forecast, an adjective modifier is required. substantial (adj) meaning 'significant, solid' is the most suitable contextually."
      },
      testimonials: {
        title: "What our students say",
        subtitle: "Real outcomes from university candidates and working professionals.",
        t1: "\"As a senior university student, I needed 700+ to graduate. The spaced repetition vocabulary rooms helped me memorize key business terms in under 3 weeks. I scored 780!\"",
        t1Author: "Minh Anh Nguyen",
        t1Role: "NEU Senior Student",
        t2: "\"The AI explanation tool is the best part. When doing mock tests, I could immediately understand why option B was correct instead of option C. It saved me hours of research.\"",
        t2Author: "Hoang Nam Tran",
        t2Role: "Software Engineer Job Seeker",
        t3: "\"I managed to raise my TOEIC score from 580 to 820 using only this platform. The weak skills analytics allowed me to concentrate entirely on Part 7 reading practice.\"",
        t3Author: "Thi Thu Thao Le",
        t3Role: "Marketing Professional"
      },
      pricing: {
        title: "Simple, transparent pricing",
        subtitle: "Choose a plan that fits your preparation timeframe. Cancel anytime.",
        freeTitle: "Free Basic",
        freeDesc: "For general practice and review",
        freePrice: "$0",
        freePeriod: "/ forever",
        freeBtn: "Sign up free",
        freeFeat1: "Access to standard vocab rooms",
        freeFeat2: "Basic practice quizzes",
        freeFeat3: "Personal progress tracking",
        plusTitle: "Premium Prep",
        plusDesc: "Accelerated score improvement package",
        plusPrice: "$12",
        plusPeriod: "/ month",
        plusRecommended: "Recommended",
        plusBtn: "Start Premium Prep",
        plusFeat1: "Unlimited Mock Tests",
        plusFeat2: "AI Answer Explanations",
        plusFeat3: "SM-2 Spaced Repetition scheduler",
        plusFeat4: "Detailed weakness skill mapping"
      },
      ctaBottom: {
        title: "Ready to boost your TOEIC score?",
        desc: "Create an account in less than 30 seconds and start practicing on the most efficient platform for university graduates and job seekers.",
        btn: "Get started for free"
      },
      footer: {
        desc: "Engineered with care to accelerate English proficiency and test readiness using modern active recall algorithms.",
        disclaimer: "© 2026 TOEIC Master. All rights reserved. TOEIC is a registered trademark of ETS. This platform is not endorsed or approved by ETS.",
        rights: "All rights reserved.",
        privacy: "Privacy Policy",
        terms: "Terms of Service",
        product: "Product",
        practiceRooms: "Practice Rooms",
        mockTests: "Mock Tests",
        aiAssistant: "AI Assistant",
        pricingPlans: "Pricing Plans",
        resources: "Resources",
        toeicVocab: "TOEIC Vocabulary",
        grammarGuides: "Grammar Guides",
        instPlans: "Institutional Plans",
        privacySecurity: "Privacy & Security"
      }
    },
    schoolPlans: {
      title: "School & Institutional Plans",
      desc: "Deploy Learn English across classrooms, institutions, or entire schools with robust reporting.",
      popular: "Popular",
      getStarted: "Get Started",
      plans: {
        lite: {
          name: "Classroom Lite",
          price: "$49/mo",
          desc: "Perfect for single classrooms and tutoring groups.",
          features: [
            "Up to 40 students",
            "Vocabulary & Quiz room builder",
            "Standard analytical reports",
            "Email support"
          ]
        },
        pro: {
          name: "School Pro",
          price: "$199/mo",
          desc: "Designed for institutions and complete departments.",
          features: [
            "Unlimited students",
            "Advanced analytics dashboard",
            "Premium IELTS & TOEIC mock exams",
            "24/7 dedicated support",
            "Custom school logo branding"
          ]
        }
      }
    },
    library: {
      title: "Resource Library",
      desc: "Prepare for TOEIC, IELTS Academic, and IELTS General Training with AI-enhanced practice materials.",
      accessNow: "Access Now",
      ctaTitle: "Which Test Are You Taking?",
      ctaDesc: "Choose your path and get a personalized study plan with real-time progress tracking.",
      ctaBtn: "Start Practicing Now",
      toeicTitle: "TOEIC Practice Tests",
      toeicDesc: "Full-length TOEIC mock exams with detailed score reports and answer explanations.",
      ieltsAcadTitle: "IELTS Academic",
      ieltsAcadDesc: "Complete IELTS Academic practice tests with AI-powered writing & speaking feedback.",
      ieltsGenTitle: "IELTS General",
      ieltsGenDesc: "Realistic General Training tests for immigration & work, with instant band score prediction."
    },
    business: {
      title: "Learn English For Business",
      desc: "Tailored training programs, progress dashboards, and professional assessments designed for modern global teams.",
      whyTitle: "Why Partner With Us?",
      why1Title: "Custom Curriculum",
      why1Desc: "Aligned with your industry sectors, target roles, and daily corporate communications.",
      why2Title: "Interactive Analytics",
      why2Desc: "Monitor employee engagement, exam performances, and overall speaking development.",
      why3Title: "Premium Mock Exams",
      why3Desc: "Regular assessment tests matching strict standard formats.",
      contactTitle: "Contact Enterprise Team",
      placeholderName: "Your Name",
      placeholderEmail: "Work Email",
      placeholderText: "Tell us about your team size and training requirements",
      submitBtn: "Request Enterprise Quote",
      contactSuccess: "Contact sent!"
    },
    ielts: {
      backBtn: "Back to Library",
      acadTitle: "IELTS Academic Preparation",
      acadDesc: "Prepare for IELTS Academic with AI-evaluated Writing & Speaking, plus automatic grading for Reading & Listening.",
      genTitle: "IELTS General Training",
      genDesc: "Prepare for IELTS General Training for immigration and work with our instant Band Score prediction system.",
      alert: "IELTS content is being prepared. In the meantime, please check out the available TOEIC practice tests.",
      toeicBtn: "Practice TOEIC Now"
    },
    toeic: {
      title: "TOEIC Practice Hub",
      desc: "Full-length TOEIC tests with instant scoring, detailed explanations, and progress tracking.",
      backBtn: "Back to Hub",
      backDetailBtn: "Back to Details",
      mins: "mins",
      partsAndQuestions: "7 parts | 200 questions",
      detailBtn: "Test Details",
      detailSub: "Practice individual Listening/Reading sections or take a full mock test (Full Test).",
      choosePart: "Select a section to practice",
      fullTestBtn: "Take Full Test (120 mins)",
      loading: "Loading test...",
      loadError: "Test Load Error",
      loadErrorDesc: "No corresponding test data found.",
      question: "Question",
      footerDesc: "Complete your questions",
      answered: "Answered",
      submitBtn: "Submit Test",
      submittingBtn: "Submitting test...",
      submitSuccess: "🎉 Submission successful! Your score: ",
      submitError: "An error occurred during submission",
      loginRequired: "Please login to submit your test.",
      resultTitle: "Your Test Results",
      resultDesc: "correct answers",
      fullTest: "Full TOEIC Test",
      loadFailedToast: "Unable to load test data"
    },
    statsPage: {
      loading: "Loading charts and progress...",
      activeStudent: "Active Student",
      overallProgress: "Overall Progress",
      lastStudied: "Last Studied",
      notStudiedYet: "Not studied yet",
      chartTitle: "7-Day Progress Chart",
      chartLabel: "Learning progress (%)",
      quizHistory: "Quiz History",
      studiedTopics: "Studied Topics",
      noQuizYet: "No quizzes completed yet",
      noTopicYet: "No topics studied yet",
      resetBtn: "Reset Study Data",
      resetConfirm: "Do you want to reset all study data on this machine?",
      confirmResetToast: "Reset study data completed!"
    },
    learnPage: {
      title: "Learn English Grammar",
      desc: "Select a topic to study core grammar rules, formulas, usage guidelines, and examples.",
      backBtn: "Back to list",
      theory: "1. Theory",
      structure: "Structure:",
      usage: "2. Usage",
      examples: "3. Examples",
      toastStart: "Starting lesson: ",
      topics: {
        tense1: {
          title: "Present Simple Tense",
          theory: "Expresses habits, general truths, and fixed timetables.",
          usage: [
            "Habit: I go to school every day.",
            "General truth: The sun rises in the east.",
            "Timetable: The train leaves at 7 PM."
          ]
        },
        tense2: {
          title: "Present Continuous Tense",
          theory: "Expresses actions happening at the moment of speaking.",
          usage: [
            "Happening now: I am studying now.",
            "Temporary action: She is living in Hanoi this month.",
            "Near future plan: We are meeting at 5 PM."
          ]
        },
        tense3: {
          title: "Present Perfect Tense",
          theory: "Expresses actions that happened in the past but have present relevance.",
          usage: [
            "Experience: I have visited Japan.",
            "Duration: She has lived here for 10 years.",
            "Just happened: He has just left."
          ]
        },
        passive: {
          title: "Passive Voice",
          theory: "The subject undergoes the action rather than performing it.",
          usage: [
            "The room was cleaned.",
            "The project will be completed tomorrow."
          ]
        }
      }
    },
    learnRoom: {
      backBtn: "Back to Dashboard",
      wordCounter: "Word",
      flipFront: "ENGLISH (CLICK TO FLIP)",
      flipBack: "ANSWER (VIETNAMESE)",
      flipFrontHelper: "Click on the card to see the meaning",
      flipBackHelper: "Click to see the English word again",
      prevBtn: "Previous Word",
      nextBtn: "Next Word",
      finishBtn: "Finish",
      pronounceTitle: "Hear pronunciation",
      toastSuccess: "🎉 Congratulations on finishing all vocabulary!",
      toastError: "Unable to load vocabulary for this room",
      noVocabTitle: "No Vocabulary Found",
      noVocabDesc: "No vocabulary words have been added to this room yet."
    },
    quizPage: {
      title: "Vocabulary Quiz Practice",
      desc: "Choose a topic and answer quick questions to test your vocabulary retention.",
      backBtn: "Select another topic",
      questionsCount: "questions",
      questionsCountMcq: "multiple-choice questions",
      resultPerfect: "Excellent! Perfect!",
      resultGood: "Good job! Keep it up.",
      resultRetry: "Practice more!",
      retakeBtn: "Retake Quiz",
      questionLabel: "Question",
      submitBtn: "Submit Quiz",
      toastWarning: "Please answer all questions before submitting!",
      toastSuccess: "Completed! Your score: ",
      topics: {
        topic1: {
          title: "Common Animals",
          questions: [
            "What is a dog in English?",
            "Cat?",
            "Bird?",
            "Fish?"
          ]
        },
        topic2: {
          title: "Fruits",
          questions: [
            "Apple?",
            "Orange?",
            "Banana?"
          ]
        },
        topic3: {
          title: "Food & Drinks",
          questions: [
            "Bread?",
            "Milk?",
            "Water?"
          ]
        }
      }
    },
    quizRoom: {
      backBtn: "Back to Dashboard",
      pwdTitle: "Password Required",
      pwdDesc: "Please enter the room password to load the practice questions",
      pwdPlaceholder: "Room password",
      pwdSubmit: "Enter Room",
      pwdSubmitLoading: "Authenticating...",
      title: "Room Quiz:",
      subTitle: "practice questions",
      scoreTitle: "Completed!",
      scoreResult: "Your test score:",
      dashboardBtn: "Back to Dashboard",
      questionLabel: "Question",
      submitBtn: "Submit Answers",
      submitBtnLoading: "Submitting...",
      toastWarning: "Please answer all questions before submitting",
      toastSuccess: "Submission successful! Score: ",
      toastError: "Failed to submit answers",
      pwdWarning: "Please enter the room password",
      pwdSuccess: "Successfully entered room! Starting Quiz.",
      pwdError: "Incorrect password or unable to join room"
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
    login: {
      title: "Chào mừng trở lại",
      subtitle: "Đăng nhập vào tài khoản Learn English của bạn",
      email: "Email",
      password: "Mật khẩu",
      signIn: "Đăng nhập",
      loggingIn: "Đang đăng nhập...",
      noAccount: "Chưa có tài khoản?",
      registerHere: "Đăng ký tại đây",
      error: "Đăng nhập thất bại. Vui lòng kiểm tra lại tài khoản.",
    },
    register: {
      title: "Tạo tài khoản",
      subtitle: "Bắt đầu hành trình học tiếng Anh ngay hôm nay",
      username: "Tên đăng nhập",
      usernamePlaceholder: "Tên của bạn",
      email: "Email",
      emailPlaceholder: "ten@viethuong.com",
      password: "Mật khẩu",
      passwordPlaceholder: "•••••••• (Tối thiểu 6 ký tự)",
      role: "Vai trò",
      student: "Học viên",
      teacher: "Giáo viên",
      admin: "Quản trị viên",
      submit: "Đăng ký",
      loading: "Đang tạo tài khoản...",
      hasAccount: "Đã có tài khoản?",
      signInHere: "Đăng nhập tại đây",
      error: "Đăng ký thất bại. Vui lòng thử lại.",
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
      // Extra details
      scoreProgress: "Tiến độ điểm TOEIC",
      targetText: "Mục tiêu: 750+",
      searchPlaceholder: "Tìm kiếm bài học, bài kiểm tra, từ vựng...",
      practiceMetrics: "Chỉ số luyện tập TOEIC",
      streakLabel: "Chuỗi",
      streakDays: "Ngày",
      studyHrs: "Giờ",
      performanceAnalytics: "Phân tích hiệu suất",
      availableClassrooms: "Phòng từ vựng hiện có",
      noClassroomsFound: "Không tìm thấy phòng học nào. Hãy tham gia hoặc tạo phòng ở trên.",
      deleteConfirmText: "Bạn chắc chắn muốn xóa phòng học này cùng toàn bộ câu hỏi liên quan?",
      deleteSuccess: "Xóa phòng thành công",
      deleteFailed: "Xóa thất bại",
      joinSuccess: "Tham gia thành công",
      joinFailed: "Tham gia thất bại",
      createSuccess: "Tạo phòng thành công",
      createFailed: "Tạo phòng thất bại: ",
      addVocabSuccess: "Thêm từ thành công",
      addVocabFailed: "Thêm thất bại: ",
      uploadSuccessCount: "Đã tải lên thành công {count} từ vựng",
      uploadFailed: "Tải lên thất bại: ",
      saveQuizSuccess: "Thêm câu hỏi thành công",
      saveQuizFailed: "Thêm thất bại: ",
      roomRequired: "Vui lòng chọn phòng",
      optError: "Vui lòng điền đầy đủ câu hỏi và 4 đáp án",
      minOneQuestion: "Phải có ít nhất 1 câu hỏi",
      deleteVocabSuccess: "Xóa từ vựng thành công",
      deleteVocabFailed: "Xóa thất bại",
      loadVocabFailed: "Không thể tải từ vựng",
      emptyVocabInRoom: "Không tìm thấy từ vựng nào trong phòng này.",
      // Sub-pages/Tabs content translations
      roomsTab: {
        createTitle: "Tạo phòng từ vựng",
        joinTitle: "Tham gia phòng từ vựng",
        roomName: "Tên phòng",
        roomPassword: "Mật khẩu phòng",
        displayScore: "Hiển thị điểm số cho học viên",
        submitJoin: "Tham gia phòng",
        submitCreate: "Tạo phòng",
        addWord: "Thêm từ vựng vào phòng",
        wordLabel: "Từ vựng (Tiếng Anh)",
        meaningLabel: "Nghĩa (Tiếng Việt)",
        exampleLabel: "Câu ví dụ (Không bắt buộc)",
        targetRoom: "ID phòng đích",
        submitAddWord: "Thêm từ vựng",
        uploadExcel: "Tải lên tệp Excel từ vựng",
        selectFile: "Chọn Tệp",
        selectRoomToInspect: "Chọn phòng để xem danh sách từ vựng",
        noWords: "Không tìm thấy từ vựng nào trong phòng này.",
        orUploadExcel: "Hoặc tải lên tệp Excel từ vựng (.xlsx)",
        uploadSpreadsheet: "Tải lên bảng tính"
      },
      quizzesTab: {
        historyTitle: "Lịch sử luyện tập & Bài kiểm tra",
        historyDesc: "Xem lại điểm số lớp học và lịch sử luyện tập gần đây.",
        joinSession: "Tham gia phòng học mới",
        readyTitle: "Mô-đun kiểm tra từ vựng đã sẵn sàng",
        readyDesc: "Vui lòng vào tab 'Phòng từ vựng', chọn phòng đã tham gia và bấm 'Làm kiểm tra' để bắt đầu làm bài.",
        createMockQuestions: "Tạo câu hỏi luyện tập thi thử",
        selectTargetRoom: "Chọn phòng học đích",
        questionPlaceholder: "Nội dung câu hỏi #{num}",
        optionPlaceholder: "Đáp án {char}",
        correctAnswerOption: "Đáp án đúng:",
        removeQuestion: "Xóa câu hỏi này",
        addQuestionBlock: "+ Thêm khối câu hỏi",
        saveQuestionsToDb: "Lưu câu hỏi vào CSDL"
      },
      statsTab: {
        allocationTitle: "Phân bổ thời gian học hàng tuần",
        insightsTitle: "Phân tích học tập",
        nextGoal: "Mục tiêu thành tựu tiếp theo",
        activeLearnerDesc: "Hoàn thành thêm 3 lượt ôn tập thẻ từ vựng tuần này để mở khóa danh hiệu 'Học viên năng nổ'!",
        memorized: "Từ vựng đã ghi nhớ",
        mockTestsTaken: "Tổng số bài thi thử đã làm",
        avgRating: "Điểm thi thử trung bình",
        wordsText: "từ",
        testsText: "bài"
      }
    },
    landing: {
      sparkles: "Luyện thi TOEIC thế hệ mới",
      titleBefore: "Luyện thi TOEIC hiệu quả cùng ",
      titleHighlight: "Trí Tuệ Nhân Tạo (AI)",
      titleAfter: "",
      subtitle: "Nền tảng học tập cá nhân hóa, cấu trúc bài bản giúp sinh viên và người đi làm đạt mục tiêu 750+ TOEIC thông qua phân tích thông minh và chủ động gợi nhớ.",
      startBtn: "Luyện tập miễn phí ngay",
      pricingBtn: "Xem các gói dịch vụ",
      estScore: "Điểm số dự tính",
      sidebar: {
        studyDeck: "Bộ học tập",
        overview: "Tổng quan",
        flashcards: "Thẻ từ vựng",
        mockTests: "Thi thử",
        analytics: "Phân tích"
      },
      metrics: {
        title: "Chỉ số luyện tập TOEIC",
        accuracy: "Độ chính xác",
        streak: "Chuỗi ngày",
        streakDays: "12 Ngày",
        recTitle: "Gợi ý hôm nay",
        recSub: "Danh động từ vs Động từ nguyên mẫu",
        sm2Title: "Thẻ từ vựng SM-2",
        sm2Review: "Cần ôn hôm nay",
        sm2Days: "Còn 2 ngày"
      },
      features: {
        title: "Thiết kế để cải thiện điểm số tối đa",
        subtitle: "Không mẹo vặt, chỉ có phương pháp học hiệu quả được tối ưu hóa để tiếp thu ngôn ngữ.",
        feat1Title: "Giải thích đáp án bằng AI",
        feat1Desc: "Phân tích ngữ pháp và cấu trúc câu tức thời cho các câu hỏi Phần 5, 6 và 7. Hiểu rõ lý do đúng hoặc sai.",
        feat2Title: "Lặp lại ngắt quãng SM-2",
        feat2Desc: "Lịch trình thẻ từ vựng thích ứng linh hoạt với tốc độ học của bạn. Ghi nhớ từ vựng thương mại tần suất cao với ít nỗ lực nhất.",
        feat3Title: "Phòng học nhóm",
        feat3Desc: "Tham gia các phòng học trực tuyến do giáo viên hoặc nhóm học tạo ra. Làm bài kiểm tra cùng nhau và theo dõi tiến độ chung.",
        feat4Title: "Phân tích chi tiết",
        feat4Desc: "Xác định tỷ lệ chính xác và tìm ra các kỹ năng còn yếu ở từng phần thi. Tập trung thời gian học vào nơi bạn dễ mất điểm nhất."
      },
      roadmap: {
        title: "Lộ trình bài bản đạt 750+",
        subtitle: "Chu kỳ 4 bước giúp chuyển hóa nỗ lực thành sự tăng trưởng điểm số rõ rệt.",
        step1Title: "Đánh giá đầu vào",
        step1Desc: "Xác định điểm số cơ bản ban đầu bằng bài kiểm tra ngữ pháp và từ vựng nhanh, có mục tiêu.",
        step2Title: "Bài tập trọng tâm",
        step2Desc: "Nhận các bài tập đọc và nghe được đề xuất dựa trên vùng điểm yếu của bạn. Ngừng lãng phí thời gian vào những gì bạn đã biết.",
        step3Title: "Củng cố từ vựng ngắt quãng",
        step3Desc: "Xem lại thẻ từ vựng được tổng hợp từ các lỗi sai của bạn. Thuật toán SM-2 sẽ gợi ý lịch ôn tập để đưa từ vựng vào trí nhớ dài hạn.",
        step4Title: "Thi thử mô phỏng",
        step4Desc: "Làm bài thi thử đầy đủ định dạng dưới áp lực thời gian thực tế. Theo dõi lộ trình điểm dự báo của bạn theo từng tuần."
      },
      aiHighlight: {
        tag: "Giải thích tương tác",
        title: "Học từ lỗi sai với phản hồi AI lập tức",
        desc: "Không còn phải lật ra sau sách để xem giải thích sơ sài. Trợ lý AI sẽ phân tích ngữ cảnh, giải thích ngữ pháp và định nghĩa từ vựng khó một cách trực quan.",
        bullet1: "Sơ đồ ngữ pháp đầy đủ cho Phần 5-7",
        bullet2: "Dịch nghĩa ngữ cảnh cho các thành ngữ thương mại",
        bullet3: "Mẹo cải thiện điểm số phù hợp với năng lực",
        questionTag: "Câu hỏi #14 (Phần 5)",
        correctTag: "substantial (Đúng)",
        aiExplanation: "Giải thích bằng AI",
        aiExplanationText: "Dòng khoảng trống đứng trước danh từ ghép financial forecast, do đó cần một tính từ bổ nghĩa. substantial (adj) mang ý nghĩa 'đáng kể, vững chắc', phù hợp nhất với ngữ cảnh dự báo tài chính."
      },
      testimonials: {
        title: "Học viên nói gì về chúng tôi",
        subtitle: "Kết quả thực tế từ các sinh viên và người đi làm.",
        t1: "\"Là sinh viên năm cuối, mình cần 700+ để tốt nghiệp. Các phòng từ vựng lặp lại ngắt quãng giúp mình nhớ các thuật ngữ thương mại trong chưa đầy 3 tuần. Mình đã đạt 780 điểm!\"",
        t1Author: "Nguyễn Minh Anh",
        t1Role: "Sinh viên năm cuối NEU",
        t2: "\"Công cụ giải thích bằng AI là phần tuyệt nhất. Khi thi thử, mình hiểu ngay vì sao chọn B thay vì C. Tiết kiệm hàng giờ tra cứu.\"",
        t2Author: "Trần Hoàng Nam",
        t2Role: "Kỹ sư phần mềm ứng tuyển việc làm",
        t3: "\"Mình đã tăng từ 580 lên 820 TOEIC chỉ nhờ nền tảng này. Phân tích kỹ năng yếu giúp mình tập trung ôn tập đọc hiểu Phần 7.\"",
        t3Author: "Lê Thị Thu Thảo",
        t3Role: "Chuyên viên Marketing"
      },
      pricing: {
        title: "Bảng giá đơn giản, minh bạch",
        subtitle: "Chọn gói học phù hợp với khung thời gian chuẩn bị của bạn. Hủy bất kỳ lúc nào.",
        freeTitle: "Tự học cơ bản",
        freeDesc: "Dành cho việc tự học và ôn tập cơ bản",
        freePrice: "$0",
        freePeriod: " / miễn phí",
        freeBtn: "Đăng ký miễn phí",
        freeFeat1: "Truy cập các phòng từ vựng cơ bản",
        freeFeat2: "Các bài kiểm tra từ vựng cơ bản",
        freeFeat3: "Theo dõi tiến độ học tập cá nhân",
        plusTitle: "Ôn thi Premium",
        plusDesc: "Gói bứt phá điểm số nhanh chóng và toàn diện",
        plusPrice: "$12",
        plusPeriod: " / tháng",
        plusRecommended: "Khuyên dùng",
        plusBtn: "Bắt đầu Ôn Premium",
        plusFeat1: "Thi thử không giới hạn",
        plusFeat2: "Giải thích đáp án bằng AI",
        plusFeat3: "Lịch học lặp lại ngắt quãng SM-2",
        plusFeat4: "Phân tích chi tiết lỗ hổng kỹ năng"
      },
      ctaBottom: {
        title: "Sẵn sàng bứt phá điểm TOEIC của bạn?",
        desc: "Tạo tài khoản trong chưa đầy 30 giây và bắt đầu luyện tập trên nền tảng tối ưu nhất cho sinh viên và người đi làm.",
        btn: "Bắt đầu miễn phí"
      },
      footer: {
        desc: "Thiết kế tâm huyết nhằm tăng tốc trình độ tiếng Anh và sự sẵn sàng cho kỳ thi bằng thuật toán gợi nhớ chủ động.",
        disclaimer: "© 2026 TOEIC Master. Bảo lưu mọi quyền. TOEIC là nhãn hiệu đã đăng ký của ETS. Nền tảng này không được xác nhận hoặc phê duyệt bởi ETS.",
        rights: "Bảo lưu mọi quyền.",
        privacy: "Chính sách bảo mật",
        terms: "Điều khoản dịch vụ",
        product: "Sản phẩm",
        practiceRooms: "Phòng Luyện tập",
        mockTests: "Thi thử",
        aiAssistant: "Trợ lý AI",
        pricingPlans: "Các gói học",
        resources: "Tài nguyên",
        toeicVocab: "Từ vựng TOEIC",
        grammarGuides: "Hướng dẫn ngữ pháp",
        instPlans: "Kế hoạch tổ chức",
        privacySecurity: "Bảo mật & Riêng tư"
      }
    },
    schoolPlans: {
      title: "Kế hoạch cho Trường học & Tổ chức",
      desc: "Triển khai Learn English trên các lớp học, tổ chức hoặc toàn trường với báo cáo mạnh mẽ.",
      popular: "Phổ biến",
      getStarted: "Bắt đầu ngay",
      plans: {
        lite: {
          name: "Lớp học Lite",
          price: "$49/tháng",
          desc: "Hoàn hảo cho các lớp học riêng lẻ và nhóm dạy kèm.",
          features: [
            "Tối đa 40 học sinh",
            "Tạo phòng học từ vựng & kiểm tra",
            "Báo cáo phân tích tiêu chuẩn",
            "Hỗ trợ qua email"
          ]
        },
        pro: {
          name: "Trường học Pro",
          price: "$199/tháng",
          desc: "Được thiết kế cho các tổ chức và toàn bộ khoa phòng.",
          features: [
            "Không giới hạn học sinh",
            "Bảng điều khiển phân tích nâng cao",
            "Đề thi thử IELTS & TOEIC cao cấp",
            "Hỗ trợ chuyên trách 24/7",
            "Tùy chỉnh logo thương hiệu nhà trường"
          ]
        }
      }
    },
    library: {
      title: "Thư viện Tài nguyên",
      desc: "Chuẩn bị cho kỳ thi TOEIC, IELTS Academic và IELTS General Training với tài liệu ôn luyện hỗ trợ bởi AI.",
      accessNow: "Truy cập Ngay",
      ctaTitle: "Bạn đang chuẩn bị cho kỳ thi nào?",
      ctaDesc: "Chọn lộ trình của bạn và nhận kế hoạch học tập cá nhân hóa với tính năng theo dõi tiến độ thời gian thực.",
      ctaBtn: "Bắt đầu Luyện tập Ngay",
      toeicTitle: "Đề thi thử TOEIC",
      toeicDesc: "Đề thi mô phỏng TOEIC đầy đủ định dạng với báo cáo điểm chi tiết và giải thích đáp án.",
      ieltsAcadTitle: "IELTS Học thuật (Academic)",
      ieltsAcadDesc: "Đề thi thử IELTS Academic đầy đủ với phản hồi kỹ năng Viết & Nói bằng AI.",
      ieltsGenTitle: "IELTS Tổng quát (General)",
      ieltsGenDesc: "Các bài kiểm tra General Training thực tế cho định cư & công việc, dự đoán Band Score tức thì."
    },
    business: {
      title: "Học tiếng Anh Doanh nghiệp",
      desc: "Chương trình đào tạo tùy chỉnh, bảng phân tích tiến độ và đánh giá năng lực chuyên nghiệp cho các đội ngũ toàn cầu.",
      whyTitle: "Tại sao nên hợp tác với chúng tôi?",
      why1Title: "Giáo trình Thiết kế riêng",
      why1Desc: "Phù hợp với lĩnh vực ngành nghề, vị trí công việc và giao tiếp doanh nghiệp hàng ngày.",
      why2Title: "Phân tích Tương tác",
      why2Desc: "Theo dõi mức độ tương tác của nhân viên, kết quả thi cử và sự phát triển kỹ năng nói.",
      why3Title: "Đề thi thử Cao cấp",
      why3Desc: "Các bài thi đánh giá định kỳ theo đúng chuẩn định dạng quốc tế.",
      contactTitle: "Liên hệ Đội ngũ Doanh nghiệp",
      placeholderName: "Tên của bạn",
      placeholderEmail: "Email công việc",
      placeholderText: "Cho chúng tôi biết quy mô đội ngũ và yêu cầu đào tạo của bạn",
      submitBtn: "Yêu cầu Báo giá Doanh nghiệp",
      contactSuccess: "Đã gửi thông tin liên hệ thành công!"
    },
    ielts: {
      backBtn: "Quay lại Thư viện",
      acadTitle: "Luyện thi IELTS Học thuật (Academic)",
      acadDesc: "Luyện thi IELTS Academic với AI đánh giá kỹ năng Viết & Nói, tự động chấm điểm bài đọc & nghe.",
      genTitle: "Luyện thi IELTS Tổng quát (General)",
      genDesc: "Luyện thi IELTS General dành cho định cư, làm việc với hệ thống dự đoán Band Score tức thì.",
      alert: "Dữ liệu IELTS đang được hoàn thiện. Trong thời gian này, vui lòng tham khảo các đề luyện thi TOEIC có sẵn.",
      toeicBtn: "Luyện thi TOEIC Ngay"
    },
    toeic: {
      title: "Trung tâm Luyện thi TOEIC",
      desc: "Các bài thi TOEIC đầy đủ định dạng với tính năng chấm điểm tức thì, giải thích chi tiết và theo dõi tiến trình.",
      backBtn: "Quay lại Hub",
      backDetailBtn: "Quay lại Chi tiết",
      mins: "phút",
      partsAndQuestions: "7 phần thi | 200 câu hỏi",
      detailBtn: "Chi tiết đề thi",
      detailSub: "Luyện tập từng phần thi Listening/Reading hoặc làm bài kiểm tra đầy đủ (Full Test).",
      choosePart: "Chọn phần thi muốn làm",
      fullTestBtn: "Làm Full Test (120 phút)",
      loading: "Đang tải đề thi...",
      loadError: "Lỗi Tải Đề",
      loadErrorDesc: "Không tìm thấy dữ liệu đề thi tương ứng.",
      question: "Câu hỏi",
      footerDesc: "Hoàn thành các câu hỏi của bạn",
      answered: "Đã làm",
      submitBtn: "Nộp Bài làm",
      submittingBtn: "Đang nộp bài...",
      submitSuccess: "🎉 Nộp bài thành công! Điểm của bạn: ",
      submitError: "Có lỗi xảy ra khi nộp bài",
      loginRequired: "Vui lòng đăng nhập để nộp bài.",
      resultTitle: "Kết quả thi của bạn",
      resultDesc: "câu đúng",
      fullTest: "Đề thi TOEIC Full",
      loadFailedToast: "Không thể tải dữ liệu đề thi"
    },
    statsPage: {
      loading: "Đang tải biểu đồ và tiến trình...",
      activeStudent: "Học sinh tích cực",
      overallProgress: "Tiến Độ Tổng",
      lastStudied: "Học Lần Cuối",
      notStudiedYet: "Chưa học",
      chartTitle: "Biểu Đồ Tiến Độ 7 Ngày",
      chartLabel: "Tiến độ học tập (%)",
      quizHistory: "Lịch Sử Bài Làm Quiz",
      studiedTopics: "Chủ Đề Đã Học",
      noQuizYet: "Chưa làm bài quiz nào",
      noTopicYet: "Chưa học chủ đề nào",
      resetBtn: "Reset Dữ Liệu Luyện Tập",
      resetConfirm: "Bạn muốn reset lại toàn bộ dữ liệu học tập trên máy này?",
      confirmResetToast: "Đã xóa toàn bộ dữ liệu học tập trên thiết bị này!"
    },
    learnPage: {
      title: "Học Ngữ Pháp Tiếng Anh",
      desc: "Chọn một chủ đề để học lý thuyết cốt lõi, công thức, cách dùng và ví dụ trực quan.",
      backBtn: "Quay lại danh sách",
      theory: "1. Lý Thuyết",
      structure: "Cấu trúc:",
      usage: "2. Cách Dùng",
      examples: "3. Ví Dụ Minh Họa",
      toastStart: "Bắt đầu học: ",
      topics: {
        tense1: {
          title: "Thì Hiện Tại Đơn (Present Simple)",
          theory: "Diễn tả thói quen, sự thật hiển nhiên, lịch trình cố định.",
          usage: [
            "Thói quen: I go to school every day.",
            "Sự thật hiển nhiên: The sun rises in the east.",
            "Lịch trình: The train leaves at 7 PM."
          ]
        },
        tense2: {
          title: "Thì Hiện Tại Tiếp Diễn (Present Continuous)",
          theory: "Diễn tả hành động đang xảy ra tại thời điểm nói.",
          usage: [
            "Đang xảy ra: I am studying now.",
            "Hành động tạm thời: She is living in Hanoi this month.",
            "Kế hoạch tương lai gần: We are meeting at 5 PM."
          ]
        },
        tense3: {
          title: "Thì Hiện Tại Hoàn Thành (Present Perfect)",
          theory: "Diễn tả hành động đã xảy ra trong quá khứ nhưng ảnh hưởng hoặc kéo dài đến hiện tại.",
          usage: [
            "Kinh nghiệm: I have visited Japan.",
            "Hành động kéo dài: She has lived here for 10 years.",
            "Vừa mới xảy ra: He has just left."
          ]
        },
        passive: {
          title: "Câu Bị Động (Passive Voice)",
          theory: "Chủ ngữ nhận hành động thay vì thực hiện hành động.",
          usage: [
            "Căn phòng đã được dọn sạch (The room was cleaned).",
            "Dự án sẽ được hoàn thành vào ngày mai (The project will be completed tomorrow)."
          ]
        }
      }
    },
    learnRoom: {
      backBtn: "Quay lại Dashboard",
      wordCounter: "Từ",
      flipFront: "TIẾNG ANH (CLICK ĐỂ LẬT)",
      flipBack: "ĐÁP ÁN (TIẾNG VIỆT)",
      flipFrontHelper: "Click vào thẻ để xem nghĩa",
      flipBackHelper: "Click để xem lại từ tiếng Anh",
      prevBtn: "Từ Trước Đó",
      nextBtn: "Từ tiếp theo",
      finishBtn: "Hoàn thành",
      pronounceTitle: "Nghe phát âm",
      toastSuccess: "🎉 Chúc mừng bạn đã hoàn thành học tất cả từ vựng!",
      toastError: "Không thể tải từ vựng của phòng học này",
      noVocabTitle: "Chưa Có Từ Vựng",
      noVocabDesc: "Phòng học này hiện chưa được thêm từ vựng nào."
    },
    quizPage: {
      title: "Luyện Tập Từ Vựng Quiz",
      desc: "Chọn một chủ đề và trả lời các câu hỏi nhanh để kiểm tra trí nhớ từ vựng của bạn.",
      backBtn: "Chọn chủ đề khác",
      questionsCount: "câu hỏi",
      questionsCountMcq: "câu hỏi trắc nghiệm",
      resultPerfect: "Tuyệt vời! Hoàn hảo!",
      resultGood: "Khá tốt! Hãy tiếp tục cố gắng.",
      resultRetry: "Luyện tập thêm nhé!",
      retakeBtn: "Làm lại Quiz",
      questionLabel: "Câu",
      submitBtn: "Nộp Bài Làm",
      toastWarning: "Vui lòng trả lời tất cả các câu hỏi trước khi nộp bài!",
      toastSuccess: "Hoàn thành! Điểm của bạn: ",
      topics: {
        topic1: {
          title: "Động Vật Thông Dụng",
          questions: [
            "Con chó trong tiếng Anh là gì?",
            "Con mèo?",
            "Con chim?",
            "Con cá?"
          ]
        },
        topic2: {
          title: "Trái Cây",
          questions: [
            "Quả táo?",
            "Quả cam?",
            "Quả chuối?"
          ]
        },
        topic3: {
          title: "Đồ Ăn & Đồ Uống",
          questions: [
            "Bánh mì?",
            "Sữa?",
            "Nước?"
          ]
        }
      }
    },
    quizRoom: {
      backBtn: "Quay lại Dashboard",
      pwdTitle: "Yêu Cầu Mật Khẩu",
      pwdDesc: "Vui lòng nhập mật khẩu phòng để tải bộ câu hỏi luyện tập",
      pwdPlaceholder: "Mật khẩu phòng học",
      pwdSubmit: "Vào Lớp",
      pwdSubmitLoading: "Đang xác thực...",
      title: "Quiz Phòng:",
      subTitle: "câu hỏi luyện tập",
      scoreTitle: "Hoàn Thành!",
      scoreResult: "Kết quả bài làm của bạn:",
      dashboardBtn: "Về Dashboard",
      questionLabel: "Câu",
      submitBtn: "Nộp Bài",
      submitBtnLoading: "Đang nộp bài...",
      toastWarning: "Vui lòng trả lời toàn bộ câu hỏi trước khi nộp",
      toastSuccess: "Nộp bài thành công! Kết quả: ",
      toastError: "Gửi bài làm thất bại",
      pwdWarning: "Vui lòng nhập mật khẩu phòng học",
      pwdSuccess: "Vào phòng học thành công! Bắt đầu làm Quiz.",
      pwdError: "Mật khẩu không chính xác hoặc không thể tham gia phòng"
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
