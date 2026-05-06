# Weather App

A beautiful weather application built with React, Vite, and Tailwind CSS.

## Features

- Search weather for any city worldwide
- Real-time temperature, humidity, and wind data
- 5-day weather forecast
- Responsive design for all screen sizes
- Beautiful gradient background with glassmorphism effects
- Dark mode support via system preference

## Getting Started

### Prerequisites

- Node.js 18+ installed
- OpenWeatherMap API key (free tier available at [openweathermap.org](https://openweathermap.org/api))

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   ```bash
   cp .env.example .env
   ```
   Then edit `.env` and add your OpenWeatherMap API key:
   ```
   VITE_WEATHER_API_KEY=your_actual_api_key_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and visit `http://localhost:5173`

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Tech Stack

- **React 19** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS 4** - Utility-first CSS framework
- **OpenWeatherMap API** - Weather data provider

## License

MIT
