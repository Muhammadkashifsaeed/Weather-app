import { useState } from 'react'
import { useWeather } from '../hooks/useWeather'
import SearchBar from './SearchBar'
import CurrentWeather from './CurrentWeather'
import Forecast from './Forecast'
import LoadingSpinner from './LoadingSpinner'
import ErrorMessage from './ErrorMessage'
import './WeatherApp.css'

export default function WeatherApp() {
  const [city, setCity] = useState('London')
  const { weather, forecast, loading, error, fetchWeather } = useWeather(city)

  const handleSearch = (searchCity) => {
    setCity(searchCity)
    fetchWeather(searchCity)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-blue-600 to-purple-700 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl mx-auto space-y-4">
        <header className="text-center mb-6">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg">
            ⛅ Weather Forecast
          </h1>
          <p className="text-white/90 text-lg">Real-time weather updates worldwide</p>
        </header>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-5 shadow-xl border border-white/20">
          <SearchBar onSearch={handleSearch} />
        </div>

        {loading && <LoadingSpinner />}
        {error && <ErrorMessage message={error} />}

        {weather && !loading && !error && (
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-5 shadow-xl border border-white/20 space-y-4">
            <CurrentWeather weather={weather} />
            <div className="border-t border-white/10"></div>
            <Forecast forecast={forecast} />
          </div>
        )}

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-5 shadow-xl border border-white/20">
          <Features />
        </div>
      </div>
    </div>
  )
}

function Features() {
  return (
    <div className="grid grid-cols-3 gap-3">
      <FeatureCard
        icon="🌡️"
        title="Temperature"
        description="Real-time temperature"
      />
      <FeatureCard
        icon="💧"
        title="Humidity"
        description="Track humidity levels"
      />
      <FeatureCard
        icon="💨"
        title="Wind Speed"
        description="Monitor wind conditions"
      />
    </div>
  )
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white/20 rounded-xl p-3 text-white text-center">
      <div className="text-2xl mb-1">{icon}</div>
      <h3 className="text-sm font-semibold mb-1">{title}</h3>
      <p className="text-white/80 text-xs">{description}</p>
    </div>
  )
}
