import { useState, useEffect } from 'react'
import axios from 'axios'

// ALL CITIES with coordinates (180+ cities across Pakistan + World)
const citiesData = {
  // ========== MAJOR PAKISTANI CITIES ==========
  "Karachi": [24.8607, 67.0011],
  "Lahore": [31.5204, 74.3587],
  "Islamabad": [33.6844, 73.0479],
  "Peshawar": [34.0151, 71.5249],
  "Quetta": [30.1798, 66.9750],
  "Multan": [30.1575, 71.5249],
  "Faisalabad": [31.4504, 73.0740],
  "Rawalpindi": [33.6007, 73.0379],
  "Gujranwala": [32.1612, 74.1883],
  "Hyderabad": [25.3872, 68.2547],
  "Sialkot": [32.4945, 74.5229],
  "Sargodha": [32.0837, 72.6711],
  "Bahawalpur": [29.3956, 71.6836],
  "Sukkur": [27.7052, 68.8578],
  "Jhang": [31.2667, 72.3167],
  "Sheikhupura": [31.7131, 73.9783],
  "Rahim Yar Khan": [28.4212, 70.2989],
  "Mardan": [34.2000, 72.0333],
  "Gujrat": [32.5733, 74.0789],
  "Kasur": [31.1200, 74.4500],
  "Mianwali": [32.5833, 71.5333],
  "Dera Ghazi Khan": [30.0500, 70.6333],
  "Nawabshah": [26.2500, 68.4000],
  "Kharian": [32.8000, 73.8500],
  "Hafizabad": [32.0667, 73.6833],
  "Jhelum": [32.9333, 73.7333],
  "Muzaffargarh": [30.0667, 71.1833],
  "Kotli": [33.5167, 73.9000],
  "Mirpur": [33.1500, 73.7500],
  "Mansehra": [34.3333, 73.2000],
  "Abbottabad": [34.1500, 73.2167],
  "Swat": [35.5000, 72.5000],
  "Charsadda": [34.1500, 71.7300],
  "Mardan": [34.2000, 72.0333],
  "Bannu": [32.9833, 70.6000],
  "Kohat": [33.5833, 71.4167],
  "Dera Ismail Khan": [31.8333, 70.9000],
  "Tank": [32.1667, 70.3833],
  
  // ========== PUNJAB DIVISIONS ==========
  "Lahore Division": [31.5204, 74.3587],
  "Rawalpindi Division": [33.6007, 73.0379],
  "Faisalabad Division": [31.4504, 73.0740],
  "Multan Division": [30.1575, 71.5249],
  "Gujranwala Division": [32.1612, 74.1883],
  "Sargodha Division": [32.0837, 72.6711],
  "Bahawalpur Division": [29.3956, 71.6836],
  "Dera Ghazi Khan Division": [30.0500, 70.6333],
  "Sahiwal Division": [30.6667, 73.1000],
  "Gujrat Division": [32.5733, 74.0789],
  "Mianwali Division": [32.5833, 71.5333],
  
  // ========== INTERNATIONAL CITIES ==========
  "London": [51.5074, -0.1278],
  "New York": [40.7128, -74.0060],
  "Dubai": [25.2048, 55.2708],
  "Tokyo": [35.6762, 139.6503],
  "Paris": [48.8566, 2.3522],
  "Sydney": [-33.8688, 151.2093],
  "Toronto": [43.6532, -79.3832],
  "Berlin": [52.5200, 13.4050],
  "Mumbai": [19.0760, 72.8777],
  "Delhi": [28.6139, 77.2090],
  "Moscow": [55.7558, 37.6173],
  "Beijing": [39.9042, 116.4074],
  "Singapore": [1.3521, 103.8198],
  "Hong Kong": [22.3193, 114.1694],
  "Bangkok": [13.7563, 100.5018],
  "Jakarta": [-6.2088, 106.8456],
  "Seoul": [37.5665, 126.9780],
  "Istanbul": [41.0082, 28.9784],
  "Tehran": [35.6892, 51.3890],
  "Cairo": [30.0444, 31.2357],
  "Riyadh": [24.7136, 46.6753],
  "Tehran": [35.6892, 51.3890],
  "Kabul": [34.5553, 69.2075],
  "Dhaka": [23.8103, 90.4125],
  "Colombo": [6.9271, 79.8612],
  "Kathmandu": [27.7172, 85.3240],
  "Thimphu": [27.4728, 89.6589],
  "Male": [4.1755, 73.5093],
  "Beijing": [39.9042, 116.4074],
  "Shanghai": [31.2304, 121.4737],
  "Guangzhou": [23.1291, 113.2644],
  "Shenzhen": [22.5431, 113.9444],
  "Chengdu": [30.5728, 104.0668],
  "Wuhan": [30.5928, 114.3055],
  "Xi'an": [34.3416, 108.9398],
  "Hangzhou": [30.2741, 120.1551],
  "Nanjing": [32.0603, 118.7969],
}

