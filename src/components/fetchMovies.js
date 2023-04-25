import axios from "axios";

const TMDB_API_KEY = "0ba79a6e6c4aca6751e8e61f2eb2fb83";

const fetchMovies = async (inputValue) => {
    if (!inputValue) return [];

    try {
        const response = await axios.get(
            `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${inputValue}`
        );

        const movies = response.data.results.map((movie) => ({
            label: movie.title,
            value: movie.title,
        }));
        return movies;
    } catch (error) {
        console.error("Error fetching movie suggestions:", error.message);
        return [];
    }
};

export default fetchMovies;