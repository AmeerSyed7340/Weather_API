import './style.css';
import getFetch from './fetch';



const weatherApiKey = 'da1ebd2eac854464a2443220230208';
const default_weatherUrl = `http://api.weatherapi.com/v1/current.json?key=${weatherApiKey}&q=New York`

const giphyApiKey = 'fxGxrDaQt4YRxPcnwVmUfx5gGILgddK7';


const img = document.querySelector('img');


function handleWeatherResponse(newResponse) {
    latitude = newResponse.location.lat;
    console.log(latitude);
}

function handleGiphyResponse(newResponse) {
    img.src = newResponse.data.images.original.url;
}

function updateDisplayInfo(condition, feelsLike_c, feelsLike_f, humidity, winds_mph, localTime){
    const displayDiv = document.querySelector('.display-info');
    displayDiv.innerHTML = `
        <div><h1>Condition: ${condition} </h1></div>
        <div><p>Feels like (C): ${feelsLike_c} </p></div>
        <div><p>Feels like (F): ${feelsLike_f}</p></div>
        <div><p>Humidity: ${humidity}</p></div>
        <div><p>Winds (mph): ${winds_mph}</p></div>
        <div><p>Local Time: ${localTime}</p></div>
    `
}

async function callFetchAsync(weatherUrl) {
    const weatherData = await getFetch(weatherUrl);
    console.log(weatherData);
    const condition = weatherData.current.condition.text;
    const feelsLike_c = weatherData.current.feelslike_c;
    const feelsLike_f = weatherData.current.feelslike_f;
    const humidity = weatherData.current.humidity;
    const winds_mph = weatherData.current.wind_mph;
    const localTime = weatherData.location.localtime;

    const location = weatherData.location.name;
    const displayLocation = document.querySelector('.footer');
    displayLocation.innerHTML = `<p>${location}</p>`

    console.log(`${condition}, ${feelsLike_c}, ${feelsLike_f}, ${humidity}, ${winds_mph}, ${localTime}`);
    updateDisplayInfo(condition, feelsLike_c, feelsLike_f,humidity, winds_mph, localTime);
    
    const giphyUrl = `https://api.giphy.com/v1/gifs/translate?api_key=${giphyApiKey}&s=${condition}`;
    const gifData = await getFetch(giphyUrl);
    handleGiphyResponse(gifData);
}
callFetchAsync(default_weatherUrl);

const btnGif = document.getElementById('search-form');
btnGif.addEventListener('submit', async (event) => {
    event.preventDefault();
    let location = document.getElementById('GIF-search').value;
    
    
    const weatherUrl = `http://api.weatherapi.com/v1/current.json?key=${weatherApiKey}&q=${location}`

    callFetchAsync(weatherUrl);
    //clear out the inout field after every button press
    document.getElementById('GIF-search').value = "";
})
