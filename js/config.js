// Application Configuration & State Keys

export const CONFIG = {
  DEFAULT_CITY: 'Islamabad',
  DEFAULT_UNIT: 'C',
  DEFAULT_PROVIDER: 'open-meteo',
  STORAGE_KEYS: {
    API_KEY: 'weather_dashboard_owm_key',
    PROVIDER: 'weather_dashboard_provider',
    UNIT: 'weather_dashboard_unit',
  },
  ALIASES: {
    'isb': 'Islamabad',
    'lhr': 'Lahore',
    'khi': 'Karachi',
    'pindi': 'Rawalpindi',
    'rwp': 'Rawalpindi',
    'fsd': 'Faisalabad',
    'di khan': 'Dera Ismail Khan',
    'd.i. khan': 'Dera Ismail Khan',
    'dg khan': 'Dera Ghazi Khan',
    'd.g. khan': 'Dera Ghazi Khan',
    'ryk': 'Rahim Yar Khan',
    'r.y. khan': 'Rahim Yar Khan',
    'wah': 'Wah Cantt',
  }
};

// Retrieve saved API Key from localStorage
export function getSavedApiKey() {
  try {
    return localStorage.getItem(CONFIG.STORAGE_KEYS.API_KEY) || '';
  } catch (e) {
    return '';
  }
}

// Save API Key to localStorage
export function saveApiKey(key) {
  try {
    if (key) {
      localStorage.setItem(CONFIG.STORAGE_KEYS.API_KEY, key.trim());
    } else {
      localStorage.removeItem(CONFIG.STORAGE_KEYS.API_KEY);
    }
  } catch (e) {
    // Storage access unavailable in certain sandbox environments; fail silently
  }
}

// Retrieve saved Weather Provider
export function getSavedProvider() {
  try {
    return localStorage.getItem(CONFIG.STORAGE_KEYS.PROVIDER) || CONFIG.DEFAULT_PROVIDER;
  } catch (e) {
    return CONFIG.DEFAULT_PROVIDER;
  }
}

// Save Weather Provider
export function saveProvider(provider) {
  try {
    localStorage.setItem(CONFIG.STORAGE_KEYS.PROVIDER, provider);
  } catch (e) {
    // Storage access unavailable; fail silently
  }
}

// Retrieve saved Temperature Unit ('C' or 'F')
export function getSavedUnit() {
  try {
    return localStorage.getItem(CONFIG.STORAGE_KEYS.UNIT) || CONFIG.DEFAULT_UNIT;
  } catch (e) {
    return CONFIG.DEFAULT_UNIT;
  }
}

// Save Temperature Unit ('C' or 'F')
export function saveUnit(unit) {
  try {
    localStorage.setItem(CONFIG.STORAGE_KEYS.UNIT, unit);
  } catch (e) {
    // Storage access unavailable; fail silently
  }
}
