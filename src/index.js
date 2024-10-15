// Your code here

function firstMovie() {
    fetch('http://localhost:3000/films/1')
    .then(response => response.json())
    .then(movie => movieDetailsDisplay(movie))
    .catch(error => console.error('Error fetching the first movie:', error));

}

function movieDetailsDisplay(movie) {
    document.getElementById('title').innerText = movie.title;
    document.getElementById('runtime').innerText = `${movie.runtime} minutes`;
    document.getElementById('film-info').innerText = movie.description;
    document.getElementById('showtime').innerText = movie.showtime;
    document.getElementById('ticket-num').innerText = movie.capacity - movie.tickets_sold;
    document.getElementById('poster').src = movie.poster

    const ticketBuyingButton = document.getElementById('buy-ticket');
    ticketBuyingButton.innerText = (movie.capacity - movie.tickets_sold > 0) ? "Buy Ticket" : "Sold Out";
    ticketBuyingButton.disabled = (movie.capacity - movie.tickets_sold === 0);

    ticketBuyingButton.onclick = function() {
        buyTicket(movie);
    };

}