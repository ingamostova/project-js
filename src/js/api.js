import axios from 'axios';
import {
  fetchGenres,
  fetchTrendingMovies,
  getDetailsForMovie,
} from './fetchesFromApi';

const gallery = document.querySelector('.gallery-list');
let allGenres = [];

fetchGenres()
  .then(resp => {
    allGenres = resp;
    console.log(allGenres);
  })
  .catch(err => console.log(err));

fetchTrendingMovies()
  .then(resp => onSuccess(resp))
  .catch(resp => onError(resp));

// console.log(allGenres);

function convertGenresToString(genre_ids) {
  let genresName = [];
  for (let oneGenreId of genre_ids) {
    let requiredGenre = allGenres.find(genre => genre.id === oneGenreId);
    genresName.push(requiredGenre.name);
    // console.log(allGenres);
  }
  if (genresName.length > 2) {
    genresName = genresName.slice(0, 2);
    genresName.push('Other');
  } else if (genresName.length < 1) {
    genresName.push('Other');
  }
  return genresName.join(', ');
}

//створює макет карточки одного фільму
//
function createMarkup({
  genre_ids,
  poster_path,
  id,
  title,
  vote_average,
  release_date,
}) {
  let genres = convertGenresToString(genre_ids);
  return `<li class="gallery-list__item">
<div class="gallery-thumb">
 <picture>
   <source
     srcset="https://image.tmdb.org/t/p/w500${poster_path}"
     media="(min-width: 1280px)"
   />
   <source srcset="https://image.tmdb.org/t/p/w500${poster_path}" media="(min-width: 768px)" />
   <source srcset="https://image.tmdb.org/t/p/w300${poster_path}" media="(max-width: 767px)" />
   <img class="gallery-img" src="https://image.tmdb.org/t/p/w154${poster_path}" alt="" />
 </picture>
     </div>
     <div class="movie-info">
 <h2 class="movie-info__name">${title}</h2>
 <p class="movie-info__about">
   ${genres} | ${release_date.slice(
    0,
    4
  )} <span class="movie-info__rate">${vote_average.toFixed(1)}</span>
        </p>
      </div>
    </li>`;
}

function onSuccess(resp) {
  //рендер популярних фільмів
  //
  //   const arr = resp;
  let markup = resp.map(el => createMarkup(el)).join('');
  gallery.innerHTML = markup;
}

function onError(resp) {
  const markup = '<p>Oops, something went wrong... Try again later</p>';
  gallery.innerHTML = markup;
}

// getDetailsForMovie('76600').then(data => {
//   console.log(data);
//   createMarkupForMovieDetails(data);
// });

// function createMarkupForMovieDetails(movie) {
//   const markupForMovie = `<div>
//   <button type="button">Закрити</button>
//   <img src="https://themoviedb.org/3${movie.poster_path}" alt="" />
//   <h1>${movie.title}</h1>
//   <p>Vote / Votes ${movie.vote_average} / ${movie.vote_count}</p>
//   <p>Popularity ${movie.popularity}</p>
//   <p>Original Title ${movie.original_title}</p>
//   <p>Genre ${movie.genres.map(genre => genre.name)}</p>
//   <p>About ${movie.overview}</p>
//   <button type="button">add to Watched</button>
//   <button type="button">add to queue</button>
// </div>`;

//   gallery.insertAdjacentHTML('beforeend', markupForMovie);
// }
