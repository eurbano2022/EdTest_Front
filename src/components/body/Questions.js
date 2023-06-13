import React, { useState, useEffect } from 'react'

import '../../styles/Questions.css'
import FinishModal from './FinishModal'
import { fetchCriteria, fetchLevels, fetchProcessAreas } from '../../commons/fetchData'

const Questions = (props) => {
    const [showFinishModal, setShowFinishModal] = useState(true)
    const [currentLevel, setcurrentLevel] = useState(1)
    const [currentProcessArea, setcurrentProcessArea] = useState(1)
    const [currentCriteria, setcurrentCriteria] = useState(0)
    const [currentHandle, setcurrentHandle] = useState(false)

    const [levels, setLevels] = useState([])
    const [answers, setAnswers] = useState({})
    const [processAreas, setProcessAreas] = useState([])
    const [questions, setQuestions] = useState([])

    useEffect(() => {
        getProcessAreas()
        getCriteria()
        getLevels()
    }, [])
    
    const getLevels = async () => {
        const data = await fetchLevels();
        console.log('data: ', data);
        setLevels(data)
        
    }
    const getProcessAreas = async () => {
        const data = await fetchProcessAreas();
        console.log('data: ', data);
        setProcessAreas( data)
    }

    const getCriteria = async () => {
        const data = await fetchCriteria();
        console.log('data: ', data);
        setQuestions( data);
    }

    useEffect(() => {
        if (answers && currentCriteria && currentHandle) {
            setcurrentHandle(false);
            const parentId = currentCriteria;
            const childrenIds = getChildrenIds(parentId)
            if (shouldAutoFillChildren(parentId)) {
                const newAnswers = { ...answers }
                childrenIds.forEach((childId) => {
                    newAnswers[childId] = false
                })
                setAnswers(newAnswers)
            }
        }
    }, [answers]);

    const handleRadioChange = (event, questionId) => {
        const answer = event.target.value === 'true'
        setAnswers({ ...answers, [questionId]: answer })
        setcurrentCriteria(questionId)
        setcurrentHandle(true);
    }

    const handlePreviousStep = () => {
        if (currentProcessArea - 5 * (currentLevel - 1) === 1) {
            setcurrentProcessArea(5)
            setcurrentLevel(currentLevel - 1)
        }
        setcurrentProcessArea(currentProcessArea - 1)
    }

    const handleNextStep = () => {
        if (currentProcessArea - 5 * (currentLevel - 1) === 5) {
            setcurrentProcessArea(1)
            setcurrentLevel(currentLevel + 1)
        }
        setcurrentProcessArea(currentProcessArea + 1)
    }

    const handleFinishButtonClick = () => {
        props.onClick()
    }

    const handleFinishModalClose = () => {
        setShowFinishModal(false)
    }

    const getChildrenIds = (parentId) => {
        return questions[currentProcessArea]
            .filter((question) => question.parent? question.parent.id === parentId : false)
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

    return (
        <div className="questions">
            <FinishModal
                show={showFinishModal}
                onClose={handleFinishModalClose}
            />

            <div className="section1">
                <div id="applicationStatus">
                    <ul className="applicationStatus">
                        {processAreas.length
                            ? processAreas[currentLevel].map(
                                  (processArea, index) => (
                                      <li
                                          className={
                                              (index === 0
                                                  ? 'step1'
                                                  : index ===
                                                    processAreas[currentLevel]
                                                        .length -
                                                        1
                                                  ? 'step3'
                                                  : 'step2') +
                                              (index + 1 ===
                                              currentProcessArea -
                                                  5 * (currentLevel - 1)
                                                  ? 'active'
                                                  : '')
                                          }
                                      >
                                          {processArea.name}
                                      </li>
                                  )
                              )
                            : ''}
                    </ul>
                </div>
            </div>
            <div className="section2-container">
                <div className="section2-left">
                    <p>Criterio</p>
                    {questions.length && questions[currentProcessArea].map((question, index) => {
                        const parentId = question && question.parent && question.parent.id;
                        const answer = answers[parentId];
                        if (answer === undefined || answer === true) {
                            return (
                            <div key={index}>
                                    <span>{question.description}</span>
                            </div>
                            );
                        }
                        return null;
                    })}
                </div>
                <div className="section2-right">
                    <p>
                        Sí<span className="space"></span>No
                    </p>
                    {questions.length && questions[currentProcessArea].map((question, index) => {
                        const parentId = question && question.parent && question.parent.id;
                        const answer = answers[parentId];
                        if (answer === undefined || answer === true) {
                            return (
                                    <div key={index}>
                                        <input
                                            type="radio"
                                            id={`question${index}true`}
                                            name={`question${question['id']}`}
                                            value="true"
                                            checked={
                                                answers[question.id] === true
                                            }
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
                                            checked={
                                                answers[question.id] === false
                                            }
                                            onChange={(event) =>
                                                handleRadioChange(
                                                    event,
                                                    question.id
                                                )
                                            }
                                        />
                                    </div>
                                )
                            }
                            return null;
                        })}
                </div>
            </div>
            <div className="section3">
                <button
                    onClick={handlePreviousStep}
                    disabled={currentProcessArea === 1 && currentLevel === 1}
                    className={
                        currentProcessArea === 1 && currentLevel === 1
                            ? 'disabled'
                            : ''
                    }
                >
                    Anterior
                </button>
                <button
                    onClick={
                        currentProcessArea - 5 * (currentLevel - 1) === 5 &&
                        currentLevel === (levels.length - 1)
                            ? handleFinishButtonClick
                            : handleNextStep
                    }
                >
                    {currentProcessArea - 5 * (currentLevel - 1) === 5 &&
                    currentLevel === (levels.length - 1)
                        ? 'Finalizar'
                        : 'Siguiente'}
                </button>
            </div>
        </div>
    )
}

export default Questions
