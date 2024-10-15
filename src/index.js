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

function allMovies() {
    fetch('http://localhost:3000/films')
    .then(response => response.json())
    .then(movies => {
        const filmList = document.getElementById('films');
        filmList.innerHTML = '';

        movies.forEach(movie => {
            const movieItem = document.createElement('li');
            movieItem.classList.add('film', 'item');
            movieItem.innerText = movie.title;

            movieItem.addEventListener('click', () => movieDetailsDisplay(movie));

            filmList.appendChild(movieItem)
        });

    }
    )
    .catch(error => console.error('Error fetching movies', error));
}

function buyTicket(movie) {
    const availableTickets = movie.capacity - movie.tickets_sold;

    if (availableTickets > 0) {

        movie.tickets_sold += 1;
        document.getElementById('ticket-num').innerText = movie.capacity - movie.tickets_sold

        if (movie.capacity = movie.tickets_sold === 0) {
            const ticketBuyingButton = document.getElementById('buy-ticket');
            ticketBuyingButton.innerText = 'sold out';
            ticketBuyingButton.disabled = true
        }

        fetch(`http://localhost:3000/films/${movie.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ tickets_sold: movie.tickets_sold}),

        })
        .then(response => response.json())
        .then(updatedMovie => console.log('Ticket purchase successful:', updatedMovie))
        .catch(error => console.log('Error updating movie ticket:', error));
    }
}

function init() {
    firstMovie();
    allMovies();
}

window.onload = init;