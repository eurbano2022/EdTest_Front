import React, { Component } from 'react'
import '../../styles/Init.css'

class Init extends Component {
    render() {
        return (
            <div className="container">
                <div className="title">
                    <p>Cómo realizar la evaluación</p>
                    <p className="subtitle">
                        Realiza la evaluación, siguiendo los siguientes pasos
                    </p>
                </div>
                <div className="steps">
                    <div className="step">
                        <p className="step-number">1</p>
                        <p className="step-description">
                            Marca si o no de acuerdo <br />
                            con lo que actualmente <br />
                            existe o se realiza en la
                            <br />
                            organización
                        </p>
                    </div>
                    <div className="step">
                        <p className="step-number">2</p>
                        <p className="step-description">
                            Para conocer más sobre
                            <br />
                            cada criterio solo presiona
                            <br />
                            sobre el criterio para
                            <br />
                            obtener más información
                        </p>
                    </div>
                    <div className="step">
                        <p className="step-number">3</p>
                        <p className="step-description">
                            Al terminar, presiona el
                            <br />
                            botón Finalizar
                        </p>
                    </div>
                    <div className="step">
                        <p className="step-number">4</p>
                        <p className="step-description">
                            Registra los datos básicos <br />
                            con los cuales podremos <br />
                            generar los resultados de <br />
                            la evaluación
                        </p>
                    </div>
                </div>
                <div>
                    <button onClick={this.props.onClick} className="button">
                        Iniciar Evaluación
                    </button>
                </div>
            </div>
        )
    }
}

export default Init
