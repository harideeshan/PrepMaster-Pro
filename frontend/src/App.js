import React, { useEffect, useState } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, Radar as RadarArea } from 'recharts';
import './App.css';

function App() {
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [loadingAI, setLoadingAI] = useState(false);
  const [currentExplainingId, setCurrentExplainingId] = useState(null);
  const [explanations, setExplanations] = useState({});
  const [highScore, setHighScore] = useState(localStorage.getItem("highScore") || 0);
  const [currentPage, setCurrentPage] = useState(1);
  const questionsPerPage = 5;

  // Navigation & Submission States
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeDomain, setActiveDomain] = useState("Technical"); 
  const [activeSubCategory, setActiveSubCategory] = useState("All");
  const [activeDifficulty, setActiveDifficulty] = useState("All");

  // ✅ NEW: Gamified AI State
  const [aiAudit, setAiAudit] = useState(null); 
  const [loadingAudit, setLoadingAudit] = useState(false);

  const domains = {
    Technical: ["All", "Java", "DSA", "SQL", "Python", "HTML", "CSS"],
    Aptitude: ["All", "Quantitative", "Logical", "Verbal"]
  };

  const fetchQuestions = (category) => {
    const target = category || activeSubCategory;
    const url = target === "All" 
      ? "http://localhost:8080/question/allQuestions" 
      : `http://localhost:8080/question/category/${target}`;
    
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setQuestions(data.sort(() => Math.random() - 0.5));
        handleReset(); 
      })
      .catch(err => console.error("Fetch error:", err));
  };

  useEffect(() => { fetchQuestions("All"); }, []);

  const handleAnswer = (questionId, selectedValue) => {
    if (isSubmitted) return; 
    setAnsweredQuestions(prev => ({ ...prev, [questionId]: selectedValue }));
  };

  const handleReset = () => {
    setAnsweredQuestions({});
    setIsSubmitted(false);
    setScore(0);
    setExplanations({});
    setAiAudit(null);
    setCurrentPage(1);
  };

  // ✅ NEW: Gamified AI Audit Logic
  const runAIAudit = async (finalScore, total) => {
    setLoadingAudit(true);
    const apiKey = process.env.REACT_APP_GEMINI_KEY;
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`;

    const resultsSummary = questions.map(q => ({
      category: q.category,
      difficulty: q.difficultyLevel,
      correct: answeredQuestions[q.id] === q.rightAnswer
    }));

    const prompt = `Analyze these test results: ${JSON.stringify(resultsSummary)}. Score: ${finalScore}/${total}. 
    Provide a JSON response ONLY (no markdown blocks) with:
    1. "title": (A gaming title like 'Java Ninja' or 'SQL Warlord'),
    2. "rank": (Bronze, Silver, Gold, Platinum, or Diamond),
    3. "stats": (Object with 3 skills like 'Syntax', 'Logic', 'Speed' and values 1-100),
    4. "quests": (Array of 3 very short 5-word missions to improve).`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
      });
      const data = await response.json();
      if (data.candidates) {
        const cleanJson = data.candidates[0].content.parts[0].text.replace(/```json|```/g, "").trim();
        setAiAudit(JSON.parse(cleanJson));
      }
    } catch (e) { 
      setAiAudit({ title: "Apprentice", rank: "Bronze", stats: { Accuracy: 50, Focus: 50, Speed: 50 }, quests: ["Complete more quizzes", "Review mistakes", "Try harder difficulty"] });
    }
    setLoadingAudit(false);
  };

  const handleSubmitExam = () => {
    let finalScore = 0;
    questions.forEach(q => {
      if (answeredQuestions[q.id] === q.rightAnswer) finalScore++;
    });
    setScore(finalScore);
    setIsSubmitted(true);
    runAIAudit(finalScore, questions.length);
    if (finalScore > highScore) {
      setHighScore(finalScore);
      localStorage.setItem("highScore", finalScore);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
          contents: [{ parts: [{ text: `Explain why "${correctOption}" is correct for "${question.questionTitle}". 2 sentences max.` }] }]
        })
      });
      const data = await response.json();
      if (data.candidates) {
        setExplanations(prev => ({ ...prev, [question.id]: data.candidates[0].content.parts[0].text }));
      }
    } catch (error) {
      setExplanations(prev => ({ ...prev, [question.id]: "Error loading insight." }));
    } finally {
      setLoadingAI(false);
    }
  };

  const filteredQuestions = questions.filter(q => 
    q.questionTitle.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (activeDifficulty === "All" || q.difficultyLevel === activeDifficulty)
  );

  const currentQuestions = filteredQuestions.slice((currentPage - 1) * questionsPerPage, currentPage * questionsPerPage);
  const totalPages = Math.ceil(filteredQuestions.length / questionsPerPage);

  return (
    <div className="container">
      <header className="main-header">
        <h1 className="logo-text">PrepMaster Pro</h1>
        <div className="header-stats">
          <div className="stat-pill">Progress: {Object.keys(answeredQuestions).length}/{questions.length}</div>
          <div className="stat-pill">Best: {highScore}</div>
        </div>
      </header>

      {/* ✅ NEW: Gamified Player Card Analysis */}
      {isSubmitted && (
        <div className="player-card animate-in">
          {loadingAudit ? (
            <div className="loading-shimmer">Generating Player Diagnostic...</div>
          ) : aiAudit && (
            <>
              <div className="card-top">
                <div className="rank-orb">{aiAudit.rank}</div>
                <div className="player-meta">
                  <h2 className="player-title">{aiAudit.title}</h2>
                  <p className="player-stats-text">Level Summary: {score}/{questions.length} Mastery</p>
                </div>
              </div>

              <div className="stat-bars">
                {Object.entries(aiAudit.stats).map(([label, value]) => (
                  <div key={label} className="stat-row">
                    <span className="stat-label">{label}</span>
                    <div className="bar-container">
                      <div className="bar-fill" style={{ width: `${value}%` }}></div>
                    </div>
                    <span className="stat-pct">{value}%</span>
                  </div>
                ))}
              </div>

              <div className="quest-log">
                <h4>⚔️ RECOMMENDED QUESTS</h4>
                <ul>
                  {aiAudit.quests.map((q, i) => (
                    <li key={i}><span className="quest-tag">LVL UP</span> {q}</li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>
      )}

      <div className="toolbar">
        <div className="domain-toggle">
          {Object.keys(domains).map(d => (
            <button key={d} className={`domain-btn ${activeDomain === d ? "active" : ""}`}
              onClick={() => { setActiveDomain(d); setActiveSubCategory("All"); fetchQuestions("All"); }}>
              {d}
            </button>
          ))}
        </div>
        <div className="sub-filter-row">
          {domains[activeDomain].map(sub => (
            <button key={sub} className={`sub-nav-btn ${activeSubCategory === sub ? "active-sub" : ""}`}
              onClick={() => { setActiveSubCategory(sub); fetchQuestions(sub); }}>
              {sub}
            </button>
          ))}
        </div>
        
        <div className="difficulty-row">
          {["All", "Easy", "Medium", "Hard"].map(lvl => (
            <button key={lvl} 
              className={`diff-filter-btn ${activeDifficulty === lvl ? `active-${lvl}` : ""}`}
              onClick={() => setActiveDifficulty(lvl)}>
              {lvl}
            </button>
          ))}
        </div>

        <div className="meta-filters">
          <input type="text" placeholder="Search knowledge base..." className="search-bar" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          <button className="refresh-btn" onClick={() => fetchQuestions(activeSubCategory)}>🔄 Shuffle</button>
        </div>
      </div>

      <div className="questions-grid">
        {currentQuestions.map((q, index) => {
          const userChoice = answeredQuestions[q.id];
          return (
            <div key={q.id} className="study-card animate-in">
              <div className="card-header">
                <span className={`tag difficulty-${q.difficultyLevel}`}>{q.difficultyLevel}</span>
                <span className="question-index">Q {((currentPage-1)*5) + index + 1}</span>
              </div>
              <h3 className="question-text">{q.questionTitle}</h3>
              <div className="options-container">
                {[q.option1, q.option2, q.option3, q.option4].map((option) => (
                  <button 
                    key={option} 
                    disabled={isSubmitted} 
                    onClick={() => handleAnswer(q.id, option)}
                    className={`option-row 
                      ${userChoice === option ? "selected" : ""} 
                      ${isSubmitted && option === q.rightAnswer ? "correct" : ""}
                      ${isSubmitted && userChoice === option && option !== q.rightAnswer ? "wrong" : ""}
                    `}
                  >
                    {option}
                  </button>
                ))}
              </div>

              {isSubmitted && (
                <div className="ai-section">
                  {!explanations[q.id] ? (
                    <button disabled={loadingAI} onClick={() => askGemini(q, q.rightAnswer)} className="ai-trigger-btn">
                      {loadingAI && currentExplainingId === q.id ? "Consulting..." : "💡 Insight"}
                    </button>
                  ) : (
                    <div className="ai-response"><p>{explanations[q.id]}</p></div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="action-footer">
        {!isSubmitted ? (
          <button className="submit-exam-btn" onClick={handleSubmitExam} disabled={Object.keys(answeredQuestions).length === 0}>
            Finish Assessment
          </button>
        ) : (
          <button className="reset-btn" onClick={handleReset}>New Session</button>
        )}
      </div>

      {totalPages > 1 && (
        <div className="pagination-footer">
          <button disabled={currentPage === 1} onClick={() => {setCurrentPage(c => c - 1); window.scrollTo(0,0);}} className="nav-btn">←</button>
          <span className="page-info">{currentPage} / {totalPages}</span>
          <button disabled={currentPage === totalPages} onClick={() => {setCurrentPage(c => c + 1); window.scrollTo(0,0);}} className="nav-btn">→</button>
        </div>
      )}
    </div>
  );
}

export default App;