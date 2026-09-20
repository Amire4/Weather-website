// Main Application Controller
// Connects UI, Services, and State

import { CONFIG, getSavedApiKey, saveApiKey, getSavedProvider, saveProvider, getSavedUnit, saveUnit } from './config.js';
import { getWeatherData } from './weather-service.js';
import { elements, renderWeather, updateTemperatureDisplays, showLoading, hideLoading, showError, clearError } from './ui.js';
import { ICONS } from './icons.js';

// Application state
let currentUnit = getSavedUnit() || CONFIG.DEFAULT_UNIT;
let currentWeatherData = null;
let currentCity = CONFIG.DEFAULT_CITY;

// Perform weather search for a given city
async function searchCity(city) {
  if (!city || !city.trim()) {
    showError('Please enter a city name.');
    return;
  }

  const query = city.trim();
  showLoading();
  clearError();

  try {
    const data = await getWeatherData(query);
    currentWeatherData = data;
    currentCity = data.city;
    renderWeather(currentWeatherData, currentUnit);
  } catch (error) {
    showError(error?.message || 'Unable to retrieve weather data. Please try again.');
  } finally {
    hideLoading();
  }
}

// Bind all DOM Event Listeners
function setupEventListeners() {
  // 1. City Search Form Submit
  if (elements.searchForm) {
    elements.searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const city = elements.searchInput?.value;
      if (city) {
        searchCity(city);
      }
    });
  }

  // 2. Temperature Unit Toggle (°C / °F)
  if (elements.unitBtnC) {
    elements.unitBtnC.addEventListener('click', () => {
      if (currentUnit !== 'C') {
        currentUnit = 'C';
        saveUnit('C');
        updateTemperatureDisplays(currentWeatherData, currentUnit);
      }
    });
  }

  if (elements.unitBtnF) {
    elements.unitBtnF.addEventListener('click', () => {
      if (currentUnit !== 'F') {
        currentUnit = 'F';
        saveUnit('F');
        updateTemperatureDisplays(currentWeatherData, currentUnit);
      }
    });
  }

  // 4. Error banner dismiss button
  if (elements.errorCloseBtn) {
    elements.errorCloseBtn.addEventListener('click', () => {
      clearError();
    });
  }

  // 5. API Settings Modal
  setupModalListeners();
}

// Configure API Settings Modal
function setupModalListeners() {
  const {
    apiModal,
    openApiModalBtn,
    closeApiModalBtn,
    cancelApiModalBtn,
    saveApiModalBtn,
    providerSelect,
    apiKeyInput,
    apiKeyGroup,
  } = elements;

  if (!apiModal) return;

  function openModal() {
    const currentProvider = getSavedProvider();
    const currentKey = getSavedApiKey();

    if (providerSelect) {
      providerSelect.value = currentProvider;
    }
    if (apiKeyInput) {
      apiKeyInput.value = currentKey;
    }
    toggleKeyVisibility(currentProvider);

    apiModal.classList.add('active');
    apiModal.setAttribute('aria-hidden', 'false');
  }

  function closeModal() {
    apiModal.classList.remove('active');
    apiModal.setAttribute('aria-hidden', 'true');
  }

  function toggleKeyVisibility(provider) {
    if (apiKeyGroup) {
      apiKeyGroup.style.display = provider === 'openweathermap' ? 'flex' : 'none';
    }
  }

  if (openApiModalBtn) {
    openApiModalBtn.addEventListener('click', openModal);
  }

  if (closeApiModalBtn) {
    closeApiModalBtn.addEventListener('click', closeModal);
  }

  if (cancelApiModalBtn) {
    cancelApiModalBtn.addEventListener('click', closeModal);
  }

  if (providerSelect) {
    providerSelect.addEventListener('change', (e) => {
      toggleKeyVisibility(e.target.value);
    });
  }

  if (saveApiModalBtn) {
    saveApiModalBtn.addEventListener('click', () => {
      const selectedProvider = providerSelect?.value || CONFIG.DEFAULT_PROVIDER;
      const keyVal = apiKeyInput?.value || '';

      saveProvider(selectedProvider);
      saveApiKey(keyVal);
      closeModal();

      // Refresh current city with new provider configuration
      searchCity(currentCity || CONFIG.DEFAULT_CITY);
    });
  }

  // Close modal when clicking outside dialog content
  apiModal.addEventListener('click', (e) => {
    if (e.target === apiModal) {
      closeModal();
    }
  });

  // Close modal with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && apiModal.classList.contains('active')) {
      closeModal();
    }
  });
}

// Initialize Application
function init() {
  setupEventListeners();

  // Populate UI inline icons
  const searchBtn = document.getElementById('search-button');
  if (searchBtn && !searchBtn.querySelector('svg')) {
    searchBtn.insertAdjacentHTML('afterbegin', ICONS.search);
  }

  const metricIcons = {
    'feels-like-icon': ICONS.thermometer,
    'humidity-icon': ICONS.humidity,
    'wind-icon': ICONS.wind,
    'pressure-icon': ICONS.pressure,
    'error-icon': ICONS.alertCircle,
    'error-close-icon': ICONS.close,
    'modal-close-icon': ICONS.close,
    'settings-icon': ICONS.settings,
  };

  for (const [id, svg] of Object.entries(metricIcons)) {
    const el = document.getElementById(id);
    if (el) {
      el.innerHTML = svg;
    }
  }

  // Initial load: fetch default city (Islamabad)
  searchCity(CONFIG.DEFAULT_CITY);
}

// Start application when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