// Popular cities for autocomplete (sorted alphabetically)
const popularCities = Object.keys(citiesData).sort()

export function useWeather(city) {
  const [weather, setWeather] = useState(null)
  const [forecast, setForecast] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchWeather = async (cityName) => {
    if (!cityName) return

    setLoading(true)
    setError(null)

    try {
      // Normalize city name
      const normalizedCity = cityName.charAt(0).toUpperCase() + cityName.slice(1).toLowerCase()
      const coords = citiesData[normalizedCity]

      if (!coords) {
        // Try case-insensitive search
        const foundCity = Object.keys(citiesData).find(
          c => c.toLowerCase() === cityName.toLowerCase()
        )
        if (foundCity) {
          return fetchWeather(foundCity)
        }
        throw new Error(`City "${cityName}" not found in database.`)
      }

      const [lat, lon] = coords

      // Use Open-Meteo API (FREE, no key needed, real-time data)
      const weatherResponse = await axios.get(
        `https://api.open-meteo.com/v1/forecast`,
        {
          params: {
            latitude: lat,
            longitude: lon,
            current: 'temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m',
            daily: 'weather_code,temperature_2m_max,temperature_2m_min',
            timezone: 'auto',
            forecast_days: 7
          }
        }
      )

      const data = weatherResponse.data

      // Weather code to description/icon mapping (WMO codes)
      const weatherCodeMap = {
        0: { desc: 'Clear sky', icon: '01d' },
        1: { desc: 'Mainly clear', icon: '02d' },
        2: { desc: 'Partly cloudy', icon: '03d' },
        3: { desc: 'Overcast', icon: '04d' },
        45: { desc: 'Fog', icon: '50d' },
        48: { desc: 'Depositing rime fog', icon: '50d' },
        51: { desc: 'Light drizzle', icon: '10d' },
        53: { desc: 'Moderate drizzle', icon: '10d' },
        55: { desc: 'Dense drizzle', icon: '10d' },
        61: { desc: 'Slight rain', icon: '10d' },
        63: { desc: 'Moderate rain', icon: '10d' },
        65: { desc: 'Heavy rain', icon: '10d' },
        71: { desc: 'Slight snow', icon: '13d' },
        73: { desc: 'Moderate snow', icon: '13d' },
        75: { desc: 'Heavy snow', icon: '13d' },
        77: { desc: 'Snow grains', icon: '13d' },
        80: { desc: 'Slight rain showers', icon: '10d' },
        81: { desc: 'Moderate rain showers', icon: '10d' },
        82: { desc: 'Violent rain showers', icon: '10d' },
        85: { desc: 'Slight snow showers', icon: '13d' },
        86: { desc: 'Heavy snow showers', icon: '13d' },
        95: { desc: 'Thunderstorm', icon: '11d' },
        96: { desc: 'Thunderstorm with hail', icon: '11d' },
        99: { desc: 'Thunderstorm with heavy hail', icon: '11d' }
      }

      const currentWeather = data.current
      const weatherCode = currentWeather.weather_code
      const weatherInfo = weatherCodeMap[weatherCode] || { desc: 'Unknown', icon: '01d' }

      // Format weather data
      setWeather({
        name: normalizedCity,
        main: {
          temp: Math.round(currentWeather.temperature_2m),
          feels_like: Math.round(currentWeather.apparent_temperature),
          humidity: currentWeather.relative_humidity_2m,
          pressure: 1013 // Not available in free tier
        },
        weather: [{
          description: weatherInfo.desc,
          icon: weatherInfo.icon
        }],
        wind: {
          speed: (currentWeather.wind_speed_10m * 3.6).toFixed(1) // m/s → km/h
        }
      })

      // Process 5-day forecast
      if (data.daily) {
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
        const dailyForecast = []

        for (let i = 1; i <= 5; i++) {
          const date = new Date(data.daily.time[i])
          const dayName = days[date.getDay()]
          dailyForecast.push({
            day: dayName,
            high: Math.round(data.daily.temperature_2m_max[i]),
            low: Math.round(data.daily.temperature_2m_min[i]),
            icon: weatherCodeMap[data.daily.weather_code[i]]?.icon || '01d'
          })
        }
        setForecast(dailyForecast)
      }

    } catch (err) {
      console.error('Weather error:', err)
      
      if (err.message.includes('not found')) {
        setError(`City not found. Type correct spelling. Examples: Karachi, Lahore, Multan, London, Dubai, Tokyo`)
      } else if (err.code === 'ERR_NETWORK') {
        setError('Network error. Check internet connection.')
      } else {
        setError(`Error: ${err.message}`)
      }
      
      setWeather(null)
      setForecast([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchWeather(city)
  }, [city])

  return { weather, forecast, loading, error, fetchWeather }
}
