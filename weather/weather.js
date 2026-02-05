//the weather app here 
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
// Grab HTML elements with proper type assertions
var date = document.querySelector('#date');
var city = document.querySelector('#city');
var temp = document.querySelector('#temp');
var tempImg = document.querySelector('#temp-img');
var description = document.querySelector('#description');
var tempMax = document.querySelector('#temp-max');
var tempMin = document.querySelector('#temp-min');
var apiKey = "6498cca2617d214c78df11180084ce69";
// Month names array
var monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];
// Get current date
var dateObj = new Date();
var month = monthNames[dateObj.getUTCMonth()];
var day = dateObj.getUTCDate() - 1;
var year = dateObj.getUTCFullYear();
// Safely update date in DOM
if (date) {
    date.innerHTML = "".concat(month, " ").concat(day, ", ").concat(year);
}
// App container (if needed)
var app = document.querySelector('.app');
// Function to fetch weather data
var getWeather = function () { return __awaiter(_this, void 0, void 0, function () {
    var input, cityName, response, weatherData, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                input = document.getElementById('search-bar-input');
                cityName = (input === null || input === void 0 ? void 0 : input.value) || '';
                if (!cityName) {
                    alert("Please enter a city name.");
                    return [2 /*return*/];
                }
                return [4 /*yield*/, fetch("https://api.openweathermap.org/data/2.5/weather?q=".concat(cityName, "&appid=").concat(apiKey, "&units=metric"), { headers: { Accept: "application/json" } })];
            case 1:
                response = _a.sent();
                if (!response.ok) {
                    throw new Error("Error fetching weather: ".concat(response.statusText));
                }
                return [4 /*yield*/, response.json()];
            case 2:
                weatherData = _a.sent();
                // Update DOM safely
                if (city)
                    city.innerHTML = weatherData.name;
                if (description)
                    description.innerHTML = weatherData.weather[0].main;
                if (tempImg)
                    tempImg.innerHTML = "<img src=\"http://openweathermap.org/img/wn/".concat(weatherData.weather[0].icon, "@2x.png\"/>");
                if (temp)
                    temp.innerHTML = "<h2>".concat(Math.round(weatherData.main.temp), "\u00B0C</h2>");
                if (tempMax)
                    tempMax.innerHTML = "".concat(weatherData.main.temp_max, "\u00B0C");
                if (tempMin)
                    tempMin.innerHTML = "".concat(weatherData.main.temp_min, "\u00B0C");
                console.log(weatherData);
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                console.error(error_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
