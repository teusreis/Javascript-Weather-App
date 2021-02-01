const form = document.querySelector("form");
const city = form.querySelector("input");
const details = document.querySelector(".details");
const card = document.querySelector(".card");
const time = card.querySelector("img.time");
const icon = document.querySelector(".icon img");

const updateCity = async (city) => {

    const cityDetails = await getCity(city);
    const weather = await getWeather(cityDetails.Key);

    return {
        cityDetails,
        weather
    };
}

const updateUi = (data) => {
    const cityDetails = data.cityDetails;
    const weather = data.weather;

    details.innerHTML = `
        <h5 class="my-3">${cityDetails.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
    `;

    let timeSrc = weather.IsDayTime ? "img/day.svg" : "img/night.svg";
    time.src = timeSrc;

    let iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.src = iconSrc;

    if (card.classList.contains("d-none")) {
        card.classList.remove("d-none");
    }

}

form.addEventListener("submit", event => {
    event.preventDefault();

    if (city.value.trim() === "") {
        alert("City is required!");
        return 0;
    }

    updateCity(city.value.trim())
        .then(data => updateUi(data))
        .catch(error => console.log(error));

    localStorage.setItem("city", city.value.trim());
});

if (localStorage.getItem('city')) {
    updateCity(localStorage.getItem('city'))
        .then(data => updateUi(data))
        .catch(error => console.log(error));
}