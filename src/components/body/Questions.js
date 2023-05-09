import React, { useState } from 'react'

import '../../styles/Questions.css'
import FinishModal from './FinishModal'

const Questions = () => {
    const [showFinishModal, setShowFinishModal] = useState(false)
    const [currentStep, setCurrentStep] = useState(1)
    const [answers, setAnswers] = useState({})
    const [questions, setQuestions] = useState([
        [
            { id: '1', pregunta: 'Pregunta 1', url: '', padre: null },
            { id: '2', pregunta: 'Pregunta 1.1', url: '', padre: '1' },
            { id: '3', pregunta: 'Pregunta 1.2', url: '', padre: '1' },
            { id: '4', pregunta: 'Pregunta 2', url: '', padre: null },
        ],
        [
            { id: '5', pregunta: 'Pregunta 3', url: '', padre: null },
            { id: '6', pregunta: 'Pregunta 4', url: '', padre: null },
        ],
        [
            { id: '7', pregunta: 'Pregunta 5', url: '', padre: null },
            { id: '8', pregunta: 'Pregunta 6', url: '', padre: null },
        ],
        [
            { id: '9', pregunta: 'Pregunta 7', url: '', padre: null },
            { id: '10', pregunta: 'Pregunta 8', url: '', padre: null },
        ],
        [
            { id: '11', pregunta: 'Pregunta 9', url: '', padre: '' },
            { id: '12', pregunta: 'Pregunta 10', url: '', padre: '' },
        ],
    ])

    const handleRadioChange = (event, questionId) => {
        const answer = event.target.value === 'true'
        setAnswers((prevAnswers) => ({ ...prevAnswers, [questionId]: answer }))

        // Autocompletar respuestas de preguntas hijas si se seleccionó "No" en la pregunta padre
        const parentId = questions[currentStep - 1].find(
            (question) => question.id === questionId
        ).padre
        const childrenIds = getChildrenIds(parentId)
        if (shouldAutoFillChildren(parentId)) {
            const newAnswers = { ...answers }
            childrenIds.forEach((childId) => {
                newAnswers[childId] = false
            })
            setAnswers(newAnswers)
        }

        console.log('respuestas: ', answers)
    }

    const handlePreviousStep = () => {
        setCurrentStep(currentStep - 1)
        console.log('answers:', answers)
    }

    const handleNextStep = () => {
        setCurrentStep(currentStep + 1)
        console.log('answers:', answers)
    }

    const handleFinishButtonClick = () => {
        console.log('presionado ***')
        setShowFinishModal(true)
    }

    const handleFinishModalClose = () => {
        setShowFinishModal(false)
    }

    const getChildrenIds = (parentId) => {
        return questions[currentStep - 1]
            .filter((question) => question.padre === parentId)
            .map((question) => question.id)
    }

    const shouldAutoFillChildren = (parentId) => {
        const childrenIds = getChildrenIds(parentId)
        const isParentSelected = answers[parentId] === false

        return (
            isParentSelected &&
            childrenIds.every((childId) => answers[childId] !== true)
        )
    }
    const steps = [
        'Politica Estrategica',
        'Planeacion',
        'Monitoreo y control',
        'Diseño y ejecucion',
        'Ambientes',
    ]

    return (
        <div className="questions">
            <FinishModal
                show={showFinishModal}
                onClose={handleFinishModalClose}
            />

            <div className="section1">
                <div id="applicationStatus">
                    <ul className="applicationStatus">
                        {steps.map((step, index) => (
                            <li
                                className={
                                    (index === 0
                                        ? 'step1'
                                        : index === steps.length - 1
                                        ? 'step3'
                                        : 'step2') +
                                    (index + 1 === currentStep ? 'active' : '')
                                }
                            >
                                {step}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="section2-container">
                <div className="section2-left">
                    <p>Criterio</p>
                    {questions[currentStep - 1].map(
                        (question, index) =>
                            (answers[question.padre] === undefined ||
                                answers[question.padre] === true) && (
                                <div key={index}>
                                    <span>{question['pregunta']}</span>
                                </div>
                            )
                    )}
                </div>
                <div className="section2-right">
                    <p>
                        Sí<span className="space"></span>No
                    </p>
                    {questions[currentStep - 1].map(
                        (question, index) =>
                            (answers[question.padre] === undefined ||
                                answers[question.padre] === true) && (
                                <div key={index}>
                                    <input
                                        type="radio"
                                        id={`question${index}true`}
                                        name={`question${question['id']}`}
                                        value="true"
                                        checked={answers[question.id] === true}
                                        onChange={(event) =>
                                            handleRadioChange(
                                                event,
                                                question.id
                                            )
                                        }
                                    />
                                    <input
                                        type="radio"
                                        id={`question${index}false`}
                                        name={`question${question['id']}`}
                                        value="false"
                                        checked={answers[question.id] === false}
                                        onChange={(event) =>
                                            handleRadioChange(
                                                event,
                                                question.id
                                            )
                                        }
                                    />
                                </div>
                            )
                    )}
                </div>
            </div>
            <div className="section3">
                <button
                    onClick={handlePreviousStep}
                    disabled={currentStep === 1}
                    className={currentStep === 1 ? 'disabled' : ''}
                >
                    Anterior
                </button>
                <button
                    onClick={
                        currentStep === 5
                            ? handleFinishButtonClick
                            : handleNextStep
                    }
                >
                    {currentStep === 5 ? 'Finalizar' : 'Siguiente'}
                </button>
            </div>
        </div>
    )
}

export default Questions
