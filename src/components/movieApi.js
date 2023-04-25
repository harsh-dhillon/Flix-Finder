import axios from "axios";

export async function fetchMovieRecommendations(promptText) {
  try {
    const response = await axios.post("/api/handler", { prompt: promptText });
    const recommendations = response.data.data
      .split(",")
      .map((movie) => movie.trim());
    return recommendations;
  } catch (error) {
    console.error("Error fetching recommendations:", error.message);
    return [];
  }
}
