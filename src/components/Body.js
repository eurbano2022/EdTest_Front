import React, { Component } from 'react';
import '../styles/Body.css'; // Importa el archivo CSS
import Presentation from './body/Presentation';
import Init from './body/Init';
import Questions from './body/Questions';
// import Step1 from './Step1';
// import Step2 from './Step2';
// import Step3 from './Step3';
// import Step4 from './Step4';
// import Step5 from './Step5';
// import Finish from './Finish';
// importa los demás componentes para cada estado

class Body extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentContent: 'presentation' // estado inicial
    };
  }
  handleViewEvaluation = () => {
    this.setState({ currentContent: 'init' });
  }
  handleStartEvaluation = () => {
    this.setState({ currentContent: 'questions' });
  }
    
    render() {
    const states = {
        presentation: <Presentation onClick={this.handleViewEvaluation} />,
        init: <Init onClick={this.handleStartEvaluation} />,
        questions : <Questions />
        // finish : <Finish />,
    }
        const currentContent = states[this.state.currentContent];

    return (
        <div className="main">
            {currentContent}
        </div>
    );
  }
}

export default Body;