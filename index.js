// Comments are added to follow my own stream of thought and to explain each step,please ignore if not necessary.
document.addEventListener("DOMContentLoaded", () => {
    // Selecting necessary elements from the DOM
    const filmsListElement = document.getElementById("films");
    const currentFilmElement = document.getElementById("current-film");
    const buyTicketButton = document.getElementById("buy-ticket");
    const ticketCountElement = document.getElementById("ticket-count");
  
    // Function to fetch film data from the server
    async function fetchFilmData(id) {
      try {
        const response = await fetch(`http://localhost:3000/films/${id}`);
        return await response.json();
      } catch (error) {
        console.error("Error fetching film data:", error);
      }
    }
  
    // Function to render film details on the page
    async function renderFilmDetails(id) {
      const film = await fetchFilmData(id);
      // Updating HTML content with fetched film data
      currentFilmElement.innerHTML = `
        <img src="${film.poster}" alt="${film.title}" class="film-poster">
        <div class="film-details">
          <h2 class="film-title">${film.title}</h2>
          <p>Runtime: ${film.runtime} minutes</p>
          <p>Showtime: ${film.showtime}</p>
          <p>Available Tickets: ${film.capacity - film.tickets_sold}</p>
        </div>
      `;
      // Updating ticket count displayed on the page
      ticketCountElement.textContent = film.capacity - film.tickets_sold;
      // Disabling buy ticket button if tickets are sold out
      buyTicketButton.disabled = film.capacity - film.tickets_sold === 0;
      // Setting custom data attributes for current film element
      currentFilmElement.dataset.id = film.id;
      currentFilmElement.dataset.tickets_sold = film.tickets_sold;
      // Adding 'sold-out' class and changing button text if tickets are sold out
      if (film.capacity - film.tickets_sold === 0) {
        buyTicketButton.textContent = "Sold Out";
        currentFilmElement.classList.add("sold-out");
      } else {
        buyTicketButton.textContent = "Buy Ticket";
        currentFilmElement.classList.remove("sold-out");
      }
    }
  
    // Function to handle purchasing tickets
    function buyTicket() {
      const currentFilm = currentFilmElement.dataset.id;
      const ticketsSold = Number(currentFilmElement.dataset.tickets_sold) + 1;
  
      // Check if tickets are sold out
      if (ticketsSold > currentFilmElement.dataset.capacity) {
        alert("Sorry, this showing is sold out!");
        return;
      }
  
      // Update ticket count and button text based on purchased ticket
      currentFilmElement.dataset.tickets_sold = ticketsSold;
      if (ticketsSold === currentFilmElement.dataset.capacity) {
        buyTicketButton.textContent = "Sold Out";
        currentFilmElement.classList.add("sold-out");
        buyTicketButton.disabled = true;
      } else {
        buyTicketButton.textContent = "Buy Ticket";
        currentFilmElement.classList.remove("sold-out");
        buyTicketButton.disabled = false;
      }
  
      // Sending PATCH request to update tickets_sold on the server
      fetch(`http://localhost:3000/films/${currentFilm}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tickets_sold: ticketsSold,
        }),
      })
        .then((response) => response.json())
        .catch((error) => {
          console.error("Error buying ticket:", error);
        });
    }
  
    // Function to handle changing displayed movie when clicking on film list
    function changeDisplayedMovie(event) {
      if (event.target.matches("li.film.item")) {
        const filmId = event.target.dataset.id;
        renderFilmDetails(filmId);
      }
    }
  
    // Function to add event listeners for interacting with the film list
    function addEventListeners() {
      filmsListElement.addEventListener("click", changeDisplayedMovie);
      buyTicketButton.addEventListener("click", buyTicket);
    }
  
    // Initialize the app by rendering details of the first movie
    async function init() {
      await renderFilmDetails(1); // With the assumption that the first movie has an ID of 1
      addEventListeners();
    }
  
    // Start the app
    init();
  });
  