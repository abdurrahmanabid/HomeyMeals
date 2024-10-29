import React, { useState } from "react";
import MenuHeader from "../components/MenuHeader";
import ProductList from "../components/ProductList";
import SearchComponent from "../components/SearchComponent";
import meals from "../store/meals";

const AllMenus = () => {
  const [filteredMeals, setFilteredMeals] = useState(meals); // Initialize with all meals

  const handleSearchResults = (results) => {
    setFilteredMeals(results); // Update the state with the search results
  };

  return (
    <div className=" mx-2 lg:mx-32">
      <MenuHeader />
      <SearchComponent
        data={meals}
        placeholder="Search for meals..."
        onResults={handleSearchResults} 
        searchKey="meal_name" 
      />
      <ProductList meals={filteredMeals} />
      
    </div>
  );
};

export default AllMenus;
