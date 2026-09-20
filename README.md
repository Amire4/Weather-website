# Weather Dashboard

A clean, modern, and responsive weather forecasting interface built with pure HTML, CSS, and Vanilla JavaScript. The dashboard allows users to search for cities worldwide, retrieve real-time meteorological conditions, toggle temperature units, inspect extended 5-day forecasts, and review environmental metrics.

# Features

- City Search: Instant city query with form submission and keyboard Enter support for all cities in Pakistan and worldwide.
- Current Weather Information:
  - City name and country badge
  - Formatted date and last-updated local time
  - Current temperature with dynamic unit formatting
  - Weather condition description
  - Crisp, minimalist vector weather icon
  - Contextual status badge (e.g. Bright & Clear, Overcast Sky, Precipitation Active)
- Temperature Unit Conversion: Seamless one-click toggle between Celsius (°C) and Fahrenheit (°F) across all current temperatures, feels-like metrics, and extended daily forecasts.
- Extended 5-Day Forecast: Daily outlook showing day name, date, condition icon, condition text, and high/low temperatures.
- Additional Weather Metrics:
  - Feels-like perceived temperature
  - Relative humidity percentage
  - Surface wind speed (in km/h or mph)
  - Barometric pressure (in hPa)
- Loading & Error Handling:
  - Animated spinner during asynchronous data fetching
  - Graceful error banner for invalid city names, network interruptions, and API errors
  - Automatic fallback to prevent crashes



# Visual Design & Theme

Strictly adheres to the required design specifications:
- Primary Color: #0284C7 (Sky Blue)
- Secondary / Accent Color: #F59E0B (Amber / Sun Gold)
- Background Colors:
  - #F0F9FF (Light weather blue background)
  - #FFFFFF (Card background)
- Text Colors:
  - #0C4A6E (Dark blue primary text)
  - #0369A1 (Muted / secondary text)
- Typography: Inter & system-ui
- Responsive Design: Fluid layout adapting seamlessly down to 375px mobile screens up to wide desktop displays.


# Technology Stack

- Markup: Semantic HTML5
- Styling: Vanilla CSS (Custom properties, Flexbox, Grid, fluid typography)
- Scripting: Vanilla JavaScript (ES Modules, fetch, async/await, DOM API)
- Dependencies: Zero runtime client framework dependencies (no React, Vue, or Angular).


# Public Weather API & API Key Configuration

The dashboard supports two public weather providers:

1. Open-Meteo (Default - Out of the Box):
   - 100% free, public weather API with zero authentication requirements.
   - Works immediately upon initial page load without any manual setup or registration.
2. OpenWeatherMap (Optional):
   - Can be used by configuring an OpenWeatherMap API key.

### Configuring an OpenWeatherMap API Key

You can configure your OpenWeatherMap API key in two ways:

#### Option A: In-App UI (Recommended)
1. Click the API Settings button in the top navigation bar.
2. Select OpenWeatherMap in the provider dropdown.
3. Enter your 32-character API key obtained from openweathermap.org.
4. Click Save Settings. The key is stored locally in your browser's localStorage and will persist across sessions.

# Option B: In Code Configuration
Open js/config.js and set your key:
```javascript
export const CONFIG = {
  DEFAULT_CITY: 'Islamabad',
  DEFAULT_UNIT: 'C',
  DEFAULT_PROVIDER: 'open-meteo',
  // ...
};
```

# Running Locally

# Prerequisites
- Node.js (v18 or higher recommended)
- npm

# Installation Steps

1. Clone or download the repository:
   ```bash
   git clone <repository-url>
   cd weather-dashboard
   ```

2. Install development tools:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

# Building for Production

To create an optimized production build:
```bash
npm run build
```
The compiled, self-contained static assets will be output to the dist directory, ready to deploy to any static host (Vercel, Netlify, GitHub Pages, or Cloud Run).


# Project Structure

```
├── css/
│   └── style.css            # Modular CSS styling and responsive rules
├── js/
│   ├── app.js               # Application coordinator & event bindings
│   ├── config.js            # Provider defaults, keys, and storage
│   ├── icons.js             # Vector weather & UI SVG assets
│   ├── ui.js                # DOM rendering, updates, and loading states
│   └── weather-service.js   # Asynchronous fetch service & data normalization
├── index.html               # Semantic HTML5 entry point
├── metadata.json            # AI Studio app metadata
├── package.json             # Project scripts and configuration
├── vite.config.ts           # Development server & build configuration
└── README.md                # Project documentation
```


# License

MIT License
