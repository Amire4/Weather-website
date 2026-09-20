// Weather Service Module
// Handles public weather API requests asynchronously using JavaScript fetch and async/await

import { CONFIG, getSavedApiKey, getSavedProvider } from './config.js';

// WMO Weather Code interpreter (used by Open-Meteo & standard meteorological data)
function interpretWmoCode(code) {
  if (code === 0) {
    return { condition: 'Clear Sky', iconKey: 'sunny', mood: 'sunny' };
  } else if (code === 1 || code === 2) {
    return { condition: 'Partly Cloudy', iconKey: 'partlyCloudy', mood: 'cloudy' };
  } else if (code === 3) {
    return { condition: 'Overcast', iconKey: 'cloudy', mood: 'cloudy' };
  } else if (code === 45 || code === 48) {
    return { condition: 'Fog & Mist', iconKey: 'mist', mood: 'cloudy' };
  } else if (code >= 51 && code <= 55) {
    return { condition: 'Drizzle', iconKey: 'rainy', mood: 'rainy' };
  } else if (code >= 61 && code <= 67) {
    return { condition: 'Rain', iconKey: 'rainy', mood: 'rainy' };
  } else if (code >= 71 && code <= 77) {
    return { condition: 'Snowfall', iconKey: 'snowy', mood: 'snowy' };
  } else if (code >= 80 && code <= 82) {
    return { condition: 'Rain Showers', iconKey: 'rainy', mood: 'rainy' };
  } else if (code >= 85 && code <= 86) {
    return { condition: 'Snow Showers', iconKey: 'snowy', mood: 'snowy' };
  } else if (code >= 95 && code <= 99) {
    return { condition: 'Thunderstorm', iconKey: 'thunderstorm', mood: 'rainy' };
  }
  return { condition: 'Partly Cloudy', iconKey: 'partlyCloudy', mood: 'cloudy' };
}

// OpenWeatherMap condition code interpreter
function interpretOwmCode(id, main) {
  if (id >= 200 && id < 300) {
    return { condition: 'Thunderstorm', iconKey: 'thunderstorm', mood: 'rainy' };
  } else if (id >= 300 && id < 600) {
    return { condition: 'Rain', iconKey: 'rainy', mood: 'rainy' };
  } else if (id >= 600 && id < 700) {
    return { condition: 'Snow', iconKey: 'snowy', mood: 'snowy' };
  } else if (id >= 700 && id < 800) {
    return { condition: 'Atmospheric Mist', iconKey: 'mist', mood: 'cloudy' };
  } else if (id === 800) {
    return { condition: 'Clear Sky', iconKey: 'sunny', mood: 'sunny' };
  } else if (id === 801 || id === 802) {
    return { condition: 'Partly Cloudy', iconKey: 'partlyCloudy', mood: 'cloudy' };
  } else {
    return { condition: 'Cloudy', iconKey: 'cloudy', mood: 'cloudy' };
  }
}

// Clean & resolve city search query
function normalizeQuery(input) {
  let q = input.trim().toLowerCase();
  
  // Check predefined alias
  if (CONFIG.ALIASES && CONFIG.ALIASES[q]) {
    return CONFIG.ALIASES[q];
  }

  // Handle queries with commas like "Lahore, Pakistan" or "Karachi, PK"
  if (q.includes(',')) {
    const parts = input.split(',').map(p => p.trim());
    return parts[0]; // e.g., "Lahore"
  }

  return input.trim();
}

