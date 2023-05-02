import React, { useState } from 'react';

import '../../styles/Questions.css';
import FinishModal from './FinishModal';

const Questions = () => {
    const [showFinishModal, setShowFinishModal] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
    const [answers, setAnswers] = useState({});
    const [questions, setQuestions] = useState([
        [
            { id: '1', pregunta: 'Pregunta 1', url:'' },
            { id: '2', pregunta: 'Pregunta 2', url:'' },
        ],
        [
            { id: '3', pregunta: 'Pregunta 3', url:'' },
            { id: '4', pregunta: 'Pregunta 4', url:'' },
        ],
        [
            { id: '5', pregunta: 'Pregunta 5', url:'' },
            { id: '6', pregunta: 'Pregunta 6', url:'' },
        ],
        [
            { id: '7', pregunta: 'Pregunta 7', url:'' },
            { id: '8', pregunta: 'Pregunta 8', url:'' },
        ],
        [
            { id: '9', pregunta: 'Pregunta 9', url:'' },
            { id: '10', pregunta: 'Pregunta 10', url:'' },
        ],
]);

const handleRadioChange = (event, questionId) => {
    const answer = event.target.value === 'true';
    setAnswers(prevAnswers => ({ ...prevAnswers, [questionId]: answer }));
};
    
const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
    console.log('answers:', answers)
  };

    const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
    console.log('answers:', answers)
    };
    
    

    const handleFinishButtonClick = () => {
        console.log("presionado ***")
      setShowFinishModal(true);
    };
  
    const handleFinishModalClose = () => {
      setShowFinishModal(false);
    };

    const steps = ['Politica Estrategica', 'Planeacion', 'Monitoreo y control', 'Diseño y ejecucion', 'Ambientes']

  return (
      <div className="questions">
          <FinishModal show={showFinishModal} onClose={handleFinishModalClose} />
      
          <div className='section1'>
            <div id="applicationStatus">
                <ul className="applicationStatus">
               
        {steps.map((step, index) => (
            <li className={(index === 0 ? 'step1' : index === steps.length - 1 ? 'step3' : 'step2')+ (index + 1 === currentStep ? 'active' : '')}>
                {step}
            </li>
        ))}
                   </ul>
            </div>
      </div>
      <div className='section2-container'>
  <div className='section2-left'>
    <p>Criterio</p>
    {questions[currentStep - 1].map((question, index) => (
          <div key={index}>
            <span>{question['pregunta']}</span>
          </div>
        ))}
  </div>
  <div className='section2-right'>
  <p>Sí<span className='space'></span>No</p>
  {questions[currentStep - 1].map((question, index) => (
    <div key={index}>
      <input 
        type="radio" 
        id={`question${index}true`} 
        name={`question${question['id']}`} 
        value="true" 
        checked={answers[question.id] === true}
        onChange={(event) => handleRadioChange(event, question.id)}
      />
      <input 
        type="radio" 
        id={`question${index}false`} 
        name={`question${question['id']}`} 
        value="false"
        checked={answers[question.id] === false}
        onChange={(event) => handleRadioChange(event, question.id)}
      />
    </div>
  ))}
</div>
</div>
      <div className='section3'>
        <button onClick={handlePreviousStep} disabled={currentStep === 1} className={currentStep === 1 ? 'disabled' : ''}>
          Anterior
        </button>
              <button onClick={currentStep === 5 ? handleFinishButtonClick : handleNextStep}>
                  {currentStep === 5 ? 'Finalizar' : 'Siguiente'}
              </button>
              
          </div>
    </div>
  );
};

export default Questions;
