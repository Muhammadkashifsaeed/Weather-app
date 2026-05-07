import { useState } from 'react'
import { Search, MapPin } from 'lucide-react'

// Popular cities list (from useWeather.js)
const popularCities = [
  "Karachi", "Lahore", "Islamabad", "Peshawar", "Quetta", "Multan",
  "Faisalabad", "Rawalpindi", "Gujranwala", "Hyderabad", "Sialkot", "Sargodha",
  "Bahawalpur", "Sukkur", "Jhang", "Sheikhupura", "Rahim Yar Khan", "Mardan",
  "Gujrat", "Kasur", "Mianwali", "Dera Ghazi Khan", "Nawabshah", "Kharian",
  "Hafizabad", "Jhelum", "Muzaffargarh", "Kotli", "Mirpur", "Mansehra",
  "Abbottabad", "Swat", "Charsadda", "Bannu", "Kohat", "Dera Ismail Khan", "Tank",
  "Mumbai", "Delhi", "London", "New York", "Dubai", "Tokyo", "Paris", "Sydney",
  "Toronto", "Berlin", "Moscow", "Beijing", "Singapore", "Hong Kong", "Bangkok",
  "Jakarta", "Seoul", "Istanbul", "Tehran", "Cairo", "Riyadh", "Kabul", "Dhaka",
  "Colombo", "Kathmandu", "Thimphu", "Male", "Shanghai", "Guangzhou", "Shenzhen",
  "Chengdu", "Wuhan", "Xi'an", "Hangzhou", "Nanjing"
]

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState([])

  const handleSearchChange = (e) => {
    const value = e.target.value
    setQuery(value)

    if (value.length > 0) {
      const searchTerm = value.toLowerCase()
      // Match cities that START with search term (correct spelling required)
      const matches = popularCities
        .filter((city) => city.toLowerCase().startsWith(searchTerm))
        .slice(0, 6)
      setSuggestions(matches)
    } else {
      setSuggestions([])
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (query.trim()) {
      onSearch(query)
      setQuery('')
      setSuggestions([])
    }
  }

  const handleSuggestionClick = (city) => {
    setQuery(city)
    onSearch(city)
    setSuggestions([])
  }

  return (
    <div className="relative w-full">
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
          <input
            type="text"
            value={query}
            onChange={handleSearchChange}
            placeholder="Search city (correct spelling required)..."
            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/95 backdrop-blur-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-blue-300 shadow-lg transition-all text-base font-medium"
          />
        </div>
      </form>

      {suggestions.length > 0 && (
        <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden z-50 max-h-60 overflow-y-auto">
          {suggestions.map((city, i) => (
            <div
              key={i}
              onClick={() => handleSuggestionClick(city)}
              className="px-4 py-3 hover:bg-blue-50 cursor-pointer transition-all flex items-center gap-2 text-gray-700 hover:text-blue-600 border-b border-gray-100 last:border-0"
            >
              <MapPin size={16} className="text-gray-400" />
              {city}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
