import React, { useState } from 'react';
import CoordinatorCard from './CoordinatorCard';
import '../styles/CoordinatorsList.css';

const CoordinatorsList = ({ coordinators, tab }) => {
  const [activeTab, setActiveTab] = useState('faculty');

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  const filteredCoordinators = coordinators.filter(coord => {
    if (tab === 'faculty') return coord.title.includes('Prof.') || coord.title.includes('Dr.');
    if (tab === 'student') return coord.title.includes('Student');
    return true;
  });

  return (
    <div className="coordinators-container">
      <div className="tabs">
        <button
          className={`tab-btn ${activeTab === 'faculty' ? 'active' : ''}`}
          onClick={() => handleTabChange('faculty')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5.86A1 1 0 0 1 5 18.86V5.14A1 1 0 0 1 5.86 4H9"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            <line x1="16" y1="21" x2="16" y2="13"></line>
            <line x1="8" y1="21" x2="8" y2="13"></line>
            <line x1="4" y1="21" x2="4" y2="13"></line>
          </svg>
          Faculty Coordinators
        </button>
        <button
          className={`tab-btn ${activeTab === 'student' ? 'active' : ''}`}
          onClick={() => handleTabChange('student')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5.86A1 1 0 0 1 5 18.86V5.14A1 1 0 0 1 5.86 4H9"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            <line x1="16" y1="21" x2="16" y2="13"></line>
            <line x1="8" y1="21" x2="8" y2="13"></line>
            <line x1="4" y1="21" x2="4" y2="13"></line>
          </svg>
          Student Coordinators
        </button>
      </div>

      <div className="section-title">
        <h2>{activeTab === 'faculty' ? 'Faculty Coordinators' : 'Student Coordinators'}</h2>
        <p>
          {activeTab === 'faculty'
            ? 'Reach out to our experienced faculty members who oversee campus events and student activities.'
            : 'Connect with student leaders organizing campus life and events.'}
        </p>
      </div>

      <div className="cards-grid">
        {filteredCoordinators.map((coord) => (
          <CoordinatorCard key={coord.id} coordinator={coord} />
        ))}
      </div>
    </div>
  );
};

export default CoordinatorsList;