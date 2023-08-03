import './style.css';
import GetFetch from './fetch'

const loc = 'London';
//let loc = prompt("Enter Location");

const weatherApiKey = 'da1ebd2eac854464a2443220230208';
const weatherUrl = `http://api.weatherapi.com/v1/current.json?key=${weatherApiKey}&q=${loc}`

const giphyApiKey = 'fxGxrDaQt4YRxPcnwVmUfx5gGILgddK7';
const giphyUrl = `https://api.giphy.com/v1/gifs/translate?api_key=${giphyApiKey}&s=cats`
const img = document.querySelector('img');

console.log(loc);
GetFetch(giphyUrl)
    .then(response => response.json())
    .then(handleGiphyResponse);

//handlers
function handleWeatherResponse(newResponse) {
    latitude = newResponse.location.lat;
    console.log(latitude);
}

function handleGiphyResponse(newResponse){
    img.src = newResponse.data.images.original.url;
}   