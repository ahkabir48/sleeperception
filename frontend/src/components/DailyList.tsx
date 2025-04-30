import React from 'react';
import './DailyList.css';
import DailyLog from './DailyLog';

interface DailyListProps {
    items: {
        date: string;
        satisfactorySleep: number;
        totalSleep: number;
    }[];
}

const DailyList: React.FC<DailyListProps> = ({ items }) => {
    return (
        <div className="daily-list">
            <h2>Sleep Log</h2>
            <div className="daily-list-container">
                {items.map((item, index) => (
                    <DailyLog
                        key={index}
                        date={item.date}
                        satisfactorySleep={item.satisfactorySleep}
                        totalSleep={item.totalSleep}
                    />
                ))}
            </div>
        </div>
    );
};

export default DailyList;