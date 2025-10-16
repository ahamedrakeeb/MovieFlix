const global = {
  currentPage: window.location.pathname,
};

//Differentiate when Movie || Tv show page is selected by highlihting the nav link
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
      console.log('Home Page');
      break;
    case '/search.html':
      // Code to execute for the search page
      console.log('Search Page');
      break;
    case '/shows.html':
      // Code to execute for the show page
      console.log('Show Page');
      break;
    case '/movie-details.html':
      // Code to execute for the movie details page
      console.log('Movie Details Page');
      break;
    case '/tv-details.html':
      // Code to execute for the TV details page
      console.log('TV Details Page');
      break;

    default:
      // Code to execute for all other pages
      break;
  }
  highlightLink();
}

// Initialize when the DOM is ready
document.addEventListener('DOMContentLoaded', init);
