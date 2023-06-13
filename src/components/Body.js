import React, { Component } from 'react'
import '../styles/Body.css' // Importa el archivo CSS
import Presentation from './body/Presentation'
import Init from './body/Init'
import Questions from './body/Questions'
import Finish from './body/Finish'

class Body extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentContent: 'presentation', // estado inicial
        }
    }
    handleViewEvaluation = () => {
        this.setState({ currentContent: 'init' })
    }
    handleStartEvaluation = () => {
        this.setState({ currentContent: 'questions' })
    }

    handleStartFinish = () => {
        this.setState({ currentContent: 'finish' })
    }

    render() {
        const states = {
            presentation: <Presentation onClick={this.handleViewEvaluation} />,
            init: <Init onClick={this.handleStartEvaluation} />,
            questions: <Questions  onClick={this.handleStartFinish} />,
            finish : <Finish />,
        }
        const currentContent = states[this.state.currentContent]

        return <div className="main">{currentContent}</div>
    }
}

export default Body
