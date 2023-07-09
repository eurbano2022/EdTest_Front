import React, { Component } from 'react';
import '../../styles/Presentation.css';
import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    ResponsiveContainer,
} from 'recharts';

class Finish extends Component {
    render() {
        const data = [
            { category: 'A', value: 80 },
            { category: 'B', value: 100 },
            { category: 'C', value: 90 },
            { category: 'D', value: 30 },
            { category: 'E', value: 50 },
        ];

        return (
            <div className='presentation-container'>
                <ResponsiveContainer width='100%' height={300}>
                    <RadarChart cx='50%' cy='50%' outerRadius='90%' data={data}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey='category' />
                        <PolarRadiusAxis
                            angle={0}
                            domain={[0, 100]}
                            tick={{ fill: 'gray', fontWeight: 'bold' }}
                            axisLine={{ stroke: 'blue' }}
                        />
                        <Radar
                            dataKey='value'
                            stroke='blue'
                            fill='lightblue'
                            fillOpacity={0.6}
                        />
                    </RadarChart>
                </ResponsiveContainer>
                <div className='presentation-right'>
                    <p>
                        Finish
                        <br />
                        Finish <br />
                        Finish.
                    </p>
                    <button
                        onClick={this.props.onClick}
                        className='presentation-button'
                    >
                        Finish
                    </button>
                </div>
            </div>
        );
    }
}

export default Finish;
