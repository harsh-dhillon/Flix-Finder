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
  menu: (provided, state) => ({
    ...provided,
    maxHeight: "300px"
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: "#f3f4f6",
    maxWidth: "215px",
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
    minWidth: "30px"
  }),

  singleValue: (provided) => ({
    ...provided,
    minWidth: "0",
    maxWidth: "50px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  }),
  placeholder: (provided) => ({
    ...provided,
    textAlign: "center",
    paddingTop: "20px",
  }),
};

const MoviePreferencesInput = ({

  moviePreferences,
  setMoviePreferences

}) => {
  return (
    <AsyncSelect
      isMulti
      loadOptions={fetchMovies}
      className="custom-select-container"
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
