import React from 'react';
import LocationSearch from './LocationSearch';

interface TopBarProps {
  onLocationSelect: (city: string) => void;
  activeTab: 'today' | 'week';
  setActiveTab: (tab: 'today' | 'week') => void;
  onSettingsClick: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ onLocationSelect, activeTab, setActiveTab, onSettingsClick }) => {
  return (
    <div className="top-bar">
      <div className="search-section">
        <LocationSearch onLocationSelect={onLocationSelect} />
      </div>
      <div className="tabs-section">
        <button
          className={`tab-button ${activeTab === 'today' ? 'active' : ''}`}
          onClick={() => setActiveTab('today')}
        >
          Today
        </button>
        <button
          className={`tab-button ${activeTab === 'week' ? 'active' : ''}`}
          onClick={() => setActiveTab('week')}
        >
          Week
        </button>
      </div>
      <div className="actions-section">
        <button className="settings-button" onClick={onSettingsClick}>
          <i className="fas fa-cog"></i>
        </button>
        <div className="profile-avatar">
          <i className="fas fa-user"></i>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
