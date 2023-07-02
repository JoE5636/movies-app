import { useState } from "react";

function App() {
  const [movies, setMovies] = useState(null);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");

  const key = "3b67358c";

  const fetchMovies = async (search, type) => {
    let allMovies = [];

    for (let page = 1; page <= 100; page++) {
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=${key}&type=${type}&s=${search}&page=${page}`
      );
      const data = await response.json();
      if (data.Response === "True") {
        allMovies = allMovies.concat(data.Search);
      } else {
        <p>no match found</p>;
        break;
      }
    }

    setMovies(allMovies);
  };

  function handleSubmit(event) {
    event.preventDefault();
    fetchMovies(search, type);
  }

  function handleSearch(event) {
    setSearch(event.target.value);
  }
  function handleType(event) {
    setType(event.target.value);
  }

  return (
    <div className=" flex flex-col justify-center items-center gap-10">
      <div className="flex justify-center items-center">
        <h1 className="text-5xl font-bold text-blue-500 text-center">
          Movie List
        </h1>
      </div>
      <form
        className="flex gap-8 justify-center items-center"
        onSubmit={handleSubmit}
      >
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Search Type
          </label>
          <select onChange={handleType}>
            <option name="movie" value="movie">
              Movie
            </option>
            <option name="series" value="series">
              Series
            </option>
            <option name="episode" value="episode">
              Episode
            </option>
          </select>
        </div>
        <div>
          <input
            className="border border-gray-300 focus:outline-none focus:border-blue-500 rounded-full py-2 px-4"
            name="query"
            type="search"
            placeholder="Search"
            onChange={handleSearch}
          ></input>
        </div>
        <input
          type="submit"
          value="Search"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-sm"
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
            {movies.map((movie) => (
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
        <p>Ready to search</p>
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

// useEffect(() => {
//   fetch(
//     `http://www.omdbapi.com/?apikey=${key}&type=${type}&s=${search}&page=1-100`
//   )
//     .then((response) => response.json())
//     .then((data) => setMovies(data));
// }, [type, search]);
