import { Button, TextInput } from "flowbite-react";
import { debounce } from "lodash";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { FaSearchengin } from "react-icons/fa";

const SearchComponent = ({ data, placeholder, onResults, searchKey }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const resultsRef = useRef(null);
  const onResultsRef = useRef(onResults); // Create a stable ref for onResults

  const handleSearch = useCallback(
    debounce((value) => {
      setSearchTerm(value);
    }, 300),
    []
  );

  useEffect(() => {
    // Use onResultsRef to access the stable function
    if (searchTerm) {
      const normalizedTerm = searchTerm
        .toLowerCase()
        .trim()
        .replace(/\s+/g, " ");
      const results = data.filter((item) => {
        const searchValue = item[searchKey];
        if (Array.isArray(searchValue)) {
          return searchValue.some((obj) =>
            Object.values(obj).some((val) =>
              val?.toString().toLowerCase().includes(normalizedTerm)
            )
          );
        }
        return searchValue?.toString().toLowerCase().includes(normalizedTerm);
      });
      setFilteredResults(results);
      onResultsRef.current(results);
    } else {
      setFilteredResults([]);
      onResultsRef.current(data);
    }
  }, [searchTerm, data, searchKey]); // Remove onResults from the dependency array

  useEffect(() => {
    onResultsRef.current = onResults; // Update ref when onResults changes
  }, [onResults]);

  const handleClickOutside = (event) => {
    if (resultsRef.current && !resultsRef.current.contains(event.target)) {
      setFilteredResults([]);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const clearSearch = () => {
    setSearchTerm("");
    setFilteredResults([]);
  };

  return (
    <div className="mb-4 flex justify-center">
      <div className="max-w-md w-full relative">
        <TextInput
          id="search"
          onChange={(e) => handleSearch(e.target.value)}
          type="text"
          rightIcon={FaSearchengin}
          placeholder={placeholder}
          required
          style={{ fontSize: "1rem" }}
        />
        {searchTerm && filteredResults.length > 0 && (
          <div
            className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-1"
            ref={resultsRef}
          >
            <div className="max-h-60 overflow-auto">
              {filteredResults.map((item) => (
                <div
                  key={item.id}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setSearchTerm(item[searchKey]);
                    setFilteredResults([]);
                  }}
                >
                  {item[searchKey]}
                </div>
              ))}
            </div>
            <Button onClick={clearSearch} className="w-full mt-2">
              Clear Search
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchComponent;
