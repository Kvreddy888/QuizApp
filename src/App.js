import React, { useState, useEffect } from 'react';
import './App.css'; // Make sure this import is present

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
      const data = await await response.json();
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

  const handleOptionClick = async (questionId, selectedKey) => {
    if (selectedAnswers[questionId]) return;

    try {
      const response = await fetch('http://localhost:8080/question/checkAnswer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          questionId: questionId,
          selectedOption: selectedKey,
        }),
      });

      const data = await response.json(); // AnswerResponse DTO: { isCorrect: boolean, correct_option: string }
      setSelectedAnswers((prev) => ({
        ...prev,
        [questionId]: {
          selectedKey,
          isCorrect: data.isCorrect, // This is the boolean from backend
          correctOption: data.correct_option, // This will be "option_a", "option_b", etc.
        },
      }));
    } catch (error) {
      console.error('Error checking answer:', error);
    }
  };

  const handleShowAnswerToggle = (questionId) => {
    setShowAnswers((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  return (
    <div className="App">
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

          const options = ['a', 'b', 'c', 'd'].map((key) => {
            const optionKey = `option_${key}`;
            const value = q[optionKey];

            return value
              ? { key: optionKey, label: key.toUpperCase(), value }
              : null;
          }).filter(Boolean);

          return (
            <div
              key={q.id}
              className="question-card"
            >
              <h3>{q.question_text}</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {options.map((opt) => {
                  const isSelected = answer?.selectedKey === opt.key;
                  const isCorrectOption = answer?.correctOption === opt.key;

                  let buttonClass = 'option-button';

                  if (answer) { // If an answer has been selected for this question
                    if (isCorrectOption) { // Always highlight the actual correct option green
                      buttonClass += ' correct';
                    } else if (isSelected && !answer.isCorrect) {
                      // Highlight the selected option red ONLY if it's incorrect
                      buttonClass += ' incorrect';
                    }
                    // If isSelected and answer.isCorrect is true, it falls under the isCorrectOption above
                    // If not selected and not correct option, it remains default (grey/white via CSS)
                  } else {
                    // No answer selected yet, apply default blue
                    buttonClass += ' default-blue-bg';
                  }

                  return (
                    <button
                      key={opt.key}
                      onClick={() => handleOptionClick(q.id, opt.key)}
                      disabled={!!answer}
                      className={buttonClass}
                    >
                      {opt.label}. {opt.value}
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
                      className={`answer-message ${answer.isCorrect ? 'correct-msg' : 'incorrect-msg'}`}
                    >
                      {answer.isCorrect
                        ? '✅ Correct!'
                        : `❌ Incorrect! Correct Answer: ${options.find(o => o.key === answer.correctOption)?.label}. ${options.find(o => o.key === answer.correctOption)?.value}`}
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