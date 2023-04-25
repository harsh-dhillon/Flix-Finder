import PropTypes from "prop-types";
import MovieCard from "@/components/MovieCard";
import React from "react";

const movieRegex = /^(?:\d+\.\s*)?(.+?)(?:\s*\((\d{4})\))?$/i;

function normalizeTitle(title) {
  return title.toLowerCase().replace(/[^\w\s]/gi, ""); // Remove special characters
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

function MovieList({ movieRecommendations }) {
  if (movieRecommendations.length === 0) {
    return (
        <p className="text-gray-500 font-semibold">
          No movie recommendations found.
        </p>
    );
  }

  return (
      <>
        {movieRecommendations.map((recommendation) => {
          const movieList = recommendation
              .split("\n")
              .map((movie) => movie.trim())
              .filter((movie) => movie !== "");
          const movieTitles = movieList
              .map((movie) => getMovieDetails(movie))
              .filter((movie) => movie !== null && movie.title && movie.year);

          if (movieTitles.length === 0) {
            return null;
          }

          return (
              <React.Fragment key={movieTitles[0].title}>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 justify-items-center">
                  {movieTitles.slice(0).map(({ title, year }, index) => (
                      <div key={index}>
                        <MovieCard movieTitle={title} releaseYear={year} />
                      </div>
                  ))}
                </div>
              </React.Fragment>
          );
        })}
      </>
  );
}


MovieList.propTypes = {
  movieRecommendations: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default MovieList;
