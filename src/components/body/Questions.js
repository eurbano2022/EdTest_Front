import React, { useState, useEffect } from 'react'

import '../../styles/Questions.css'
import FinishModal from './FinishModal'
import { URL_BACKEND } from '../../commons/constants'

const Questions = () => {
    const [showFinishModal, setShowFinishModal] = useState(false)
    const [currentLevel, setcurrentLevel] = useState(1)
    const [currentProcessArea, setcurrentProcessArea] = useState(1)
    
    const [levels, setLevels] = useState({})
    const [answers, setAnswers] = useState({})
    const [processAreas, setProcessAreas] = useState([])
    const [questions, setQuestions] = useState([])

    useEffect(() => {
        fetchProcessAreas()
        fetchCriteria()
        fetchLevels()
    }, [])
    const fetchLevels = async () => {
        try {
            const response = await fetch(`${URL_BACKEND}/levels`)
            const jsonData = await response.json()
            setLevels(jsonData)
        } catch (error) {
            console.log(error)
        }
    }
    const fetchProcessAreas = async () => {
        try {
            const response = await fetch(`${URL_BACKEND}/processAreas`)
            console.log(response)
            
            const jsonData = await response.json()
            console.log(jsonData)
            const result = jsonData.reduce((resultArray, item) => {
                const { level } = item

                if (!resultArray[level.id]) {
                    resultArray[level.id] = [] // Crea un nuevo subarreglo si no existe
                }

                resultArray[level.id].push(item) // Agrega el elemento al subarreglo correspondiente

                return resultArray
            }, [])
            console.log(result)
            console.log(result[currentLevel])
            setProcessAreas(result)
        } catch (error) {
            console.log(error)
        }
    }

    const fetchCriteria = async () => {
        try {
            const response = await fetch(`${URL_BACKEND}/criteria`)
            console.log(response)
            
            const jsonData = await response.json()
            console.log(jsonData)
            const result = jsonData.reduce((resultArray, item) => {
                const { processArea } = item

                if (!resultArray[processArea.id]) {
                    resultArray[processArea.id] = [] // Crea un nuevo subarreglo si no existe
                }

                resultArray[processArea.id].push(item) // Agrega el elemento al subarreglo correspondiente

                return resultArray
            }, [])
            console.log(result)
            console.log(result[currentLevel])
            setQuestions(result)
        } catch (error) {
            console.log(error)
        }
    }

    const handleRadioChange = (event, questionId) => {
        const answer = event.target.value === 'true'
        setAnswers((prevAnswers) => ({ ...prevAnswers, [questionId]: answer }))

        // Autocompletar respuestas de preguntas hijas si se seleccionó "No" en la pregunta padre
        const parentId = questions[currentProcessArea - 1].find(
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
        if (currentProcessArea - (5*(currentLevel-1)) === 1) {
            setcurrentProcessArea(5);
            setcurrentLevel(currentLevel - 1)
        }
        setcurrentProcessArea(currentProcessArea - 1)
        console.log('answers:', answers)
        console.log('currentLevel:', currentLevel)
        console.log('currentProcessArea:', currentProcessArea)
    }

    const handleNextStep = () => {
        if (currentProcessArea - (5*(currentLevel-1)) === 5) {
            setcurrentProcessArea(1);
            setcurrentLevel(currentLevel + 1)
        }
        setcurrentProcessArea(currentProcessArea + 1)
        console.log('answers:', answers)
        console.log('currentLevel:', currentLevel)
        console.log('currentProcessArea:', currentProcessArea)
    }

    const handleFinishButtonClick = () => {
        console.log('presionado ***')
        setShowFinishModal(true)
    }

    const handleFinishModalClose = () => {
        setShowFinishModal(false)
    }

    const getChildrenIds = (parentId) => {
        return questions[currentProcessArea - 1]
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

    return (
        <div className="questions">
            <FinishModal
                show={showFinishModal}
                onClose={handleFinishModalClose}
            />

            <div className="section1">
                <div id="applicationStatus">
                    <ul className="applicationStatus">
                        {
                            processAreas.length ? processAreas[currentLevel].map((processArea, index) => (
                                <li
                                    className={
                                        (index === 0
                                            ? 'step1'
                                            : index === processAreas[currentLevel].length - 1
                                                ? 'step3'
                                                : 'step2') +
                                        (index + 1 === (currentProcessArea - (5*(currentLevel-1))) ? 'active' : '')
                                       
                                    }
                                >
                                    {processArea.name}
                                </li>
                            ))
                                :
                                ''
                        }
                    </ul>
                </div>
            </div>
            <div className="section2-container">
                <div className="section2-left">
                    <p>Criterio</p>
                    {
                        questions.length ? questions[currentProcessArea].map(
                        (question, index) =>
                            (answers[question.padre] === undefined ||
                                answers[question.padre] === true) && (
                                <div key={index}>
                                    <span>{question.description}</span>
                                </div>
                            )
                        )
                            :
                            ''
                }
                </div>
                <div className="section2-right">
                    <p>
                        Sí<span className="space"></span>No
                    </p>
                    {
                        questions.length ? questions[currentProcessArea].map(
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
                        )
                        :
                        ''
                }
                </div>
            </div>
            <div className="section3">
                <button
                    onClick={handlePreviousStep}
                    disabled={currentProcessArea === 1 && currentLevel === 1}
                    className={currentProcessArea === 1 && currentLevel === 1 ? 'disabled' : ''}
                >
                    Anterior
                </button>
                <button
                    onClick={
                        (currentProcessArea - (5*(currentLevel-1))) === 5 && currentLevel === levels.length 
                            ? handleFinishButtonClick
                            : handleNextStep
                    }
                >
                    {(currentProcessArea - (5*(currentLevel-1))) === 5 && currentLevel === levels.length  ? 'Finalizar' : 'Siguiente'}
                </button>
            </div>
        </div>
    )
}

export default Questions
