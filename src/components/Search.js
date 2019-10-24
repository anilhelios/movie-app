import React, { useState } from "react";

const Search = ({ search }) => {
  const [searchValue, setSearchValue] = useState("");
  const [sort, setSort] = useState("");

  const handleSearchInputChanges = e => {
    setSearchValue(e.target.value);
  };
  const sorting = e => {
   setSort(e.target.value);
   console.log(sort);
  };
  const resetInputField = () => {
    setSearchValue("");
  };

  const callSearchFunction = e => {
    e.preventDefault();
    search(searchValue,sort);
    resetInputField();
  };

  return (
    <form className="search">

      <input
        value={searchValue}
        onChange={handleSearchInputChanges}
        type="text"
      />
      <input onClick={callSearchFunction} type="submit" value="SEARCH" />
      Sort: <label><input type="radio" name="sortData" value="Title" onClick={sorting}/>  Title </label>
      <label><input type="radio" value="Year" name="sortData" onClick={sorting}/> Date </label>
        
    </form>
  );
};

export default Search;
