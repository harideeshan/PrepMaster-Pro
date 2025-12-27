import React, { useEffect, useState } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import './App.css';

function App() {
  // --- STATE ---
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [loadingAI, setLoadingAI] = useState(false);
  const [currentExplainingId, setCurrentExplainingId] = useState(null);
  const [explanations, setExplanations] = useState({});
  const [highScore, setHighScore] = useState(localStorage.getItem("highScore") || 0);
  const [currentPage, setCurrentPage] = useState(1);
  const questionsPerPage = 5;

  // ✅ NEW: Multi-Domain State
  const [activeDomain, setActiveDomain] = useState("Technical"); 
  const [activeSubCategory, setActiveSubCategory] = useState("Java");
  const [activeDifficulty, setActiveDifficulty] = useState("All");

  const domains = {
    Technical: ["Java", "DSA", "SQL", "Python", "HTML", "CSS"],
    Aptitude: ["Quantitative", "Logical", "Verbal"]
  };

  // --- API CALLS ---
  const fetchQuestions = (category) => {
    // If no category passed, use current active sub-category
    const target = category || activeSubCategory;
    const url = `http://localhost:8080/question/category/${target}`;
    
    fetch(url)
      .then(res => res.json())
      .then(data => {
        const shuffled = data.sort(() => Math.random() - 0.5);
        setQuestions(shuffled);
        setCurrentPage(1); 
      })
      .catch(err => console.error("Fetch error:", err));
  };

  useEffect(() => { fetchQuestions("Java"); }, []);

  const askGemini = async (question, correctOption) => {
    setLoadingAI(true);
    setCurrentExplainingId(question.id);
    const apiKey = process.env.REACT_APP_GEMINI_KEY;
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`;

    // ✅ AI Personality Switch
    const promptRole = activeDomain === "Technical" 
      ? "Senior Technical Interviewer" 
      : "Competitive Exam Coach";
    const promptDetail = activeDomain === "Technical" 
      ? "technical reason and a Pro-Tip" 
      : "logical shortcut or the formula";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `Act as a ${promptRole}. Briefly explain why "${correctOption}" is the correct answer to: "${question.questionTitle}". Provide the ${promptDetail}. Max 3 sentences.` }] }]
        })
      });
      const data = await response.json();
      if (data.candidates) {
        setExplanations(prev => ({ ...prev, [question.id]: data.candidates[0].content.parts[0].text }));
      }
    } catch (error) {
      setExplanations(prev => ({ ...prev, [question.id]: "Interviewer Note: AI connection lost." }));
    } finally {
      setLoadingAI(false);
    }
  };

  // --- LOGIC ---
  const getSkillData = () => {
    return domains[activeDomain].map(sub => {
      const catQuestions = questions.filter(q => q.category === sub);
      const correctInCat = catQuestions.filter(q => answeredQuestions[q.id] === q.rightAnswer).length;
      return {
        subject: sub,
        A: catQuestions.length > 0 ? (correctInCat / catQuestions.length) * 100 : 0,
        fullMark: 100
      };
    });
  };

  const filteredQuestions = questions.filter(q => {
    const matchesSearch = q.questionTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = activeDifficulty === "All" || q.difficultyLevel === activeDifficulty;
    return matchesSearch && matchesDifficulty;
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

  const currentQuestions = filteredQuestions.slice((currentPage - 1) * questionsPerPage, currentPage * questionsPerPage);
  const totalPages = Math.ceil(filteredQuestions.length / questionsPerPage);

  return (
    <div className="container">
      <header className="main-header">
        <h1 className="logo-text">PrepMaster Pro</h1>
        <div className="header-stats">
          <div className="stat-pill">Session: {score}/{answeredCount}</div>
          <div className="stat-pill">Best: {highScore}</div>
        </div>
      </header>

      {/* Analytics Radar */}
      {answeredCount > 0 && (
        <div className="analytics-box animate-in">
          <h4 className="chart-title">{activeDomain} PROFICIENCY</h4>
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={getSkillData()}>
              <PolarGrid stroke="#30363d" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#c9d1d9', fontSize: 10 }} />
              <Radar dataKey="A" stroke="#58a6ff" fill="#58a6ff" fillOpacity={0.5} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* ✅ NEW: Domain & Sub-Category Navigation */}
      <div className="toolbar">
        <div className="domain-toggle">
          {Object.keys(domains).map(d => (
            <button 
              key={d} 
              className={`domain-btn ${activeDomain === d ? "active" : ""}`}
              onClick={() => {
                setActiveDomain(d);
                setActiveSubCategory(domains[d][0]);
                fetchQuestions(domains[d][0]);
              }}
            >
              {d}
            </button>
          ))}
        </div>

        <div className="sub-filter-row">
          {domains[activeDomain].map(sub => (
            <button 
              key={sub} 
              className={`sub-nav-btn ${activeSubCategory === sub ? "active-sub" : ""}`}
              onClick={() => { setActiveSubCategory(sub); fetchQuestions(sub); }}
            >
              {sub}
            </button>
          ))}
        </div>

        <div className="meta-filters">
           <div className="difficulty-row">
            {["All", "Easy", "Medium", "Hard"].map(lvl => (
              <button 
                key={lvl} 
                onClick={() => setActiveDifficulty(lvl)}
                className={`diff-btn ${activeDifficulty === lvl ? "active-" + lvl : ""}`}
              >
                {lvl}
              </button>
            ))}
          </div>
          <input 
            type="text" placeholder="Search title..." className="search-bar"
            value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="questions-grid">
        {currentQuestions.map((q, index) => {
          const userChoice = answeredQuestions[q.id];
          const isAnswered = !!userChoice;
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
                    <button disabled={loadingAI} onClick={() => askGemini(q, q.rightAnswer)} className="ai-trigger-btn">
                      {loadingAI && currentExplainingId === q.id ? "Thinking..." : "💡 Get AI Analysis"}
                    </button>
                  ) : (
                    <div className="ai-response">
                      <strong>{activeDomain === "Technical" ? "INTERVIEWER" : "COACH"} INSIGHT:</strong>
                      <p>{explanations[q.id]}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
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