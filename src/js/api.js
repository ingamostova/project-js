const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = '917b4db2abe704f469567a6fce387097';

const gallery = document.querySelector('.gallery');

let arrGenresMovies = [];

function fetchMovies(params) {
  return fetch(`${BASE_URL}${params}?api_key=${API_KEY}`)
    .then(resp => {
      if (!resp.ok) {
        throw new Error();
      }
      return resp.json();
    })
    .catch(err => console.log(err.status_message));
}

function fetchGenres() {
  return fetch(`${BASE_URL}genre/movie/list?api_key=${API_KEY}&language=en-US`)
    .then(resp => {
      if (!resp.ok) {
        throw new Error();
      }
      return resp.json();
    })
    .catch(err => console.log(err.status_message));
}

fetchGenres().then(data =>
  data.genres.map(genre => arrGenresMovies.push(genre))
);
// console.log(arrGenresMovies);

const trendingParams = 'trending/movie/week';

fetchMovies(trendingParams).then(data => {
  console.log(data.results);
  createMarkup(data.results);
});

function createMarkup(arr) {
  //   for (const genre of arrGenresMovies) {
  //     if (genre.id === ) {
  //     }
  //   }
  //   const markup = arr
  //     .map(
  //       item => `<li>
  //       <img src="${item.poster_path}" alt="" />
  //       <h2>${item.title}</h2>
  //       <p>${item.genre_ids} ${item.release_date}</p>
  //     </li>`
  //     )
  //     .join('');
  //   gallery.insertAdjacentHTML('beforeend', markup);
}

function getDetailsForMovie(id) {
  return fetch(`
${BASE_URL}movie/${id}?api_key=${API_KEY}&language=en-US`)
    .then(resp => {
      if (!resp.ok) {
        throw new Error();
      }
      return resp.json();
    })
    .catch(err => console.log(err.status_message));
}

getDetailsForMovie('76600').then(data => {
  console.log(data);
  //   createMarkupForMovieDetails(data);
});

function createMarkupForMovieDetails(movie) {
  const markupForMovie = `<div>
  <button type="button">Закрити</button>
  <img src="https://themoviedb.org/3${movie.poster_path}" alt="" />
  <h1>${movie.title}</h1>
  <p>Vote / Votes ${movie.vote_average} / ${movie.vote_count}</p>
  <p>Popularity ${movie.popularity}</p>
  <p>Original Title ${movie.original_title}</p>
  <p>Genre ${movie.genres.map(genre => genre.name)}</p>
  <p>About ${movie.overview}</p>
  <button type="button">add to Watched</button>
  <button type="button">add to queue</button>
</div>`;

  gallery.insertAdjacentHTML('beforeend', markupForMovie);
}
