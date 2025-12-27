import React, { useEffect, useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";

function App() {
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [activeCategory, setActiveCategory] = useState("All");
  const [answeredQuestions, setAnsweredQuestions] = useState({}); // Changed to object to store user choice
  const [searchTerm, setSearchTerm] = useState("");
  const [explanation, setExplanation] = useState("");
  const [loadingAI, setLoadingAI] = useState(false);
  const [currentExplainingId, setCurrentExplainingId] = useState(null);
  const [cooldown, setCooldown] = useState(false);

  const fetchQuestions = (category = "All") => {
    const url = category === "All" 
      ? "http://localhost:8080/question/allQuestions" 
      : `http://localhost:8080/question/category/${category}`;
    
    fetch(url)
      .then(res => res.json())
      .then(data => setQuestions(data))
      .catch(err => console.error("Fetch error:", err));
  };
  const [explanations, setExplanations] = useState({});
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
        contents: [{ 
          parts: [{ 
            text: `You are a Java/DSA expert. Briefly explain why "${correctOption}" is the correct answer to: "${question.questionTitle}". 2 sentences max.` 
          }] 
        }]
      })
    });

    const data = await response.json();
    
    if (data.candidates && data.candidates[0].content.parts[0].text) {
      const aiText = data.candidates[0].content.parts[0].text;
      setExplanations(prev => ({ ...prev, [question.id]: aiText }));
    } else {
      throw new Error(data.error?.message || "AI check failed");
    }
  } catch (error) {
    console.error("Gemini Error:", error);
    setExplanations(prev => ({ 
      ...prev, 
      [question.id]: "AI Status: Rate limit reached or connection issue. Try again in 10s!" 
    }));
  } finally {
    setLoadingAI(false);
  }
};

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    fetchQuestions(cat);
    setScore(0);
    setAnsweredCount(0);
    setAnsweredQuestions({});
    setExplanation("");
  };

  const handleAnswer = (questionId, selected, correct) => {
    if (answeredQuestions[questionId]) return;
    
    if (selected === correct) setScore(prev => prev + 1);
    setAnsweredCount(prev => prev + 1);
    
    // Save the user's answer to show Green/Red feedback
    setAnsweredQuestions(prev => ({...prev, [questionId]: selected}));
  };

  const filteredQuestions = questions.filter(q => 
    q.questionTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      {/* HEADER SECTION */}
      <div className="header shadow-sm">
        <div>
          <h1 style={{ fontWeight: '900', letterSpacing: '-1px' }}>PrepMaster AI</h1>
          <p style={{ color: '#666', fontSize: '0.9rem' }}>Powered by Google Gemini 1.5</p>
        </div>
        <div className="score-badge">
          <div style={{ fontSize: '0.6rem', fontWeight: 'bold' }}>PROGRESS</div>
          <div style={{ fontSize: '1.4rem', fontWeight: '900' }}>{score} / {questions.length}</div>
        </div>
      </div>

      {/* SEARCH & FILTER SECTION */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px', marginBottom: '25px' }}>
        <div className="filter-bar" style={{ marginBottom: 0 }}>
          {["All", "Java", "DSA", "SQL"].map(cat => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`filter-btn ${activeCategory === cat ? "active" : ""}`}
            >
              {cat}
            </button>
          ))}
        </div>
        
        <input 
          type="text"
          placeholder="Search questions..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: '10px 15px', borderRadius: '10px', border: '1px solid #ddd', width: '250px', outline: 'none' }}
        />
      </div>

      {/* PROGRESS BAR */}
      <div style={{ width: '100%', backgroundColor: '#e0e0e0', height: '8px', borderRadius: '10px', marginBottom: '30px', overflow: 'hidden' }}>
        <div 
          style={{ width: `${(answeredCount / (questions.length || 1)) * 100}%`, backgroundColor: '#10b981', height: '100%', transition: 'width 0.4s ease' }}
        ></div>
      </div>

      {/* QUESTIONS LIST */}
      <div className="questions-list">
        {filteredQuestions.map((q, index) => {
          const userChoice = answeredQuestions[q.id];
          const isAnswered = !!userChoice;

          return (
            <div key={q.id} className="question-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <span className="category-tag">{q.category}</span>
                  <span className={`difficulty-badge difficulty-${q.difficultyLevel}`}>
                    {q.difficultyLevel}
                  </span>
                </div>
                <span style={{ color: '#aaa', fontWeight: 'bold', fontSize: '0.8rem' }}>#{index + 1}</span>
              </div>
              
              <h3 style={{ fontSize: '1.2rem', lineHeight: '1.4', fontWeight: '700', color: '#1f2937' }}>
                {q.questionTitle}
              </h3>
              
              <div className="options-grid">
                {[q.option1, q.option2, q.option3, q.option4].map((option) => {
                  let bgColor = 'white';
                  let textColor = '#374151';

                  if (isAnswered) {
                    if (option === q.rightAnswer) {
                      bgColor = '#dcfce7'; // Correct is always green
                      textColor = '#166534';
                    } else if (option === userChoice) {
                      bgColor = '#fee2e2'; // Wrong user choice is red
                      textColor = '#991b1b';
                    } else {
                      bgColor = '#f9fafb';
                      textColor = '#9ca3af';
                    }
                  }

                  return (
                    <button 
                      key={option}
                      disabled={isAnswered}
                      onClick={() => handleAnswer(q.id, option, q.rightAnswer)}
                      className="option-btn"
                      style={{ backgroundColor: bgColor, color: textColor, border: isAnswered && option === q.rightAnswer ? '2px solid #22c55e' : '1px solid #ddd' }}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>

              {/* AI EXPLANATION SECTION */}
               {/* AI EXPLANATION SECTION */}
{isAnswered && (
  <div style={{ marginTop: '20px', padding: '15px', background: '#f0f7ff', borderRadius: '10px', borderLeft: '5px solid #1a73e8' }}>
    
    <button 
      disabled={loadingAI || cooldown}
      onClick={() => {
        askGemini(q, q.rightAnswer);
        setCooldown(true);
        setTimeout(() => setCooldown(false), 10000); // 10 second cooldown
      }}
      className="filter-btn"
      style={{ 
        background: cooldown ? '#94a3b8' : '#1a73e8', // Grey out when cooling down
        color: 'white', 
        marginBottom: '10px', 
        fontSize: '0.8rem',
        cursor: (loadingAI || cooldown) ? 'not-allowed' : 'pointer',
        transition: 'all 0.3s ease'
      }}
    >
      {loadingAI && currentExplainingId === q.id 
        ? "Gemini is thinking..." 
        : cooldown 
          ? "Wait for cooldown..." 
          : "💡 Explain with AI"}
    </button>
    
    {explanations[q.id] && (
      <p style={{ fontSize: '0.85rem', lineHeight: '1.5', color: '#1e3a8a', margin: '10px 0 0 0', fontWeight: '500' }}>
        {explanations[q.id]}
      </p>
    )}
  </div>
)}
              
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;