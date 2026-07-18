import { useState } from "react";

const movies = [
  {
    title: "The Shawshank Redemption",
    genres: ["Drama"],
    releaseYear: 1994,
  },
  {
    title: "The Dark Knight",
    genres: ["Crime", "Thriller"],
    releaseYear: 2008,
  },
  {
    title: "Inception",
    genres: ["Adventure", "Sci-Fi", "Thriller"],
    releaseYear: 2010,
  },
  {
    title: "Fight Club",
    genres: ["Crime", "Drama", "Thriller"],
    releaseYear: 1999,
  },
  {
    title: "Interstellar",
    genres: ["Adventure", "Drama", "Sci-Fi"],
    releaseYear: 2014,
  },
  {
    title: "Forrest Gump",
    genres: ["Drama", "Romance"],
    releaseYear: 1994,
  },
];

export default function MovieList() {
  const [genre, setGenre] = useState("All Genres");
  const genreOptions = new Set(["All Genres"]);
  movies.forEach((movieData) => {
    movieData.genres.forEach((genre) => {
      genreOptions.add(genre);
    });
  });

  let selectedMovies = [];
  if (genre === "All Genres") {
    selectedMovies = movies;
  } else {
    selectedMovies = movies.filter((movieData) =>
      movieData.genres.includes(genre),
    );
  }

  return (
    <div>
      <select
        name="genre"
        id="genre-select"
        onChange={(e) => setGenre(e.target.value)}
        style={{ marginBottom: 5 }}
      >
        {Array.from(genreOptions).map((genre) => (
          <option value={genre} key={genre}>
            {genre}
          </option>
        ))}
      </select>
      {selectedMovies.map((movieData) => (
        <MovieCard {...movieData} key={movieData.title} />
      ))}
    </div>
  );
}

function MovieCard(props) {
  const { title, genres, releaseYear } = props;
  return (
    <div className="movie-card" onClick={() => alert(title)}>
      <h2>{title}</h2>
      <p>{genres.join(", ")}</p>
      <p>{releaseYear}</p>
    </div>
  );
}
