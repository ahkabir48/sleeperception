import React from 'react';
import './DailyList.css';
import DailyLog from './DailyLog';

const DailyList: React.FC = () => {
    return (
        <div className="daily-list-container">
            <h2>Daily List</h2>
            <DailyLog />
        </div>
    );
};

export default DailyList;