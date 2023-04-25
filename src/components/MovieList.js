import PropTypes from "prop-types";
import MovieCard from "@/components/MovieCard";
import React from "react";

const movieRegex = /^(?:\d+\.\s*)?(.+?)(?:\s*\((\d{4})\))?$/i;

function normalizeTitle(title) {
    const titleWithoutSpecialChars = title.toLowerCase().replace(/[^\w\s]/gi, ""); // Remove special characters

    // Special case for Wall-E
    if (/^wall[-_]?e$/.test(titleWithoutSpecialChars)) {
        return "wall·e";
    }

    return titleWithoutSpecialChars;
}

function getMovieDetails(movie) {
  const match = movie.match(movieRegex);

  if (match) {
    const [, title, year] = match;
    const normalizedTitle = normalizeTitle(title.trim());

    return { title: normalizedTitle, year };
  }
  return null;
}

function MovieList({ movieRecommendations, hasLoaded }) {
  const movieTitles = movieRecommendations
      .flatMap((recommendation) =>
          recommendation
              .split("\n")
              .map((movie) => movie.trim())
              .filter((movie) => movie !== "")
              .map((movie) => getMovieDetails(movie))
      )
      .filter((movie) => movie !== null && movie.title && movie.year);

    if (movieTitles.length === 0 && hasLoaded) {
        return (
            <p className="text-gray-500 font-semibold">
                Search for some movie recommendations.
            </p>
        );
    }

  return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 justify-items-center">
        {movieTitles.map(({ title, year }, index) => (
            <div key={index}>
              <MovieCard movieTitle={title} releaseYear={year} />
            </div>
        ))}
      </div>
  );
}



MovieList.propTypes = {
    movieRecommendations: PropTypes.arrayOf(PropTypes.string).isRequired,
    hasLoaded: PropTypes.bool.isRequired,
};

export default MovieList;
