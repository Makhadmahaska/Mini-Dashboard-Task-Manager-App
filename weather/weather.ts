
//the weather app here 

// Grab HTML elements with proper type assertions
const date = document.querySelector<HTMLDivElement>('#date');
const city = document.querySelector<HTMLDivElement>('#city');
const temp = document.querySelector<HTMLDivElement>('#temp');
const tempImg = document.querySelector<HTMLDivElement>('#temp-img');
const description = document.querySelector<HTMLDivElement>('#description');
const tempMax = document.querySelector<HTMLDivElement>('#temp-max');
const tempMin = document.querySelector<HTMLDivElement>('#temp-min');

const apiKey: string = "6498cca2617d214c78df11180084ce69";

// Month names array
const monthNames: string[] = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

// Get current date
const dateObj = new Date();
const month: string = monthNames[dateObj.getUTCMonth()];
const day: number = dateObj.getUTCDate() - 1;
const year: number = dateObj.getUTCFullYear();

// Safely update date in DOM
if (date) {
    date.innerHTML = `${month} ${day}, ${year}`;
}

// App container (if needed)
const app = document.querySelector<HTMLDivElement>('.app');

// Interface for OpenWeather API response (simplified)
interface WeatherData {
    name: string;
    weather: { main: string; icon: string }[];
    main: {
        temp: number;
        temp_max: number;
        temp_min: number;
    };
}

// Function to fetch weather data
const getWeather = async () => {
    try {
        const input = document.getElementById('search-bar-input') as HTMLInputElement | null;
        const cityName: string = input?.value || '';
        
        if (!cityName) {
            alert("Please enter a city name.");
            return;
        }

        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`,
            { headers: { Accept: "application/json" } }
        );

        if (!response.ok) {
            throw new Error(`Error fetching weather: ${response.statusText}`);
        }

        const weatherData: WeatherData = await response.json();

        // Update DOM safely
        if (city) city.innerHTML = weatherData.name;
        if (description) description.innerHTML = weatherData.weather[0].main;
        if (tempImg) tempImg.innerHTML = `<img src="http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png"/>`;
        if (temp) temp.innerHTML = `<h2>${Math.round(weatherData.main.temp)}°C</h2>`;
        if (tempMax) tempMax.innerHTML = `${weatherData.main.temp_max}°C`;
        if (tempMin) tempMin.innerHTML = `${weatherData.main.temp_min}°C`;

        console.log(weatherData);

    } catch (error) {
        console.error(error);
    }
};
