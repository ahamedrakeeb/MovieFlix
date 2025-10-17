// Target the current page to route and execute functions
const global = {
  currentPage: window.location.pathname,
};

// Display 20 popular movies
async function displayPopularMovies() {
  const { results } = await fetchAPIMovieData('movie/popular');
  // const movieData = results.results;

  results.forEach((movie) => {
    const movieEl = document.createElement('div');
    movieEl.classList.add('card');

    movieEl.innerHTML = `
          <a href="movie-details.html?id=${movie.id}">
            ${
              movie.poster_path
                ? `<img
              src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
              class="card-img-top"
              alt="${movie.title}"
            />`
                : `<img
              src="images/no-image.jpg"
              class="card-img-top"
              alt="${movie.title}"
            />`
            }
          </a>
          <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-text">
              <small class="text-muted">Release: ${movie.release_date}</small>
            </p>
          </div>`;

    document.querySelector('#popular-movies').appendChild(movieEl);
  });
}

// Display 20 popular Tv Shows
async function displayPopularTVshows() {
  // const response = await fetchAPIMovieData('tv/popular');
  // const showList = response.results;
  // console.log(showList);

  const { results } = await fetchAPIMovieData('tv/popular');
  results.forEach((show) => {
    const showEl = document.createElement('div');
    showEl.classList.add('card');

    showEl.innerHTML = `
          <a href="tv-details.html?id=${show.id}">
            ${
              show.poster_path
                ? `<img
              src="https://image.tmdb.org/t/p/w500${show.poster_path}"
              class="card-img-top"
              alt="${show.title}"
            />`
                : `<img
              src="images/no-image.jpg"
              class="card-img-top"
              alt="${show.title}"
            />`
            }
          </a>
          <div class="card-body">
            <h5 class="card-title">${show.name}</h5>
            <p class="card-text">
              <small class="text-muted">Aired: ${show.first_air_date}</small>
            </p>
          </div>
    `;

    document.querySelector('#popular-shows').appendChild(showEl);
  });
}

// Display movie details
async function displayMovieDetails() {
  const movieID = window.location.search.split('=')[1];
  const movie = await fetchAPIMovieData(`movie/${movieID}`);
  console.log(movie);
  console.log(`${movie.title} - Budget: $${movie.budget}`);

  const div = document.createElement('div');
  div.innerHTML = `
        <div class="details-top">
          <div>
            ${
              movie.poster_path
                ? `<img
              src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
              class="card-img-top"
              alt="${movie.title}"
            />`
                : `<img
              src="images/no-image.jpg"
              class="card-img-top"
              alt="${movie.title}"
            />`
            }
          </div>
          <div>
            <h2>${movie.title}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${movie.vote_average.toFixed(1)} / 10
            </p>
            <p class="text-muted">Release Date: ${movie.release_date}</p>
            <p>
              ${movie.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
              ${movie.genres.map((genre) => `<li>${genre.name}</li>`).join('')}
            </ul>
            <a href="${'index.html'}" target="_blank" class="btn">Visit Movie Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Movie Info</h2>
          <ul>
            <li><span class="text-secondary">Budget:</span>  $${addCommasToNumber(
              movie.budget
            )}</li>
            <li><span class="text-secondary">Runtime:</span> ${
              movie.runtime
            } minutes</li>
            <li><span class="text-secondary">Status:</span> ${movie.status}</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">${movie.production_companies
            .map((company) => `<span>${company.name}</span>`)
            .join(', ')}</div>
        </div>`;

  document.querySelector('#movie-details').appendChild(div);
}

// Display TV show details
async function displayTvshowDetails() {
  const tvshowID = window.location.search.split('=')[1];
  const show = await fetchAPIMovieData(`tv/${tvshowID}`);

  const div = document.createElement('div');
  div.innerHTML = `
        <div class="details-top">
          <div>
            ${
              show.poster_path
                ? `<img
              src="https://image.tmdb.org/t/p/w500${show.poster_path}"
              class="card-img-top"
              alt="${show.name}"
            />`
                : `<img
              src="images/no-image.jpg"
              class="card-img-top"
              alt="${show.name}"
            />`
            }
          </div>
          <div>
            <h2>${show.name}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${show.vote_average.toFixed(1)} / 10
            </p>
            <p class="text-muted">Release Date: ${show.first_air_date}</p>
            <p>
              ${show.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
              ${show.genres.map((genre) => `<li>${genre.name}</li>`).join('')}
            </ul>
            <a href="#" target="_blank" class="btn">Visit Show Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Show Info</h2>
          <ul>
            <li><span class="text-secondary">Number Of Episodes:</span> ${
              show.number_of_episodes
            }</li>
            <li>
              <span class="text-secondary">Last Episode To Air:</span> ${
                show.last_episode_to_air.name
              }
            </li>
            <li><span class="text-secondary">Status:</span> ${show.status}</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">${show.production_companies
            .map((company) => `<span>${company.name}</span>`)
            .join(', ')}</div>
        </div>`;
  document.querySelector('#show-details').appendChild(div);
}
// Fetch the data from the API
async function fetchAPIMovieData(endpoint) {
  // Temporarily stored here but in future should be in a .env file or should be requested from a backend server
  const API_KEY = 
  const API_URL = 

  showSpinner();

  const response = await fetch(
    `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`
  );
  hideSpinner();
  const data = await response.json();
  return data;
}

// Add commas to number
function addCommasToNumber(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
// Show show spinner while loading the data and hide when not needed
function showSpinner() {
  document.querySelector('.spinner').classList.add('show');
}
function hideSpinner() {
  document.querySelector('.spinner').classList.remove('show');
}

//Differentiate when Movie || Tv show page is selected by highlihting the nav link color to yellow
function highlightLink() {
  let links = document.querySelectorAll('.nav-link');
  links.forEach((link) => {
    if (link.getAttribute('href') === global.currentPage) {
      link.classList.add('active');
      console.log('targeted link');
    }
  });
}

// Initialize the app using switch case
function init() {
  switch (global.currentPage) {
    case '/':
    case '/index.html':
      // Code to execute for the home page
      displayPopularMovies();
      console.log('Home Page');
      break;
    case '/search.html':
      // Code to execute for the search page
      console.log('Search Page');
      break;
    case '/shows.html':
      // Code to execute for the show page
      displayPopularTVshows();
      console.log('Show Page');
      break;
    case '/movie-details.html':
      // Code to execute for the movie details page
      console.log('Movie Details Page');
      displayMovieDetails();
      break;
    case '/tv-details.html':
      // Code to execute for the TV details page
      console.log('TV Details Page');
      displayTvshowDetails();
      break;

    default:
      // Code to execute for all other pages
      break;
  }
  highlightLink();
}

// Initialize when the DOM is ready
document.addEventListener('DOMContentLoaded', init);
