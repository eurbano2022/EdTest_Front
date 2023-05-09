import React, { Component } from 'react'
import '../../styles/Presentation.css'

class Presentation extends Component {
    render() {
        return (
            <div className="presentation-container">
                <div className="presentation-left">
                    <p>
                        ¿Quieres saber cómo mejorar el <br />
                        proceso de <b>pruebas de software </b>
                        <br />
                        en tu organización?
                    </p>
                </div>
                <div className="presentation-right">
                    <p>
                        Conoce el estado actual de tu proceso y descubre
                        <br />
                        cómo iniciar un proceso de mejora utilizando <br />
                        prácticas probadas en la industria.
                    </p>
                    <button
                        onClick={this.props.onClick}
                        className="presentation-button"
                    >
                        Iniciar Evaluación
                    </button>
                </div>
            </div>
        )
    }
}

export default Presentation
