const key = '';

const getCity = async (city) => {
    const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    let query = `?apikey=${key}&q=${city}`;

    const response = await fetch(base + query);
    const data = await response.json();
    
    return data[0];
}

const getWeather = async (cityId) => {

    const base = "http://dataservice.accuweather.com/currentconditions/v1/";
    let query = `${cityId}?apikey=${key}`;

    const response = await fetch(base + query);
    const data = await response.json();

    return data[0];
}