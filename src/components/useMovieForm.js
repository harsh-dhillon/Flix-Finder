import { useState } from "react";
import { genres } from "./genres";
import { fetchMovieRecommendations } from "./movieApi";

export default function useMovieForm(onSubmit) {
  const [isLoading, setIsLoading] = useState(false);
  const [genreCheckboxes, setGenreCheckboxes] = useState(
    genres.map(() => false)
  );
  const [moviePreferences, setMoviePreferences] = useState([]);

  const handleCheckboxChange = (event, index) => {
    const isChecked = event.target.checked;
    setGenreCheckboxes((prevCheckboxes) =>
      prevCheckboxes.map((value, i) => (i === index ? isChecked : value))
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const selectedGenres = genres
      .filter((_, index) => genreCheckboxes[index])
      .join(", ");

    let promptText = "";

    if (moviePreferences.length > 0) {
      if (promptText) {
        promptText += ", ";
      }
      promptText += `Movies similar to: ${moviePreferences}`;
    }

    if (selectedGenres) {
      promptText += `Genres: ${selectedGenres}`;
    }

    if (!promptText) {
      promptText = "Recommend random movies.";
    }

    promptText += "\n";

    const recommendations = await fetchMovieRecommendations(promptText);
    onSubmit(recommendations);
    setIsLoading(false);
  };

  return {
    isLoading,
    genreCheckboxes,
    moviePreferences,
    setMoviePreferences,
    handleCheckboxChange,
    handleSubmit,
  };
}
