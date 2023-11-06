import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?query=${query}`);
  };
  return (
    <>
    <div className="flex items-center md:flex-row flex-col">
      <input
        type="text"
        placeholder="Search..."
        className="border-2 border-gray-300  py-2 rounded-md"
        value={query}
              onChange={(e) => setQuery(e.target.value)}
      />
      <button
        type="button"
        className="bg-gray-500 text-white  md:ml-5 px-1 py-2  my-3 rounded-md"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
    </>
  )
}

export default SearchBar
