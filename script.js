document.addEventListener("DOMContentLoaded", () => {
  const countriesContainer = document.getElementById("countries");
  const title = document.createElement("h1");
  title.id = "title";
  title.className = "text-center";
  title.textContent = "Countries and Weather";
  document.body.appendChild(title);

  const weatherApiKey = "c83332adc1861cb1d251ac86a3bbcf36";

  // countries
  fetch("https://restcountries.com/v3.1/all")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((country) => {
        // Destructure
        const { capital, region, latlng, name, flags, cca2, cca3, ccn3 } =
          country;
        const [lat, lon] = latlng;

        // card for each country
        const card = document.createElement("div");
        card.className = "col-sm-6 col-md-4 col-lg-4 col-xl-4 mb-4";

        const cardInner = document.createElement("div");
        cardInner.className = "card h-100";

        const cardHeader = document.createElement("div");
        cardHeader.className = "card-header text-center";
        cardHeader.textContent = name.common;

        const cardBody = document.createElement("div");
        cardBody.className = "card-body";

        const flagImage = document.createElement("img");
        flagImage.src = flags.png;
        flagImage.className = "card-img-top";
        flagImage.alt = `Flag of ${name.common}`;

        const countryDetails = document.createElement("div");
        countryDetails.className = "card-text";

        const capitalPara = document.createElement("p");
        capitalPara.textContent = `Capital: ${capital}`;

        const regionPara = document.createElement("p");
        regionPara.textContent = `Region: ${region}`;

        const latPara = document.createElement("p");
        latPara.textContent = `Latitude: ${lat}`;

        const lonPara = document.createElement("p");
        lonPara.textContent = `Longitude: ${lon}`;

        const countryCodesPara = document.createElement("p");
        countryCodesPara.textContent = `Country Codes: ${cca2}, ${cca3}, ${ccn3}`;

        const weatherButton = document.createElement("button");
        weatherButton.className = "btn btn-primary btn-block";
        weatherButton.textContent = "Click for Weather";
        weatherButton.onclick = () => getWeather(lat, lon, name.common);

        countryDetails.appendChild(capitalPara);
        countryDetails.appendChild(regionPara);
        countryDetails.appendChild(latPara);
        countryDetails.appendChild(lonPara);
        countryDetails.appendChild(countryCodesPara);
        countryDetails.appendChild(weatherButton);

        cardBody.appendChild(flagImage);
        cardBody.appendChild(countryDetails);

        cardInner.appendChild(cardHeader);
        cardInner.appendChild(cardBody);

        card.appendChild(cardInner);

        countriesContainer.appendChild(card);
      });
    })
    .catch((error) => console.error("Error fetching countries:", error));
});

//weather
function getWeather(lat, lon, countryName) {
  const weatherApiKey = "c83332adc1861cb1d251ac86a3bbcf36";
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherApiKey}`;

  fetch(weatherUrl)
    .then((response) => response.json())
    .then((data) => {
      alert(
        `Current weather in ${countryName}: ${data.weather[0].description}, Temperature: ${data.main.temp}K`
      );
    })
    .catch((error) => console.error("Error fetching weather:", error));
}
