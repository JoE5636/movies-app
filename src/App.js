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
    <div className="gap-10">
      <h1 className="text-3xl font-bold text-blue-500">Movie List</h1>
      <form className="flex gap-8" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Search Type
          </label>
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
            className="border border-gray-300 focus:outline-none focus:border-blue-500 rounded-full py-2 px-4"
            name="query"
            value={search}
            type="search"
            placeholder="Search"
            onChange={handleSearch}
          ></input>
        </div>
        <input
          type="submit"
          value="Search"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        />
      </form>
      {movies !== null ? (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Year
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Poster
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {Object.values(movies.Search).map((movie) => (
              <tr key={movie.imdbID}>
                <td className="px-6 py-4 whitespace-nowrap">{movie.Title}</td>
                <td className="px-6 py-4 whitespace-nowrap">{movie.Year}</td>
                <td className="px-6 py-4 whitespace-nowrap">{movie.Type}</td>
                <td className="px-6 py-4 whitespace-nowrap">
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
