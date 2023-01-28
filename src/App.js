import { useEffect, useRef, useState } from "react";
import "./App.css";
import QuizCardList from "./Components/QuizCardList";
import axios from "axios";

function App() {
  const [quizCard, setQuizCard] = useState([]);
  const [categories, setCategories] = useState([]);
  const categoryRef = useRef();
  const amountRef = useRef();

  useEffect(() => {
    axios.get("https://opentdb.com/api_category.php").then((res) => {
      setCategories(res.data.trivia_categories);
    });
  }, []);

  useEffect(() => {

  }, []);

  const decodeHtml = (str) => {
    const textArea = document.createElement("textarea");
    textArea.innerHTML = str;
    return textArea.value;
  };

  const handleSubmit = (e) =>{
    e.preventDefault()
    axios.get("https://opentdb.com/api.php", {
      params: {
        amount: amountRef.current.value,
        category: categoryRef.current.value
      }
    }).then((res) => {
      setQuizCard(
        res.data.results.map((questionItem, index) => {
          const answer = decodeHtml(questionItem.correct_answer);
          const options = [
            ...questionItem.incorrect_answers.map((a) => decodeHtml(a)),
            answer,
          ];
          return {
            id: `${index}-${Date.now()}`,
            question: decodeHtml(questionItem.question),
            answer: answer,
            options: options.sort(() => Math.random() - 0.5),
          };
        })
      );
      console.log(res.data);
    });
  }

  return (
    <>
      <form className="header" action="">
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select id="category" ref={categoryRef}>
            {categories.map((category) => {
              return <option value={category.id} key={category.id}>
                {category.name}
              </option>;
            })}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="amount">Number of questions</label>
          <input type="number" id="amount" min={1} step={1} defaultValue={10} ref={amountRef} />
        </div>
        <div className="form-group">
          <button onClick={handleSubmit} id="generate" className="btn">Generate Questions</button>
        </div>
      </form>
      <div className="container">
        <QuizCardList quizCards={quizCard} />;
      </div>
    </>
  );
}

export default App;
