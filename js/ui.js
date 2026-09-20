// UI Renderer & DOM Controller Module

import { convertTemp, convertWind } from './weather-service.js';
import { getWeatherIconSvg } from './icons.js';

// DOM Elements getter (always queries live elements to avoid timing issues)
export const elements = new Proxy({}, {
  get(target, prop) {
    const map = {
      searchForm: 'search-form',
      searchInput: 'search-input',
      searchButton: 'search-button',
      loadingIndicator: 'loading-indicator',
      errorBanner: 'error-banner',
      errorMessage: 'error-message',
      errorCloseBtn: 'error-close-btn',
      weatherContent: 'weather-content',
      unitBtnC: 'unit-c-btn',
      unitBtnF: 'unit-f-btn',
      cityName: 'city-name',
      regionBadge: 'region-badge',
      countryPill: 'country-pill',
      dateTime: 'date-time',
      currentTemp: 'current-temp',
      tempUnit: 'temp-unit',
      conditionText: 'condition-text',
      weatherHeroIcon: 'weather-hero-icon',
      weatherStatusBadge: 'weather-status-badge',
      feelsLikeValue: 'feels-like-value',
      humidityValue: 'humidity-value',
      windValue: 'wind-value',
      pressureValue: 'pressure-value',
      forecastGrid: 'forecast-grid',
      apiModal: 'api-modal',
      openApiModalBtn: 'open-api-modal-btn',
      closeApiModalBtn: 'close-api-modal-btn',
      cancelApiModalBtn: 'cancel-api-modal-btn',
      saveApiModalBtn: 'save-api-modal-btn',
      providerSelect: 'provider-select',
      apiKeyInput: 'api-key-input',
      apiKeyGroup: 'api-key-group',
    };
    const id = map[prop];
    return id ? document.getElementById(id) : null;
  }
});

// Show loading indicator
export function showLoading() {
  if (elements.loadingIndicator) {
    elements.loadingIndicator.classList.add('active');
  }
  if (elements.errorBanner) {
    elements.errorBanner.classList.remove('active');
  }
  if (elements.searchButton) {
    elements.searchButton.disabled = true;
    elements.searchButton.style.opacity = '0.7';
  }
}

// Hide loading indicator
export function hideLoading() {
  if (elements.loadingIndicator) {
    elements.loadingIndicator.classList.remove('active');
  }
  if (elements.searchButton) {
    elements.searchButton.disabled = false;
    elements.searchButton.style.opacity = '1';
  }
}

// Display an error message banner
export function showError(message) {
  if (elements.errorMessage) {
    elements.errorMessage.textContent = message;
  }
  if (elements.errorBanner) {
    elements.errorBanner.classList.add('active');
  }
  elements.errorBanner?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Dismiss error banner
export function clearError() {
  if (elements.errorBanner) {
    elements.errorBanner.classList.remove('active');
  }
}

// Render weather data into the UI
export function renderWeather(data, unit = 'C') {
  if (!data) return;

  // Make sure content container is visible
  if (elements.weatherContent) {
    elements.weatherContent.classList.remove('hidden');
  }

  // 1. City Name, Province / Region, and Country
  if (elements.cityName) {
    elements.cityName.textContent = data.city;
  }

  if (elements.regionBadge) {
    if (data.region && data.region.trim()) {
      elements.regionBadge.textContent = data.region;
      elements.regionBadge.style.display = 'inline-block';
    } else {
      elements.regionBadge.style.display = 'none';
    }
  }

  if (elements.countryPill) {
    const label = data.countryName || data.country || 'Pakistan';
    elements.countryPill.textContent = label;
    elements.countryPill.style.display = 'inline-block';
  }

  // 2. Accurate Date & Local Time based on the city's exact timezone
  if (elements.dateTime) {
    const timeZone = data.timezone || 'Asia/Karachi';
    try {
      const now = new Date();
      const formattedDate = now.toLocaleDateString('en-US', {
        timeZone,
        weekday: 'long',
        month: 'short',
        day: 'numeric',
      });
      const formattedTime = now.toLocaleTimeString('en-US', {
        timeZone,
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      });
      elements.dateTime.textContent = `${formattedDate} · Local Time: ${formattedTime}`;
    } catch (tzErr) {
      elements.dateTime.textContent = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'short',
        day: 'numeric',
      });
    }
  }

  // 3. Current Temperature & Unit
  updateTemperatureDisplays(data, unit);

  // 4. Weather Condition Description & Icon
  if (elements.conditionText) {
    elements.conditionText.textContent = data.condition;
  }

  if (elements.weatherHeroIcon) {
    elements.weatherHeroIcon.innerHTML = getWeatherIconSvg(data.iconKey);
  }

  // 5. Dynamic Weather Mood Status Badge
  if (elements.weatherStatusBadge) {
    let statusMsg = 'Optimal Conditions';
    if (data.mood === 'sunny') {
      statusMsg = 'Bright & Sunny';
    } else if (data.mood === 'rainy') {
      statusMsg = 'Precipitation Active';
    } else if (data.mood === 'snowy') {
      statusMsg = 'Freezing Temperatures';
    } else if (data.mood === 'cloudy') {
      statusMsg = 'Overcast Sky';
    }
    elements.weatherStatusBadge.textContent = statusMsg;
  }

  // 6. Additional Weather Metrics
  if (elements.humidityValue) {
    elements.humidityValue.textContent = `${data.humidity}%`;
  }
  if (elements.pressureValue) {
    elements.pressureValue.textContent = `${data.pressureHpa} hPa`;
  }

  // 7. Extended 5-Day Forecast Cards
  renderForecast(data.forecast, unit);
}

