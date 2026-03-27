import { useState } from "react";
import './Searchbar.css';

const Searchbar = ({ infoFilter }) => {
  const [filter, setFilter] = useState("");

  const handleChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    infoFilter(filter);
  };

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={handleSubmit}>
        <button type="submit" className="SearchForm-button">
          <span className="button-label">Search</span>
        </button>

        <input
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="filter"
          value={filter}
          onChange={handleChange}
        />
      </form>
    </header>
  );
};

export default Searchbar;