import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [questions, setQuestions] = useState([]);
  const [category, setCategory] = useState('');
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showAnswers, setShowAnswers] = useState({});

  useEffect(() => {
    fetchAllQuestions();
  }, []);

  const fetchAllQuestions = async () => {
    try {
      const response = await fetch('http://localhost:8080/question/allQuestions');
      const data = await response.json();
      setQuestions(data);
    } catch (error) {
      console.error('Error fetching all questions:', error);
    }
  };

  const fetchByCategory = async () => {
    try {
      const response = await fetch(`http://localhost:8080/question/category/${category}`);
      const data = await response.json();
      setQuestions(data);
      setSelectedAnswers({});
      setShowAnswers({});
    } catch (error) {
      console.error('Error fetching by category:', error);
    }
  };

  const handleOptionClick = (questionId, selectedKey, correctKey) => {
    if (selectedAnswers[questionId]) return;

    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: {
        selectedKey,
        isCorrect: selectedKey === correctKey,
      },
    }));
  };

  const handleShowAnswerToggle = (questionId) => {
    setShowAnswers((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  return (
    <div className="App" style={{ padding: '20px' }}>
      <h1>All Questions</h1>

      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Enter category (e.g., java)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <button onClick={fetchByCategory}>Filter by Category</button>
      </div>

      {questions.length === 0 ? (
        <p>No questions available.</p>
      ) : (
        questions.map((q) => {
          const answer = selectedAnswers[q.id];
          const isAnswerShown = showAnswers[q.id];

          return (
            <div
              key={q.id}
              style={{
                marginBottom: '25px',
                border: '1px solid #ccc',
                padding: '15px',
                borderRadius: '8px',
              }}
            >
              <h3>{q.questionText}</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {['a', 'b', 'c', 'd'].map((optKey) => {
                  const value = q[`option_${optKey}`];
                  const isSelected = answer?.selectedKey === optKey;

                  return (
                    <button
                      key={optKey}
                      onClick={() => handleOptionClick(q.id, optKey, q.correct_option)}
                      disabled={!!answer}
                      style={{
                        backgroundColor: isSelected
                          ? answer?.isCorrect
                            ? '#c8f7c5'
                            : '#f7c5c5'
                          : '#f0f0f0',
                        cursor: answer ? 'not-allowed' : 'pointer',
                        padding: '10px',
                        borderRadius: '6px',
                        border: isSelected ? '2px solid black' : '1px solid #ccc',
                        textAlign: 'left',
                      }}
                    >
                      {value}
                    </button>
                  );
                })}
              </div>

              {answer && (
                <div style={{ marginTop: '10px' }}>
                  <button onClick={() => handleShowAnswerToggle(q.id)}>
                    {isAnswerShown ? 'Hide Answer' : 'Click to view the answer'}
                  </button>

                  {isAnswerShown && (
                    <p
                      style={{
                        fontWeight: 'bold',
                        color: answer.isCorrect ? 'green' : 'red',
                        marginTop: '10px',
                      }}
                    >
                      {answer.isCorrect
                        ? '✅ Correct!'
                        : `❌ Incorrect! Correct Answer: ${q[`option_${q.correct_option}`]} (${q.correct_option.toUpperCase()})`}
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}

export default App;
