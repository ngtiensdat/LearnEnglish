function Home() {
  const courses = [
    {
      title: 'Beginner English',
      subtitle: 'Start your journey to mastering English basics',
      color: 'bg-blue-100',
      bullets: [
        'Interactive lessons for grammar, vocabulary, and pronunciation',
        'Videos with native speakers to improve listening skills',
        'Flashcards for essential words and phrases',
        'Quizzes to test basic comprehension and speaking skills'
      ]
    },
    {
      title: 'Intermediate English',
      subtitle: 'Enhance your fluency with intermediate skills',
      color: 'bg-cyan-100',
      bullets: [
        'Advanced grammar and conversational practice',
        'Videos with real-life dialogues and discussions',
        'Flashcards for idioms and complex vocabulary',
        'Assessments to improve reading and writing fluency'
      ]
    },
    // ... (thêm các course khác như Advanced, Kids, IELTS Prep tương tự Home trước đây)
  ];

  // (giữ nguyên phần còn lại của Home từ phản hồi trước, rút gọn ở đây)
  return (
    <div className="min-h-screen bg-blue-900 text-white">
      {/* Hero, Course Cards, Features, AI, Testimonials, Footer */}
    </div>
  );
}

export default Home;