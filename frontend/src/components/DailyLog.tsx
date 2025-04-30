import React from 'react';
import './DailyLog.css';

interface DailyLogProps {
    date: string;
    satisfactorySleep: number;
    totalSleep: number;
}

const DailyLog: React.FC<DailyLogProps> = ({ date, satisfactorySleep, totalSleep }) => {
    const sleepScore = Math.round((satisfactorySleep / totalSleep) * 100);
    
    const getScoreColor = (score: number) => {
        if (score >= 75) return '#28a745'; // Green
        if (score >= 50) return '#ffc107'; // Yellow
        return '#dc3545'; // Red
    };

    return (
        <div className="daily-log">
            <div className="log-header">
                <h3>{date}</h3>
                <div className="sleep-score-container">
                    <div className="sleep-score-bar">
                        <div 
                            className="sleep-score-fill"
                            style={{ 
                                width: `${sleepScore}%`,
                                backgroundColor: getScoreColor(sleepScore)
                            }}
                        />
                    </div>
                    <span className="sleep-score-value">{sleepScore}%</span>
                </div>
            </div>
            <div className="log-details">
                <div className="sleep-metric">
                    <span className="metric-label">Satisfactory Sleep</span>
                    <span className="metric-value">{satisfactorySleep} hours</span>
                </div>
                <div className="sleep-metric">
                    <span className="metric-label">Total Sleep</span>
                    <span className="metric-value">{totalSleep} hours</span>
                </div>
            </div>
        </div>
    );
};

export default DailyLog;