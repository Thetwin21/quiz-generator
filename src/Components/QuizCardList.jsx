import React from 'react'
import QuizCard from './QuizCard'

const QuizCardList = ({quizCards}) => {
  return (
    <div className='quizCardList'>
      {quizCards.map(quizCard => 
        <QuizCard key={quizCard.id} quizCard={quizCard} />
      )}
    </div>
  )
}

export default QuizCardList