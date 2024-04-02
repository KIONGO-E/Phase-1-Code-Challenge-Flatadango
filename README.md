# Phase-1-Code-Challenge-Flatadango
# Flatdango Movie Ticket Booking App

The Flatdango Movie Ticket Booking App is a web application that allows users to view movie details and purchase tickets for available showtimes. This application is built using HTML, CSS, and JavaScript, and it communicates with a server to fetch and update movie data.

## Features

- View a list of available movies
- Click on a movie to view its details, including runtime, showtime, and available tickets
- Purchase tickets for a selected movie
- Display the number of available tickets and disable the buy button when tickets are sold out

# An explanation of the contents of the JavaScript file
# Fetching Film Data:
 The fetchFilmData function asynchronously fetches movie data from the server using the fetch API.

# Rendering Film Details: 
The renderFilmDetails function renders movie details on the webpage by updating the HTML content with the fetched film data. It also updates the ticket count and disables the buy button if tickets are sold out.

# Buying Tickets:
 The buyTicket function handles the process of purchasing tickets. It updates the ticket count and button status on the webpage and sends a PATCH request to the server to update the ticket count.

# Event Handling: 
Event listeners are added to the film list and buy button to handle user interactions. The changeDisplayedMovie function is triggered when a movie is clicked, and it calls the renderFilmDetails function to update the displayed movie details.

# Initialization:
 The init function initializes the application by rendering details of the first movie and adding event listeners.


