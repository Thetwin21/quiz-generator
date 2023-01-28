import React, { useState, useEffect, useRef } from "react";

const QuizCard = ({ quizCard }) => {
  const [flip, setFlip] = useState(false);
  const [height, setHeight] = useState("initial");
  const frontRef = useRef();
  const backRef = useRef();

  const setMaxHeight = () => {
    const frontHeight = frontRef.current.getBoundingClientRect().height;
    const backHeight = backRef.current.getBoundingClientRect().height;
    setHeight(Math.max(frontHeight, backHeight, 100));
  };
  

  useEffect(setMaxHeight, [quizCard.question, quizCard.answer, quizCard.options]);

  useEffect(() => {
    window.addEventListener('resize',setMaxHeight)
    return ()=> window.removeEventListener('resize',setMaxHeight)
  }, [])
  
  const handleFlip = (e) => {
    setFlip((prevFlipValue) => !prevFlipValue);
  };

  return (
    <div
      onClick={handleFlip}
      className={`card ${flip ? "flip" : ""}`}
      style={{height: height}}
    >
      <div className="front" ref={frontRef}>
        {quizCard.question}
        <div className="quizcard_options">
          {quizCard.options.map((option) => (
            <div key={option} className="quizCard_option">{option}</div>
          ))}
        </div>
      </div>
      <div className="back" ref={backRef}>
        {quizCard.answer}
      </div>
    </div>
  );
};

export default QuizCard;
