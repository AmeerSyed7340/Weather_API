async function getFetch(url){
    // return fetch(url).then(response => response.json())
    const response = await fetch (url)
    if(!response.ok){
        throw new Error (`HTTP error! Status: ${response.status}`);
    }
    return response.json();
}

export default getFetch