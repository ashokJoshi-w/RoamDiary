import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileInfo from './cards/ProfileInfo.jsx';
import SearchBar from './Input/SearchBar';

const Navbar = React.memo(({ userInfo, searchQuery, setSearchQuery, onSearchNote, handleClearSearch }) => {
  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleSearch = () => {
    if (searchQuery) onSearchNote(searchQuery);
  };

  const onClearSearch = () => {
    setSearchQuery('');
    handleClearSearch();
  };

  return (
    <div className="rd-navbar">
      {/* Logo */}
      <h2 className="rd-logo">
        Roam<em>Diary</em>
      </h2>

      {/* Search + Profile */}
      {userInfo && (
        <div className="rd-navbar-right">
          <div className="rd-search-wrap">
            <SearchBar
              value={searchQuery}
              onChange={({ target }) => setSearchQuery(target.value)}
              handleSearch={handleSearch}
              onClearSearch={onClearSearch}
            />
          </div>
          <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
        </div>
      )}
    </div>
  );
});

export default Navbar;
