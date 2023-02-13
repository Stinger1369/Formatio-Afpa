var films = [ //
    {    name: "Deadpool",      years: 2016,    authors : "Tim Miller" },
    {    name: "Spiderman",     years: 2002,    authors : "Sam Raimi" },
    {    name: "Scream",        years: 1996,    authors : "Wes Craven" },
    {    name: "It: chapter 1", years: 2019,    authors : "Andy Muschietti" }
];

// TODO

const displayFilms = (filmsToDisplay = films) => {

  //console.log(filmsToDisplay);

  // fonction qui affiche les films dans le tableau
  const filmList = document.getElementById("film-list"); // on récupère la table
  filmList.innerHTML = ""; // on vide la table
  // on parcourt le tableau de films
  filmsToDisplay.forEach((film, index) => {

    //console.log(index);
    //console.log(film);

    
    const tr = document.createElement("tr");// on crée une ligne
    tr.innerHTML = ` 
      <td class="px-4 py-2">${
        film.name.charAt(0).toUpperCase() + film.name.slice(1) // on met la première lettre en majuscule
      }</td>
      <td class="px-4 py-2">${film.years}</td> 
      <td class="px-4 py-2">${film.authors.toUpperCase()}</td> 
      <td class="px-4 py-2"> 
        <button class="bg-red-500 text-white px-4 py-2" onclick="removeFilm(${index})">Supprimer</button> 
      </td>
    `;
    filmList.appendChild(tr); // on ajoute la ligne au tableau
  });
};


// Supprimer un film
const removeFilm = (index) => { // on récupère l'index du film
  Swal.fire({ // on affiche une fenêtre de confirmation
    title: "Etes-vous sûr de Suprimer ce film?",
    text: "Vous ne pourrez pas revenir en arrière!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Oui, supprimez-le!",
    cancelButtonText: "Annuler",
  }).then((result) => {
    if (result.value) {
      films.splice(index, 1);
      displayFilms();
      Swal.fire("Supprimé!", "Votre film a été supprimé.", "success");
    }
  });
};

// Filtrer les films par nom
displayFilms(); // on affiche les films au chargement de la page
const filterSelect = document.getElementById("filter"); // on récupère le select
filterSelect.addEventListener("change", (e) => { // on écoute le changement de valeur
  const selectedOption = e.target.value; // on récupère la valeur sélectionnée
  if (selectedOption === "name") { // si on a sélectionné le filtre par nom
    sortFilmsByName(); // on appelle la fonction qui trie les films par nom
  } else if (selectedOption === "years") { // si on a sélectionné le filtre par année
    sortFilmsByYear(); // on appelle la fonction qui trie les films par année
  } else {
    displayFilms(); // on affiche tous les films
  }
});
const filterFilmsByName = () => { // fonction qui filtre les films par nom
  
  const nameFilter = document.getElementById("name-filter").value.toLowerCase(); // on récupère la valeur du filtre
  const filteredFilms = films.filter((film) => // on filtre le tableau de films
    film.name.toLowerCase().startsWith(nameFilter) // on vérifie si le nom du film commence par la valeur du filtre
  );
  displayFilms(filteredFilms); // on affiche les films filtrés
};

const filterButton = document.querySelector(".bg-red-500");// on récupère le bouton
filterButton.addEventListener("click", (e) => { // on écoute le clic sur le bouton
  const selectedOption = filterSelect.value; // on récupère la valeur du select
  if (selectedOption === "name") { // si on a sélectionné le filtre par nom
    filterFilmsByName();
  } else if (selectedOption === "years") {
    sortFilmsByYear();
  } else {
    displayFilms();
  }
});

const sortFilmsByName = () => {
  films.sort((a, b) => (a.name > b.name ? 1 : -1));
  displayFilms();
};

const sortFilmsByYear = () => {
  films.sort((a, b) => (a.years > b.years ? 1 : -1));
  displayFilms();
};


// 1. Afficher la liste des films dans la page HTML
// Ajouter un film avec les condition demander dans l'exercice
const addFilm = (e) => {
  
  e.preventDefault();
 
  
  const name = document.getElementById("name").value;
  const years = document.getElementById("years").value;
  const authors = document.getElementById("authors").value;

  
  if (name.length < 2) {
    Swal.fire({
      title: "Erreur dans le formulaire",
      text: "Le titre doit avoir au moins 2 caractères",
      icon: "error",
      timer: 5000,
    });
    return;
  }

  if (years.length !== 4 || years < 1900 || years > new Date().getFullYear()) {
    Swal.fire({
      title: "Erreur dans le formulaire",
      text: "L'année doit être un format de 4 chiffres entre 1900 et l'année en cours",
      icon: "error",
      timer: 5000,
    });
    return;
  }

  if (authors.length < 5) {
    Swal.fire({
      title: "Erreur dans le formulaire",
      text: "Le nom de l'auteur doit avoir au moins 5 caractères",
      icon: "error",
      timer: 5000, 
    });
    return;
  }

  films.push({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    years,
    authors: authors.charAt(0).toUpperCase() + authors.slice(1),
  });

  Swal.fire({
    title: "Film ajouté avec succès",
    icon: "success",
    timer: 3000,
  });

  displayFilms();
  
};

fetch("http://www.omdbapi.com/?s=superhero&apikey=3147fdf")
  .then((response) => {
    //console.log(response);
    return response.json();
  })
  .then((data) => {
    //console.log(data);
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




          const toggleModeButton =
            document.getElementById("toggle-mode-button");
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












