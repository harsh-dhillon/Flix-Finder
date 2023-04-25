import { useState, useEffect } from 'react';
import axios from 'axios';

const API_KEY = '0ba79a6e6c4aca6751e8e61f2eb2fb83';
const PLACEHOLDER_IMAGE_URL = '/placeholder.png';

export default function MovieCard({ movieTitle, releaseYear = null }) {
    const [movieDetails, setMovieDetails] = useState(null);

    useEffect(() => {
        const search = async () => {
            try {
                let url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
                    movieTitle
                )}`;
                if (releaseYear !== null) {
                    url += `&primary_release_year=${releaseYear}`;
                }

                const response = await axios.get(url);

                if (response.data.results.length > 0) {
                    const movieId = response.data.results[0].id;
                    const movieResponse = await axios.get(
                        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&append_to_response=credits,external_ids`
                    );
                    const {
                        title,
                        release_date,
                        vote_average,
                        vote_count,
                        overview,
                        credits,
                        poster_path,
                        external_ids,
                    } = movieResponse.data;
                    const imdbId = external_ids.imdb_id;
                    setMovieDetails({
                        title,
                        releaseYear: new Date(release_date).getFullYear(),
                        voteAverage: vote_average,
                        voteCount: vote_count,
                        overview,
                        imdbId,
                        posterPath: poster_path,
                    });
                }
            } catch (error) {
                console.error('Error fetching movie details:', error.message);
            }
        };

        search();
    }, [movieTitle, releaseYear]);

    if (!movieDetails) {
        return null;
    }

    const imdbUrl = `https://www.imdb.com/title/${movieDetails.imdbId}/`;
    const posterUrl = movieDetails.posterPath
        ? `https://image.tmdb.org/t/p/w342${movieDetails.posterPath}`
        : PLACEHOLDER_IMAGE_URL;

    return (
        <div className="bg-white shadow-md rounded-md p-0 mb-4 w-52 h-80 relative overflow-hidden mx-2">
            <img
                src={posterUrl}
                alt={movieDetails.title}
                className="w-full h-full rounded-md object-cover"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-75 opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center p-4 space-y-2">
                <h3 className="text-lg font-semibold text-white">{movieDetails.title}</h3>
                <p className="text-sm text-gray-300">Release Year - {movieDetails.releaseYear}</p>
                <p className="text-sm text-gray-300">Average Rating - {movieDetails.voteAverage.toFixed(1)}</p>
                <a
                    className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded inline-block"
                    href={imdbUrl}
                    target="_blank"
                    rel="noreferrer"
                >
                    IMDb
                </a>
            </div>
        </div>
    );
}
