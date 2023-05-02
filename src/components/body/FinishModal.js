import { useState } from 'react';
import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import '../../styles/FinishModal.css';
// import 'bootstrap/dist/css/bootstrap.min.css';

function FinishModal(props) {
  const [name, setName] = useState('');
  const [size, setSize] = useState('');
  const [industry, setIndustry] = useState('');
  const [email, setEmail] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSizeChange = (event) => {
    setSize(event.target.value);
  };

  const handleIndustryChange = (event) => {
    setIndustry(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Do something with the form data
    props.onClose();
  };

  return (
    <Modal show={props.show} onHide={props.onClose}>
      <Modal.Header closeButton>
      </Modal.Header>
      <Modal.Body>
        <p>Registra los siguientes datos para enviar tus resultados y 
        una guía basada en buenas prácticas de industria que podrán 
        ayudar a mejorar el proceso de pruebas en tu organización.</p>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="name">
            <Form.Label>Nombre de la empresa</Form.Label>
            <Form.Control type="text" placeholder="Ingrese el nombre de la empresa" value={name} onChange={handleNameChange} />
          </Form.Group>

          <Form.Group controlId="size">
            <Form.Label>Tamaño de la empresa</Form.Label>
            <Form.Control as="select" value={size} onChange={handleSizeChange}>
              <option>Seleccionar...</option>
              <option>1 - 50</option>
              <option>51 - 200</option>
              <option>201 - 500</option>
              <option>+500</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="industry">
            <Form.Label>Industria</Form.Label>
            <Form.Control as="select" value={industry} onChange={handleIndustryChange}>
              <option>Seleccionar...</option>
              <option>Informática y tecnología</option>
              <option>Salud</option>
              <option>Alimentos y bebidas</option>
              <option>Finanzas y economía</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email corporativo</Form.Label>
            <Form.Control type="email" placeholder="Ingrese el email corporativo" value={email} onChange={handleEmailChange} />
          </Form.Group>

          <Button variant="primary" type="submit">
            Ver Resultados
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default FinishModal