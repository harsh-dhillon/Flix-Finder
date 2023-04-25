import React from "react";
import AsyncSelect from "react-select/async";
import fetchMovies from "./fetchMovies";

const customSelectStyles = {
  control: (provided) => ({
    ...provided,
    minHeight: "70px",
    height: "70px",
    borderRadius: "0.375rem",
    borderColor: "#d1d5db",
    boxShadow: "none",
    "&:hover": {
      borderColor: "#9ca3af",
    },
    display: "flex",
    alignItems: "flex-start",
  }),
  menu: (provided) => ({
    ...provided,
    maxHeight: "300px", // Increase the dropdown height
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: "#f3f4f6",
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    fontSize: "14px",
    color: "#4b5563",
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    color: "#9ca3af",
    ":hover": {
      backgroundColor: "#e5e7eb",
      color: "#1f2937",
    },
  }),
  valueContainer: (provided) => ({
    ...provided,
    maxHeight: "68px",
    overflowY: "auto",
  }),

  singleValue: (provided) => ({
    ...provided,
    paddingTop: "8px",
  }),
  placeholder: (provided) => ({
    ...provided,
    textAlign: "center",
    paddingTop: "20px",
  }),
};


const MoviePreferencesInput = ({
  moviePreferences,
  setMoviePreferences,
  style,
}) => {
  return (
    <AsyncSelect
      isMulti
      loadOptions={fetchMovies}
      className="react-select-container"
      classNamePrefix="react-select"
      placeholder="Movies you like"
      value={moviePreferences.map((movie) => ({ label: movie, value: movie }))}
      onChange={(selectedOptions) => {
        if (selectedOptions.length <= 5) {
          const selectedMovies = selectedOptions.map((option) => option.value);
          setMoviePreferences(selectedMovies);
        }
      }}
      styles={customSelectStyles}
    />
  );
};

export default MoviePreferencesInput;
