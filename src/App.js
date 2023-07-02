import { useState, useEffect } from "react";

function App() {
  const [movies, setMovies] = useState(null);
  const [type, setType] = useState("movie");
  const [search, setSearch] = useState("fantasia");

  const key = "3b67358c";
  useEffect(() => {
    fetch(
      `http://www.omdbapi.com/?apikey=${key}&type=${type}&s=${search}&page=1-100`
    )
      .then((response) => response.json())
      .then((data) => setMovies(data));
  }, [type, search]);

  function handleSubmit(event) {
    event.preventDefault();
    console.log(event);
  }

  function handleSearch(event) {
    console.log(event);
  }

  return (
    <div className="App">
      <h1>Movie List</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Search Type</label>
          <select>
            <option name="movie" value="movie">
              Movie
            </option>
            <option name="series" value="series">
              Series
            </option>
            <option name="series" value="episode">
              Episode
            </option>
          </select>
        </div>
        <div>
          <input
            name="query"
            value={search}
            type="search"
            placeholder="Search"
            onChange={handleSearch}
          ></input>
        </div>
        <input type="submit" value="Search" />
      </form>
      {movies !== null ? (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Year</th>
              <th>Type</th>
              <th>Poster</th>
            </tr>
          </thead>
          <tbody>
            {Object.values(movies.Search).map((movie) => (
              <tr key={movie.imdbID}>
                <td>{movie.Title}</td>
                <td>{movie.Year}</td>
                <td>{movie.Type}</td>
                <td>
                  <img
                    width="150px"
                    height="200px"
                    src={movie.Poster}
                    alt="poster"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;

// useEffect(() => {
//   fetchMovies();
// }, []);

// const fetchMovies = async () => {
//   let allMovies = [];

//   for (let page = 1; page <= 100; page++) {
//     const response = await fetch(
//       `http://www.omdbapi.com/?apikey=${key}&type=movie&s=fantasia&page=${page}`
//     );
//     const data = await response.json();
//     if (data.Response === "True") {
//       allMovies = allMovies.concat(data.Search);
//     } else {
//       break;
//     }
//   }

//   setMovies(allMovies);
// };

// console.log(movies);

// return (
//   <div className="App">
//     <h1>Movie List</h1>
//     {movies !== null ? (
//       <table>
//         <thead>
//           <tr>
//             <th>Title</th>
//             <th>Year</th>
//             <th>Type</th>
//             <th>Poster</th>
//           </tr>
//         </thead>
//         <tbody>
//           {movies.map((movie) => (
//             <tr key={movie.imdbID}>
//               <td>{movie.Title}</td>
//               <td>{movie.Year}</td>
//               <td>{movie.Type}</td>
//               <td>
//                 <img
//                   width="100px"
//                   height="100px"
//                   src={movie.Poster}
//                   alt="poster"
//                 />
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     ) : (
//       <p>Loading...</p>
//     )}