// Fetch weather from Open-Meteo Public API
async function fetchFromOpenMeteo(rawCity) {
  const resolvedCity = normalizeQuery(rawCity);

  // Step 1: Geocoding (Lookup coordinates for the requested city)
  const geocodeUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(resolvedCity)}&count=10&language=en&format=json`;

  let geocodeRes;
  try {
    geocodeRes = await fetch(geocodeUrl);
  } catch (netErr) {
    throw new Error('Network error: Unable to reach geocoding service. Please check your internet connection.');
  }

  if (!geocodeRes.ok) {
    throw new Error(`Weather service error (${geocodeRes.status}). Please try again later.`);
  }

  const geocodeData = await geocodeRes.json();

  if (!geocodeData.results || geocodeData.results.length === 0) {
    throw new Error(`City "${rawCity}" could not be found. Please check spelling or try another city in Pakistan or worldwide.`);
  }

  // Smart Selection:
  // If user searched a city name without specifying an overseas country,
  // check if any of the results belong to Pakistan (PK).
  // E.g. "Lahore", "Hyderabad", "Multan", "Gujrat", "Kotri", "Islamabad".
  const rawLower = rawCity.toLowerCase();
  const specifiedForeignCountry = rawLower.includes('india') || rawLower.includes('us') || rawLower.includes('uk') || rawLower.includes('japan') || rawLower.includes('france') || rawLower.includes('canada');

  let location = geocodeData.results[0];

  if (!specifiedForeignCountry) {
    const pakMatch = geocodeData.results.find(item => item.country_code === 'PK');
    if (pakMatch) {
      location = pakMatch;
    }
  }

  const { latitude, longitude, name, country, country_code, admin1, timezone } = location;
  const accurateTimezone = timezone || 'Asia/Karachi';

  // Step 2: Fetch Current Weather + 5-Day Daily Forecast using exact timezone
  const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,surface_pressure,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=${encodeURIComponent(accurateTimezone)}`;

  let weatherRes;
  try {
    weatherRes = await fetch(weatherUrl);
  } catch (netErr) {
    throw new Error('Network connection failure while fetching weather data.');
  }

  if (!weatherRes.ok) {
    throw new Error(`Weather service responded with error status ${weatherRes.status}.`);
  }

  const weatherData = await weatherRes.json();
  const current = weatherData.current;
  const daily = weatherData.daily;

  const { condition, iconKey, mood } = interpretWmoCode(current.weather_code);

  // Format 5-Day Forecast
  const forecast = [];
  const daysCount = Math.min(5, daily.time.length);

  for (let i = 0; i < daysCount; i++) {
    const dateObj = new Date(daily.time[i] + 'T00:00:00');
    const dayName = i === 0 ? 'Today' : dateObj.toLocaleDateString('en-US', { weekday: 'short', timeZone: accurateTimezone });
    const formattedDate = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: accurateTimezone });
    const dayWeather = interpretWmoCode(daily.weather_code[i]);

    forecast.push({
      day: dayName,
      date: formattedDate,
      tempMaxC: Math.round(daily.temperature_2m_max[i]),
      tempMinC: Math.round(daily.temperature_2m_min[i]),
      condition: dayWeather.condition,
      iconKey: dayWeather.iconKey,
    });
  }

  return {
    city: name,
    region: admin1 || '',
    country: country_code || country || '',
    countryName: country || (country_code === 'PK' ? 'Pakistan' : country_code),
    timezone: accurateTimezone,
    temperatureC: Math.round(current.temperature_2m),
    feelsLikeC: Math.round(current.apparent_temperature),
    humidity: Math.round(current.relative_humidity_2m),
    windKmh: Math.round(current.wind_speed_10m),
    pressureHpa: Math.round(current.surface_pressure),
    condition,
    iconKey,
    mood,
    provider: 'Open-Meteo',
    timestamp: new Date(),
    forecast,
  };
}

