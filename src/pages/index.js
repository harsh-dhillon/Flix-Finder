import Head from "next/head";
import { useState, useEffect } from "react";
import MovieForm from "@/components/MovieForm";
import MovieList from "@/components/MovieList";
import LoadingBar from "react-top-loading-bar";

export default function App() {
  const [movieRecommendations, setMovieRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Read stored recommendations from local storage when the component mounts
    const storedRecommendations = localStorage.getItem("movieRecommendations");
    if (storedRecommendations) {
      setMovieRecommendations(JSON.parse(storedRecommendations));
    }
  }, []);

  const handleSubmit = (recommendations) => {
    setProgress(30); // set the initial progress value when loading starts
    setIsLoading(true);

    setTimeout(() => {
      setMovieRecommendations(recommendations);
      setIsLoading(false);
      setProgress(100); // set the final progress value when loading finishes
      // Store recommendations in local storage
      localStorage.setItem(
        "movieRecommendations",
        JSON.stringify(recommendations)
      );
    }, 1000); // set the loading time (in milliseconds) here
  };

  return (
    <div className="container mx-auto">
      <Head>
        <title>Flix Finder</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <LoadingBar
        className="rainbow-progress"
        height={5}
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />

      <main className="text-center">
        <h1 className="text-4xl font-bold m-5">Flix Finder</h1>

        <MovieForm onSubmit={handleSubmit} />
        <MovieList movieRecommendations={movieRecommendations} />
      </main>
    </div>
  );
}