// Updates all temperature displays without needing a new API request
export function updateTemperatureDisplays(data, unit = 'C') {
  if (!data) return;

  const symbol = unit === 'F' ? '°F' : '°C';

  // Hero temperature
  if (elements.currentTemp) {
    elements.currentTemp.textContent = convertTemp(data.temperatureC, unit);
  }
  if (elements.tempUnit) {
    elements.tempUnit.textContent = symbol;
  }

  // Feels-like metric
  if (elements.feelsLikeValue) {
    elements.feelsLikeValue.textContent = `${convertTemp(data.feelsLikeC, unit)}${symbol}`;
  }

  // Wind speed metric (scales with unit system)
  if (elements.windValue) {
    elements.windValue.textContent = convertWind(data.windKmh, unit);
  }

  // Forecast cards
  if (data.forecast && data.forecast.length > 0) {
    renderForecast(data.forecast, unit);
  }

  // Toggle active button state
  if (elements.unitBtnC && elements.unitBtnF) {
    if (unit === 'C') {
      elements.unitBtnC.classList.add('active');
      elements.unitBtnC.setAttribute('aria-pressed', 'true');
      elements.unitBtnF.classList.remove('active');
      elements.unitBtnF.setAttribute('aria-pressed', 'false');
    } else {
      elements.unitBtnF.classList.add('active');
      elements.unitBtnF.setAttribute('aria-pressed', 'true');
      elements.unitBtnC.classList.remove('active');
      elements.unitBtnC.setAttribute('aria-pressed', 'false');
    }
  }
}

// Render 5-day forecast cards
function renderForecast(forecastDays, unit = 'C') {
  if (!elements.forecastGrid || !forecastDays || forecastDays.length === 0) return;

  const symbol = unit === 'F' ? '°F' : '°C';

  elements.forecastGrid.innerHTML = forecastDays
    .map((day) => {
      const max = convertTemp(day.tempMaxC, unit);
      const min = convertTemp(day.tempMinC, unit);
      const iconSvg = getWeatherIconSvg(day.iconKey);

      return `
        <article class="forecast-day-card" aria-label="Forecast for ${day.day}">
          <div class="forecast-day-name">${day.day}</div>
          <div class="forecast-date">${day.date}</div>
          <div class="forecast-icon">${iconSvg}</div>
          <div class="forecast-condition">${day.condition}</div>
          <div class="forecast-temps">
            <span class="forecast-temp-max">${max}${symbol}</span>
            <span class="forecast-temp-min">${min}${symbol}</span>
          </div>
        </article>
      `;
    })
    .join('');
}
