// Target the current page to route and execute functions
const global = {
  currentPage: window.location.pathname,
  search: {
    term: '',
    type: '',
    page: 1,
    totalPages: 1,
    totalResults: 0,
  },
  api: {
    apiKey: 'YOUR_TMDB_API_KEY',
    apiUrl: 'https://api.themoviedb.org/3/',
  },
};

// Display 20 popular movies
async function displayPopularMovies() {
  const { results } = await fetchAPIData('movie/popular');
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
  // const response = await fetchAPIData('tv/popular');
  // const showList = response.results;
  // console.log(showList);

  const { results } = await fetchAPIData('tv/popular');
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
  const movie = await fetchAPIData(`movie/${movieID}`);

  // Overlay for background image
  displayBackgroundImage('movie', movie.backdrop_path);

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
  const show = await fetchAPIData(`tv/${tvshowID}`);

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
            <p class="text-muted">Aired: ${show.first_air_date}</p>
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

// Function to display background image
function displayBackgroundImage(type, backgroundPath) {
  const overlayDiv = document.createElement('div');
  overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${backgroundPath})`;
  overlayDiv.style.backgroundSize = 'cover';
  overlayDiv.style.backgroundPosition = 'center';
  overlayDiv.style.backgroundRepeat = 'no-repeat';
  overlayDiv.style.height = '100vh';
  overlayDiv.style.width = '100%';
  overlayDiv.style.position = 'absolute';
  overlayDiv.style.top = '0';
  overlayDiv.style.left = '0';
  overlayDiv.style.zIndex = '-1';
  overlayDiv.style.opacity = '0.2';

  if (type === 'movie') {
    document.querySelector('#movie-details').appendChild(overlayDiv);
  } else {
    document.querySelector('#show-details').appendChild(overlayDiv);
  }
}

// Add swiper slider for home page
async function showSwiperSlider() {
  const { results } = await fetchAPIData('movie/now_playing');

  results.forEach((movie) => {
    const div = document.createElement('div');
    div.classList.add('swiper-slide');

    div.innerHTML = `
            <a href="movie-details.html?id=${movie.id}">
              <img src="${
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : './images/no-image.jpg'
              }" alt="${movie.title}" />
            </a>
            <h4 class="swiper-rating">
              <i class="fas fa-star text-secondary"></i> ${movie.vote_average.toFixed(
                1
              )} / 10
            </h4>
          `;
    document.querySelector('.swiper-wrapper').appendChild(div);
    swiperInit();
  });
}

// swiper initializer for the nowplaying slider
function swiperInit() {
  const swiper = new Swiper('.swiper', {
    // Optional parameters
    slidersPerView: 5,
    spaceBetween: 15,
    freeMode: true,
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    breakpoints: {
      320: { slidesPerView: 2 },
      768: { slidesPerView: 3 },
      1024: { slidesPerView: 4 },
      1440: { slidesPerView: 5 },
    },
  });
}

// Search function for movies/tvhows
async function search() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  console.log(urlParams.get('type'));
  global.search.type = urlParams.get('type');
  global.search.term = urlParams.get('search-term');

  if (global.search.term !== '' && global.search.term !== null) {
    const { results, total_pages, page, total_results } = await searchAPIData();

    global.search.totalPages = total_pages;
    global.search.page = page;
    global.search.totalResults = total_results;

    console.log(results);
    if (results.length === 0) {
      showAlert('No results found');
      return;
    }

    displaySearchResults(results);

    document.querySelector('#search-term').innerHTML.value = ' ';
  } else {
    showAlert('Please enter a search term');
  }
}

// Display search results
function displaySearchResults(results) {
  // clear previous results
  document.querySelector('#search-results').innerHTML = '';
  document.querySelector('#pagination').innerHTML = '';
  document.querySelector('#search-results-heading').innerHTML = '';

  results.forEach((result) => {
    const movieEl = document.createElement('div');
    movieEl.classList.add('card');

    movieEl.innerHTML = `
          <a href="${global.search.type}-details.html?id=${result.id}">
            ${
              result.poster_path
                ? `<img
              src="https://image.tmdb.org/t/p/w500${result.poster_path}"
              class="card-img-top"
              alt="${
                global.search.type === 'movie' ? result.title : result.name
              }"
            />`
                : `<img
              src="images/no-image.jpg"
              class="card-img-top"
              alt="${
                global.search.type === 'movie' ? result.title : result.name
              }"
            />`
            }
          </a>
          <div class="card-body">
            <h5 class="card-title">${
              global.search.type === 'movie' ? result.title : result.name
            }</h5>
            <p class="card-text">
              <small class="text-muted">Release: ${
                global.search.type === 'movie'
                  ? result.release_date
                  : result.first_air_date
              }</small>
            </p>
          </div>`;
    document.querySelector(
      '#search-results-heading'
    ).innerHTML = `<h2>${results.length} of ${global.search.totalResults} Results for ${global.search.term}</h2>`;
    document.querySelector('#search-results').appendChild(movieEl);
  });
  displayPagination();
}

// Create and display pagination for search
function displayPagination() {
  const div = document.createElement('div');
  div.classList.add('pagination');
  div.innerHTML = `
          <button class="btn btn-primary" id="prev">Prev</button>
          <button class="btn btn-primary" id="next">Next</button>
          <div class="page-counter">Page ${global.search.page} of ${global.search.totalPages}</div>
        `;

  document.querySelector('#pagination').appendChild(div);

  //Disable prev button on 1st page
  if (global.search.page === 1) {
    document.querySelector('#prev').disabled = true;
  }
  //Disable next button on last page
  if (global.search.page === global.search.totalPages) {
    document.querySelector('#next').disabled = true;
  }

  //Next page
  document.querySelector('#next').addEventListener('click', async () => {
    global.search.page++;
    const { results } = await searchAPIData();
    displaySearchResults(results);
  });
  //Prev page
  document.querySelector('#prev').addEventListener('click', async () => {
    global.search.page--;
    const { results } = await searchAPIData();
    displaySearchResults(results);
  });
}
// Fetch the data for the Search API
async function searchAPIData() {
  // Temporarily stored here but in future should be in a .env file or should be requested from a backend server
  const API_KEY = global.api.apiKey;
  const API_URL = global.api.apiUrl;

  showSpinner();

  const response = await fetch(
    `${API_URL}search/${global.search.type}?api_key=${API_KEY}&language=en-US&query=${global.search.term}&page=${global.search.page}`
  );
  hideSpinner();
  const data = await response.json();
  return data;
}

// Fetch the data from the API
async function fetchAPIData(endpoint) {
  // Temporarily stored here but in future should be in a .env file or should be requested from a backend server
  const API_KEY = global.api.apiKey;
  const API_URL = global.api.apiUrl;

  showSpinner();

  const response = await fetch(
    `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`
  );
  hideSpinner();
  const data = await response.json();
  return data;
}

// Create a custom Alert
function showAlert(message, className = 'error') {
  const div = document.createElement('div');
  div.classList.add('alert', className);
  div.appendChild(document.createTextNode(message));
  document.querySelector('#alert').appendChild(div);

  setTimeout(() => div.remove(), 3000);
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
      showSwiperSlider();
      displayPopularMovies();
      console.log('Home Page');
      break;
    case '/search.html':
      // Code to execute for the search page
      console.log('Search Page');
      search();
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
