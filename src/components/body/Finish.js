import React, { Component } from 'react'
import '../../styles/Presentation.css'

class Finish extends Component {
    render() {
        return (
            <div className="presentation-container">
                <div className="presentation-left">
                    <p>
                        Finish
                    </p>
                </div>
                <div className="presentation-right">
                    <p>
                        Finish
                        <br />
                        Finish <br />
                        Finish.
                    </p>
                    <button
                        onClick={this.props.onClick}
                        className="presentation-button"
                    >
                        Finish
                    </button>
                </div>
            </div>
        )
    }
}

export default Finish