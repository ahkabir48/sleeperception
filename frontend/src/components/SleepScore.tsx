import React from 'react';
import './SleepScore.css';

interface SleepScoreProps {
    score: number; // Score from 0-100
}

const SleepScore: React.FC<SleepScoreProps> = ({ score }) => {
    // Calculate the color based on score
    const getScoreColor = (score: number) => {
        if (score >= 75) return '#28a745'; // Green
        if (score >= 50) return '#ffc107'; // Yellow
        return '#dc3545'; // Red
    };

    const getScoreGrade = (score: number) => {
        if (score >= 75) return 'A';
        if (score >= 50) return 'B';
        return 'C';
    };

    return (
        <div className="sleep-score-container">
            <div className="score-circle" style={{ 
                background: `conic-gradient(${getScoreColor(score)} ${score * 3.6}deg, #e9ecef ${score * 3.6}deg)`
            }}>
                <div className="score-inner">
                    <span className="score-value">{getScoreGrade(score)}</span>
                    <span className="score-label">Weekly Sleep Score</span>
                </div>
            </div>
        </div>
    );
};

export default SleepScore;
