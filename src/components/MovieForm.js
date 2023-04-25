import MoviePreferencesInput from "./MoviePreferencesInput";
import useMovieForm from "./useMovieForm";
import { genres } from "@/components/genres";
import { BeatLoader } from "react-spinners";

function MovieForm({ onSubmit }) {
  const {
    isLoading,
    genreCheckboxes,
    moviePreferences,
    setMoviePreferences,
    handleCheckboxChange,
    handleSubmit,
  } = useMovieForm(onSubmit);

  return (
    <>
      <form onSubmit={handleSubmit} className="container mx-auto lg:max-w-7xl">
        <div className="flex flex-wrap justify-center items-start my-2">
          <div className="w-full md:w-1/2 md:px-3 mb-4 md:mb-0">
            <fieldset className="border border-gray-300 p-4 mb-4 rounded-md">
              <legend className="text-lg font-semibold mb-2">
                Select your favorite genres
              </legend>
              <div className="flex flex-wrap items-center justify-center">
                {genres.map((genre, index) => (
                    <div
                        key={index}
                        className="flex items-center mb-2 w-1/2 md:w-1/4"
                    >
                      <input
                          type="checkbox"
                          id={`genre-${index}`}
                          className="mr-1 text-blue-500"
                          checked={genreCheckboxes[index]}
                          onChange={(event) => handleCheckboxChange(event, index)}
                      />
                      <label
                          className="text-sm text-gray-700 cursor-pointer"
                          htmlFor={`genre-${index}`}
                      >
                        {genre}
                      </label>
                    </div>
                ))}
              </div>
            </fieldset>
          </div>

          <div className="w-full md:w-1/2 md:px-4 mb-6 md:mb-0">
            <fieldset className="border border-gray-300 p-4 mb-2 rounded-md">
              <legend className="text-lg font-semibold">
                Select your favorite movies
              </legend>
              <MoviePreferencesInput
                moviePreferences={moviePreferences}
                setMoviePreferences={setMoviePreferences}
              />
            </fieldset>
            <div className="flex flex-col items-center justify-center mb-4">
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
                disabled={isLoading}
              >
                <div
                  style={{
                    width: "100%",
                    minHeight: "24px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {isLoading ? (
                    <BeatLoader size={10}  color={"#fff"} />
                  ) : (
                    "Search"
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default MovieForm;
