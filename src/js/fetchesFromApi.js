import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = '917b4db2abe704f469567a6fce387097';

export async function fetchGenres() {
  try {
    const resp = await axios.get(
      `${BASE_URL}genre/movie/list?api_key=${API_KEY}&language=en-US`
    );
    // console.log(resp.data.genres);
    return resp.data.genres;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchTrendingMovies() {
  try {
    const response = await axios.get(
      `${BASE_URL}trending/movie/week?api_key=${API_KEY}`
    );
    // console.log(response.data.results);
    return response.data.results;
  } catch (error) {
    console.error(error);
  }
}

export function getDetailsForMovie(id) {
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
