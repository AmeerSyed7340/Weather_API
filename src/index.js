import './style.css';
import getFetch from './fetch';

const loc = 'London';
//let loc = prompt("Enter Location");

const weatherApiKey = 'da1ebd2eac854464a2443220230208';
const weatherUrl = `http://api.weatherapi.com/v1/current.json?key=${weatherApiKey}&q=${loc}`

const giphyApiKey = 'fxGxrDaQt4YRxPcnwVmUfx5gGILgddK7';

const img = document.querySelector('img');


function handleWeatherResponse(newResponse) {
    latitude = newResponse.location.lat;
    console.log(latitude);
}

function handleGiphyResponse(newResponse) {
    img.src = newResponse.data.images.original.url;
}




const btnGif = document.getElementById('search-form');
btnGif.addEventListener('submit', (event) => {
    event.preventDefault();
    let gif = document.getElementById('GIF-search').value;
    
    const giphyUrl = `https://api.giphy.com/v1/gifs/translate?api_key=${giphyApiKey}&s=${gif}`;

    //now use the giphyUrl to make a fetch request to the giphy api
    getFetch(giphyUrl)
        .then(response => response.json())
        .then(handleGiphyResponse)
        .catch(error => console.log(error))

    //clear out the inout field after every button press
    document.getElementById('GIF-search').value = "";
})
