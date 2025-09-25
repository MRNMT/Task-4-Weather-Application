import React from 'react';
import type { Theme, Units } from '../types';

interface SettingsProps {
  theme: Theme | 'blackwhite';
  units: Units;
  onThemeChange: (theme: Theme | 'blackwhite') => void;
  onUnitsChange: (units: Units) => void;
  onClose?: () => void;
}

const Settings: React.FC<SettingsProps> = ({ theme, units, onThemeChange, onUnitsChange, onClose }) => {
  return (
    <div className="settings">
      <button className="close-settings" onClick={onClose}>×</button>
      <div className="settings-group">
        <label htmlFor="theme-select">Theme:</label>
        <select
          id="theme-select"
          value={theme}
          onChange={(e) => onThemeChange(e.target.value as Theme | 'blackwhite')}
          className="settings-select"
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="blackwhite">Black & White</option>
        </select>
      </div>

      <div className="settings-group">
        <label htmlFor="units-select">Units:</label>
        <select
          id="units-select"
          value={units}
          onChange={(e) => onUnitsChange(e.target.value as Units)}
          className="settings-select"
        >
          <option value="metric">Celsius (°C)</option>
          <option value="imperial">Fahrenheit (°F)</option>
        </select>
      </div>
    </div>
  );
};

export default Settings;
