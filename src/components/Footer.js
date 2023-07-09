import React, { Component } from 'react';
import '../styles/Footer.css'; // Importa el archivo CSS
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

class Footer extends Component {
    render() {
        return (
            <footer className='footer'>
                {' '}
                {/* Agrega la clase "footer" */}
                <div className='left-section'>
                    <p>© 2023 EDTest. All rights reserved</p>
                </div>
                <div className='right-section'>
                    <a href='https://www.youtube.com'>
                        <FaYoutube />
                    </a>
                    <a href='https://www.facebook.com'>
                        <FaFacebook />
                    </a>
                    <a href='https://www.instagram.com'>
                        <FaInstagram />
                    </a>
                    <a href='https://twitter.com'>
                        <FaTwitter />
                    </a>
                </div>
            </footer>
        );
    }
}

export default Footer;
