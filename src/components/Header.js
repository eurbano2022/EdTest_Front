import React, { Component } from 'react';
import '../styles/Header.css'; // Importa el archivo CSS

class Header extends Component {
  render() {
    return (
      <header className="header">
        <div className="logo">
        <img src="images/logo.png" alt="Logo" />
        </div>
        <nav className="nav">
          <a href="#">Sobre Test</a>
          <a href="#">Servicios</a>
          <a href="#">Blog</a>
          <a href="#">Recursos</a>
          <a href="#">Contacto</a>
        </nav>
      </header>
    );
  }
}

export default Header;