import React, { useState } from 'react'
import ReactModal from 'react-modal'
import { Button, Form } from 'react-bootstrap'
import '../../styles/FinishModal.css'
import SpiderChart from 'react-spider-chart'

function FinishModal(props) {
    const [name, setName] = useState('')
    const [size, setSize] = useState('')
    const [industry, setIndustry] = useState('')
    const [email, setEmail] = useState('')

    const handleNameChange = (event) => {
        setName(event.target.value)
    }

    const handleSizeChange = (event) => {
        setSize(event.target.value)
    }

    const handleIndustryChange = (event) => {
        setIndustry(event.target.value)
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        // Do something with the form data
        props.onClose()
    }

    return (
        <ReactModal
            isOpen={props.show}
            onRequestClose={props.onClose}
            contentLabel="Finish Modal"
            className="modal-content"
            overlayClassName="modal-overlay"
            style={{ zIndex: 100 }}
        >
            <div className="modal-header">
                <button className="modal-close-button" onClick={props.onClose}>
                    X
                </button>
            </div>
            <div className="modal-body">
                <p>
                    Registra los siguientes datos para enviar tus resultados y
                    una guía basada en buenas prácticas de industria que podrán
                    ayudar a mejorar el proceso de pruebas en tu organización.
                </p>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="name">
                        <Form.Control
                            type="text"
                            placeholder="Empresa"
                            value={name}
                            onChange={handleNameChange}
                            required
                        />
                        <Form.Text muted>Campo requerido</Form.Text>
                    </Form.Group>

                    <Form.Group controlId="size">
                        <Form.Control
                            as="select"
                            value={size}
                            onChange={handleSizeChange}
                            required
                        >
                            <option value="">Tamaño de la empresa</option>
                            <option value="1-50">1 - 50</option>
                            <option value="51-200">51 - 200</option>
                            <option value="201-500">201 - 500</option>
                            <option value="501+">+500</option>
                        </Form.Control>
                        <Form.Text muted>Campo requerido</Form.Text>
                    </Form.Group>

                    <Form.Group controlId="industry">
                        <Form.Control
                            as="select"
                            value={industry}
                            onChange={handleIndustryChange}
                            required
                        >
                            <option value="">Industria</option>
                            <option value="informatica-y-tecnologia">
                                Informática y tecnología
                            </option>
                            <option value="salud">Salud</option>
                            <option value="alimentos-y-bebidas">
                                Alimentos y bebidas
                            </option>
                            <option value="finanzas-y-economia">
                                Finanzas y economía
                            </option>
                        </Form.Control>
                        <Form.Text muted>Campo requerido</Form.Text>
                    </Form.Group>

                    <Form.Group controlId="email">
                        <Form.Control
                            type="email"
                            placeholder="E-mail corporativo"
                            value={email}
                            onChange={handleEmailChange}
                            required
                        />
                        <Form.Text muted>Campo requerido</Form.Text>
                    </Form.Group>

                    <Button
                        variant="primary"
                        type="submit"
                        className="btn-custom"
                        onClick={props.onClose}
                    >
                        Ver Resultados
                    </Button>
                </Form>
            </div>
        </ReactModal>
    )
}

export default FinishModal