// Fetch weather from OpenWeatherMap API
async function fetchFromOpenWeatherMap(city, apiKey) {
  if (!apiKey || apiKey.trim() === '') {
    throw new Error('OpenWeatherMap API Key is missing. Configure your API key in settings or switch to Open-Meteo.');
  }

  const trimmedKey = apiKey.trim();
  const resolvedCity = normalizeQuery(city);
  const currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(resolvedCity)}&appid=${trimmedKey}&units=metric`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(resolvedCity)}&appid=${trimmedKey}&units=metric`;

  let currentRes, forecastRes;
  try {
    [currentRes, forecastRes] = await Promise.all([
      fetch(currentUrl),
      fetch(forecastUrl),
    ]);
  } catch (netErr) {
    throw new Error('Network error: Unable to connect to OpenWeatherMap. Please check your internet connection.');
  }

  if (currentRes.status === 401) {
    throw new Error('Invalid OpenWeatherMap API Key. Please verify the key in API settings.');
  }

  if (currentRes.status === 404) {
    throw new Error(`City "${city}" was not found. Please verify the spelling and try again.`);
  }

  if (!currentRes.ok) {
    throw new Error(`OpenWeatherMap error (${currentRes.status}). Please try again.`);
  }

  const currentData = await currentRes.json();
  const forecastData = forecastRes.ok ? await forecastRes.json() : null;

  const weatherMain = currentData.weather?.[0] || {};
  const { condition, iconKey, mood } = interpretOwmCode(weatherMain.id || 800, weatherMain.main || 'Clear');

  // Parse 5-day forecast
  const forecast = [];
  if (forecastData && forecastData.list) {
    const dailyMap = new Map();

    for (const item of forecastData.list) {
      const dateKey = item.dt_txt.split(' ')[0];
      if (!dailyMap.has(dateKey)) {
        dailyMap.set(dateKey, {
          date: dateKey,
          temps: [],
          weather: item.weather?.[0] || {},
        });
      }
      dailyMap.get(dateKey).temps.push(item.main.temp);
    }

    let count = 0;
    for (const [dateStr, dayData] of dailyMap.entries()) {
      if (count >= 5) break;
      const dateObj = new Date(dateStr + 'T00:00:00');
      const dayName = count === 0 ? 'Today' : dateObj.toLocaleDateString('en-US', { weekday: 'short' });
      const formattedDate = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      const maxC = Math.round(Math.max(...dayData.temps));
      const minC = Math.round(Math.min(...dayData.temps));
      const dayInfo = interpretOwmCode(dayData.weather.id || 800, dayData.weather.main || 'Clear');

      forecast.push({
        day: dayName,
        date: formattedDate,
        tempMaxC: maxC,
        tempMinC: minC,
        condition: dayInfo.condition,
        iconKey: dayInfo.iconKey,
      });
      count++;
    }
  }

  return {
    city: currentData.name,
    region: '',
    country: currentData.sys?.country || '',
    countryName: currentData.sys?.country === 'PK' ? 'Pakistan' : currentData.sys?.country || '',
    timezone: 'Asia/Karachi',
    temperatureC: Math.round(currentData.main.temp),
    feelsLikeC: Math.round(currentData.main.feels_like),
    humidity: currentData.main.humidity,
    windKmh: Math.round((currentData.wind.speed || 0) * 3.6),
    pressureHpa: currentData.main.pressure,
    condition: weatherMain.description ? weatherMain.description : condition,
    iconKey,
    mood,
    provider: 'OpenWeatherMap',
    timestamp: new Date(),
    forecast,
  };
}

// Main public fetch function using async/await and try/catch
export async function getWeatherData(city) {
  if (!city || city.trim().length === 0) {
    throw new Error('Please enter a city name to search.');
  }

  const provider = getSavedProvider();
  const apiKey = getSavedApiKey();

  if (provider === 'openweathermap' && apiKey) {
    try {
      return await fetchFromOpenWeatherMap(city, apiKey);
    } catch {
      return await fetchFromOpenMeteo(city);
    }
  }

  return await fetchFromOpenMeteo(city);
}

// Temperature Unit Converter Helpers
export function convertTemp(celsius, unit) {
  if (unit === 'F') {
    return Math.round((celsius * 9) / 5 + 32);
  }
  return Math.round(celsius);
}

// Wind Speed Unit Converter Helpers
export function convertWind(kmh, unit) {
  if (unit === 'F') {
    return `${Math.round(kmh * 0.621371)} mph`;
  }
  return `${kmh} km/h`;
}
