import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [activeCategory, setActiveCategory] = useState("All");
  
  // ✅ NEW: Difficulty State
  const [activeDifficulty, setActiveDifficulty] = useState("All");
  
  const [answeredQuestions, setAnsweredQuestions] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [loadingAI, setLoadingAI] = useState(false);
  const [currentExplainingId, setCurrentExplainingId] = useState(null);
  const [explanations, setExplanations] = useState({});
  const [highScore, setHighScore] = useState(localStorage.getItem("highScore") || 0);

  const [currentPage, setCurrentPage] = useState(1);
  const questionsPerPage = 5;

  const fetchQuestions = (category = "All") => {
    const url = category === "All" 
      ? "http://localhost:8080/question/allQuestions" 
      : `http://localhost:8080/question/category/${category}`;
    
    fetch(url)
      .then(res => res.json())
      .then(data => {
        const shuffled = data.sort(() => Math.random() - 0.5);
        setQuestions(shuffled);
        setCurrentPage(1); 
      })
      .catch(err => console.error("Fetch error:", err));
  };

  const askGemini = async (question, correctOption) => {
    setLoadingAI(true);
    setCurrentExplainingId(question.id);
    const apiKey = process.env.REACT_APP_GEMINI_KEY;
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `Explain why "${correctOption}" is the correct answer to: "${question.questionTitle}". 2 sentences max.` }] }]
        })
      });
      const data = await response.json();
      if (data.candidates) {
        setExplanations(prev => ({ ...prev, [question.id]: data.candidates[0].content.parts[0].text }));
      }
    } catch (error) {
      setExplanations(prev => ({ ...prev, [question.id]: "AI error. Try again." }));
    } finally {
      setLoadingAI(false);
    }
  };

  useEffect(() => { fetchQuestions(); }, []);

  // ✅ Updated Filter Logic: Combines Search, Category, and Difficulty
  const filteredQuestions = questions.filter(q => {
    const matchesSearch = q.questionTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "All" || q.category === activeCategory;
    const matchesDifficulty = activeDifficulty === "All" || q.difficultyLevel === activeDifficulty;
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const handleAnswer = (questionId, selected, correct) => {
    if (answeredQuestions[questionId]) return;
    let newScore = score;
    if (selected === correct) {
      newScore = score + 1;
      setScore(newScore);
    }
    setAnsweredCount(prev => prev + 1);
    setAnsweredQuestions(prev => ({...prev, [questionId]: selected}));
    if (newScore > highScore) {
      setHighScore(newScore);
      localStorage.setItem("highScore", newScore);
    }
  };

  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = filteredQuestions.slice(indexOfFirstQuestion, indexOfLastQuestion);
  const totalPages = Math.ceil(filteredQuestions.length / questionsPerPage);

  return (
    <div className="container">
      <header className="main-header">
        <h1 className="logo-text">PrepMaster Pro</h1>
        <div className="header-stats">
          <div className="stat-pill">Accuracy: {questions.length > 0 ? Math.round((score/questions.length)*100) : 0}%</div>
          <div className="stat-pill">Best: {highScore}</div>
        </div>
      </header>

      <div className="toolbar">
        {/* Category Filters */}
        <div className="filter-group">
          {["All", "Java", "DSA", "SQL"].map(cat => (
            <button key={cat} onClick={() => { setActiveCategory(cat); setCurrentPage(1); }} className={`nav-btn ${activeCategory === cat ? "active" : ""}`}>
              {cat}
            </button>
          ))}
        </div>

        {/* ✅ Difficulty Filters */}
        <div className="filter-group" style={{ marginTop: '10px' }}>
          {["All", "Easy", "Medium", "Hard"].map(level => (
            <button 
              key={level} 
              onClick={() => { setActiveDifficulty(level); setCurrentPage(1); }} 
              className={`diff-btn ${activeDifficulty === level ? `active-${level}` : ""}`}
            >
              {level}
            </button>
          ))}
        </div>

        <input 
          type="text" placeholder="Search questions..." className="search-bar"
          value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
        />
      </div>

      <div className="questions-grid">
        {currentQuestions.length > 0 ? currentQuestions.map((q, index) => {
          const userChoice = answeredQuestions[q.id];
          const isAnswered = !!userChoice;

          return (
            <div key={q.id} className="study-card animate-in">
              <div className="card-header">
                <span className={`tag difficulty-${q.difficultyLevel}`}>{q.difficultyLevel}</span>
                <span className="question-index">Q {indexOfFirstQuestion + index + 1}</span>
              </div>
              <h3 className="question-text">{q.questionTitle}</h3>
              <div className="options-container">
                {[q.option1, q.option2, q.option3, q.option4].map((option) => (
                  <button 
                    key={option} disabled={isAnswered} 
                    onClick={() => handleAnswer(q.id, option, q.rightAnswer)}
                    className={`option-row ${isAnswered ? (option === q.rightAnswer ? "correct" : (option === userChoice ? "wrong" : "ignored")) : ""}`}
                  >
                    {option}
                  </button>
                ))}
              </div>
              {isAnswered && (
                <div className="ai-section">
                  {!explanations[q.id] ? (
                    <button 
                      disabled={loadingAI}
                      onClick={() => { askGemini(q, q.rightAnswer); }}
                      className="ai-trigger-btn"
                    >
                      {loadingAI && currentExplainingId === q.id ? "Analyzing..." : "💡 Get AI Insight"}
                    </button>
                  ) : (
                    <div className="ai-response">
                      <strong>AI INSIGHT:</strong>
                      <p>{explanations[q.id]}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        }) : (
          <div style={{ textAlign: 'center', padding: '40px', color: '#8b949e' }}>
            No questions found matching these filters.
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="pagination-footer">
          <button 
            disabled={currentPage === 1} 
            onClick={() => {setCurrentPage(currentPage - 1); window.scrollTo(0,0);}}
            className="nav-btn"
          >
            ← Previous
          </button>
          <span className="page-info">Page {currentPage} of {totalPages}</span>
          <button 
            disabled={currentPage === totalPages} 
            onClick={() => {setCurrentPage(currentPage + 1); window.scrollTo(0,0);}}
            className="nav-btn"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}

export default App;