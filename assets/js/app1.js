let pageNumber = 1;
const pageSize = 10;
let totalPages;



document.getElementById("previousBtn").addEventListener("click", async function () { 
    if (pageNumber > 1) {
      pageNumber--;
      displayMovies(pageNumber);
    }
  });

document.getElementById("nextBtn").addEventListener("click", async function () {
  if (pageNumber < totalPages) {
    pageNumber++;
    displayMovies(pageNumber);
  }
});

document.getElementById("submitBtn").addEventListener("click", async function () {
pageNumber = 1;
displayMovies(pageNumber);
});

async function displayMovies(pageNumber) {
const inputTitle = document.getElementById("movieTitle");
const inputYear = document.getElementById("movieYear");
const movieTitle = inputTitle.value;
const movieYear = inputYear.value;
const movieType = document.getElementById("movieType").value;
const res = await fetch(
    `http://www.omdbapi.com/?s=${movieTitle}&y=${movieYear}&type=${movieType}&page=${pageNumber}&pageSize=${pageSize}&apikey=3147fdf`
  );// pageSize=10 
  const movieData = await res.json();
  console.log(movieData);
  const movieResults = document.getElementById("movieResults");
  movieResults.innerHTML = "";
  document.getElementById("pagination").style.display = "block";
  document.getElementById("currentPage").innerHTML = pageNumber;
  const totalResults = movieData.totalResults;
  totalPages = Math.ceil(totalResults / pageSize);
  let pageNumbersHtml = "";
  for (let i = 1; i <= totalPages; i++) {
    // ajout du style au bouton du pageNumber
    pageNumbersHtml += `<button class="page-number  text-white py-2 px-2 rounded mb-2 md:mb-0" data-id="${i}">${i}</button>`;
  }
  document.getElementById("pageNumbers").innerHTML = pageNumbersHtml;

  document.querySelectorAll(".page-number").forEach((element) => {
    element.addEventListener("click", (event) => {
      const newPageNumber = event.target.getAttribute("data-id");
      displayMovies(newPageNumber);
    });
  });

  movieData.Search.forEach((movie) => {
    const movieInfo = document.createElement("div");
    movieInfo.classList.add("p-2");
    movieInfo.setAttribute("data-id", movie.imdbID);
    movieInfo.innerHTML =
      movie.Poster !== "N/A"
        ? `<img src='${movie.Poster}'>`
        : "<img src='default-poster.png'>";
       if (movie.Poster !== "N/A") {
         movieInfo.innerHTML = `<img src='${movie.Poster}'>`;
       } else {
         movieInfo.innerHTML = `<img src='https://via.placeholder.com/200x300'>`;
       } 
    movieInfo.innerHTML += `<h2>${movie.Title}</h2>`;
    movieInfo.innerHTML += `<p>Released: ${movie.Year}</p>`;
    movieInfo.innerHTML += `<p>Type: ${movie.Type}</p>`;
    movieInfo.innerHtml += `<p>Actors: ${movie.Actors}</p>`;
    movieInfo.innerHtml += `<p>Director: ${movie.Director}</p>`;
    console.log(movieInfo);
    movieResults.appendChild(movieInfo);
  });
}


fetch("http://www.omdbapi.com/?s=superhero&apikey=3147fdf")
  .then((response) => {
    
    return response.json();
  })
  
  .then((data) => {
    
    let slider = document.getElementById("slider");
    let movies = data.Search;
    let slides = "";
    for (let i = 0; i < 50; i++) {
      let movie = movies[i];
      if (movie && movie.Poster && movie.Poster !== "N/A") {
        slides += `<img class="w-32 h-32 object-cover object-center" src="${movie.Poster}" />`;
      }
    }
    slider.innerHTML = slides + slides;
  });





        const toggleModeButton = document.getElementById("toggle-mode-button");
        const body = document.querySelector("body");

        toggleModeButton.addEventListener("click", function () {
          const icon = toggleModeButton.querySelector("i");
          if (body.classList.contains("theme-dark")) {
           
            body.classList.remove("theme-dark");
            body.classList.add("theme-light");
            icon.classList.remove("fa-moon");
            icon.classList.add("fa-sun");
          } else {
            body.classList.remove("theme-light");
            body.classList.add("theme-dark");
            icon.classList.remove("fa-sun");
            icon.classList.add("fa-moon");
          }
        });

fetch("http://www.omdbapi.com/?i=tt0848228&apikey=3147fdf")
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error(error));


// let slider = document.getElementById("slider");
// let slides = slider.children;
// let currentSlide = 0;

// function nextSlide() {
//   goToSlide(currentSlide + 1);
// }

// function goToSlide(n) {
//   slides[currentSlide].style.display = "none";
//   currentSlide = (n + slides.length) % slides.length;
//   slides[currentSlide].style.display = "block";
// }

// let timer = setInterval(nextSlide, 2000);