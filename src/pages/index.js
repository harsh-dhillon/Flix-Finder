import Head from "next/head";
import { useState, useEffect } from "react";
import MovieForm from "@/components/MovieForm";
import MovieList from "@/components/MovieList";
import LoadingBar from "react-top-loading-bar";

export default function App() {
    const [movieRecommendations, setMovieRecommendations] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [hasLoaded, setHasLoaded] = useState(false);


    useEffect(() => {
        const storedRecommendations = localStorage.getItem("movieRecommendations");
        if (storedRecommendations) {
            setMovieRecommendations(JSON.parse(storedRecommendations));
        }
        setHasLoaded(true);
    }, []);

    useEffect(() => {
        if (!isLoading) {
            const scrollY = window.scrollY;
            setTimeout(() => {
                window.scrollTo(0, scrollY);
            }, 0);
        }
    }, [isLoading]);

    const handleSubmit = (recommendations) => {
        setProgress(30);
        setIsLoading(true);

        setTimeout(() => {
            setMovieRecommendations(recommendations);
            setIsLoading(false);
            setProgress(100);
            localStorage.setItem(
                "movieRecommendations",
                JSON.stringify(recommendations)
            );
        }, 1000);
    };

    return (
        <div className="container mx-auto my-3 px-10 sm:px-8 lg:max-w-7xl">
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
                <h1 className="text-3xl sm:text-4xl font-bold m-5">Flix Finder</h1>

                <MovieForm onSubmit={handleSubmit} />
                <div className="container lg:max-w-7xl" style={{ minHeight: "330px" }}>
                    <MovieList movieRecommendations={movieRecommendations} hasLoaded={hasLoaded} />
                </div>
            </main>
        </div>
    );
}
