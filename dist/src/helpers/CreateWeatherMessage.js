"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWeatherResponce = void 0;
const _constants_1 = require("@constants");
function createWeatherResponce(data) {
    const filteredWeatherData = data.list.filter((item, i) => i === 0 || i === 8 || i === 16);
    const response = filteredWeatherData.map((item) => `
Weather in ${data.city.name} ${item.dt_txt.slice(0, -3)} :
    🌝 temperature: ${item.main.temp
        ? Math.round(item.main.temp - _constants_1.kelvinMoreThenCelsius) + '°C'
        : 'there is no information'},
    ⛅️ sky: ${item.weather[0].description
        ? item.weather[0].description
        : 'there is no information'},
    💨 wind: ${item.wind.speed
        ? Math.round(item.wind.speed * _constants_1.milesLessThenKm) + ' km/h'
        : 'there is no information'}`);
    return response.join('\n');
}
exports.createWeatherResponce = createWeatherResponce;
