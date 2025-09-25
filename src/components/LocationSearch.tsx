import React, { useState } from 'react';

interface LocationSearchProps {
  onLocationSelect: (city: string) => void;
}

const LocationSearch: React.FC<LocationSearchProps> = ({ onLocationSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onLocationSelect(searchTerm.trim());
      setSearchTerm('');
    }
  };

  return (
    <div className="location-search">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter city name"
          className="search-input"
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
    </div>
  );
};

export default LocationSearch;
