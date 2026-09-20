// Weather & UI SVG Icons
// Crisp vector icons with Sky Blue (#0284C7) and Sun Gold (#F59E0B) accents

export const ICONS = {
  // Sunny / Clear
  sunny: `
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" class="weather-icon-svg" aria-hidden="true">
      <circle cx="32" cy="32" r="14" fill="#F59E0B" />
      <g stroke="#F59E0B" stroke-width="3" stroke-linecap="round">
        <line x1="32" y1="6" x2="32" y2="12" />
        <line x1="32" y1="52" x2="32" y2="58" />
        <line x1="6" y1="32" x2="12" y2="32" />
        <line x1="52" y1="32" x2="58" y2="32" />
        <line x1="13.6" y1="13.6" x2="17.8" y2="17.8" />
        <line x1="46.2" y1="46.2" x2="50.4" y2="50.4" />
        <line x1="13.6" y1="50.4" x2="17.8" y2="46.2" />
        <line x1="46.2" y1="17.8" x2="50.4" y2="13.6" />
      </g>
    </svg>
  `,

  // Partly Cloudy
  partlyCloudy: `
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" class="weather-icon-svg" aria-hidden="true">
      <circle cx="26" cy="24" r="11" fill="#F59E0B" />
      <g stroke="#F59E0B" stroke-width="2.5" stroke-linecap="round">
        <line x1="26" y1="6" x2="26" y2="10" />
        <line x1="13" y1="13" x2="16" y2="16" />
        <line x1="8" y1="24" x2="12" y2="24" />
        <line x1="39" y1="13" x2="36" y2="16" />
      </g>
      <path d="M46 48H22C17.58 48 14 44.42 14 40C14 35.8 17.2 32.35 21.35 32.03C22.65 25.2 28.59 20 35.8 20C43.5 20 49.85 25.9 50.45 33.5C54.75 34.2 58 37.95 58 42.5C58 45.54 52.7 48 46 48Z" fill="#BAE6FD" stroke="#0284C7" stroke-width="2.5" stroke-linejoin="round"/>
    </svg>
  `,

  // Cloudy / Overcast
  cloudy: `
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" class="weather-icon-svg" aria-hidden="true">
      <path d="M48 46H20C15.58 46 12 42.42 12 38C12 33.8 15.2 30.35 19.35 30.03C20.65 23.2 26.59 18 33.8 18C41.5 18 47.85 23.9 48.45 31.5C52.75 32.2 56 35.95 56 40.5C56 43.54 52.4 46 48 46Z" fill="#E0F2FE" stroke="#0284C7" stroke-width="2.5" stroke-linejoin="round"/>
    </svg>
  `,

  // Rain / Showers
  rainy: `
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" class="weather-icon-svg" aria-hidden="true">
      <path d="M46 38H20C15.58 38 12 34.42 12 30C12 25.8 15.2 22.35 19.35 22.03C20.65 15.2 26.59 10 33.8 10C41.5 10 47.85 15.9 48.45 23.5C52.75 24.2 56 27.95 56 32.5C56 35.54 52 38 46 38Z" fill="#BAE6FD" stroke="#0284C7" stroke-width="2.5" stroke-linejoin="round"/>
      <g stroke="#0284C7" stroke-width="2.5" stroke-linecap="round">
        <line x1="22" y1="44" x2="18" y2="52" />
        <line x1="32" y1="44" x2="28" y2="52" />
        <line x1="42" y1="44" x2="38" y2="52" />
      </g>
    </svg>
  `,

  // Thunderstorm
  thunderstorm: `
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" class="weather-icon-svg" aria-hidden="true">
      <path d="M46 36H20C15.58 36 12 32.42 12 28C12 23.8 15.2 20.35 19.35 20.03C20.65 13.2 26.59 8 33.8 8C41.5 8 47.85 13.9 48.45 21.5C52.75 22.2 56 25.95 56 30.5C56 33.54 52 36 46 36Z" fill="#BAE6FD" stroke="#0284C7" stroke-width="2.5" stroke-linejoin="round"/>
      <polygon points="32,38 24,50 31,50 27,60 39,46 33,46" fill="#F59E0B" stroke="#D97706" stroke-width="1.5" stroke-linejoin="round" />
    </svg>
  `,

  // Snow
  snowy: `
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" class="weather-icon-svg" aria-hidden="true">
      <path d="M46 36H20C15.58 36 12 32.42 12 28C12 23.8 15.2 20.35 19.35 20.03C20.65 13.2 26.59 8 33.8 8C41.5 8 47.85 13.9 48.45 21.5C52.75 22.2 56 25.95 56 30.5C56 33.54 52 36 46 36Z" fill="#E0F2FE" stroke="#0284C7" stroke-width="2.5" stroke-linejoin="round"/>
      <g stroke="#0284C7" stroke-width="2" stroke-linecap="round">
        <line x1="22" y1="44" x2="22" y2="52" />
        <line x1="18" y1="48" x2="26" y2="48" />
        <line x1="34" y1="44" x2="34" y2="52" />
        <line x1="30" y1="48" x2="38" y2="48" />
        <line x1="46" y1="44" x2="46" y2="52" />
        <line x1="42" y1="48" x2="50" y2="48" />
      </g>
    </svg>
  `,

  // Fog / Mist
  mist: `
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" class="weather-icon-svg" aria-hidden="true">
      <g stroke="#0284C7" stroke-width="3" stroke-linecap="round">
        <line x1="16" y1="20" x2="48" y2="20" opacity="0.8" />
        <line x1="12" y1="28" x2="52" y2="28" />
        <line x1="18" y1="36" x2="46" y2="36" opacity="0.9" />
        <line x1="14" y1="44" x2="50" y2="44" />
        <line x1="20" y1="52" x2="44" y2="52" opacity="0.7" />
      </g>
    </svg>
  `,

  // UI Icons
  search: `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  `,

  thermometer: `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"></path>
    </svg>
  `,

  humidity: `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
    </svg>
  `,

  wind: `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"></path>
    </svg>
  `,

  pressure: `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10"></circle>
      <path d="M16 12l-4-4-4 4"></path>
      <path d="M12 16V8"></path>
    </svg>
  `,

  settings: `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="3"></circle>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
    </svg>
  `,

  alertCircle: `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="8" x2="12" y2="12"></line>
      <line x1="12" y1="16" x2="12.01" y2="16"></line>
    </svg>
  `,

  close: `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  `
};

// Helper to get matching weather SVG by condition key
export function getWeatherIconSvg(iconKey) {
  switch (iconKey) {
    case 'sunny':
      return ICONS.sunny;
    case 'partlyCloudy':
      return ICONS.partlyCloudy;
    case 'cloudy':
      return ICONS.cloudy;
    case 'rainy':
      return ICONS.rainy;
    case 'thunderstorm':
      return ICONS.thunderstorm;
    case 'snowy':
      return ICONS.snowy;
    case 'mist':
      return ICONS.mist;
    default:
      return ICONS.partlyCloudy;
  }
}
