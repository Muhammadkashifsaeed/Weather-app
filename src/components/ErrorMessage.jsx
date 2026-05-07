export default function ErrorMessage({ message }) {
  const popularSuggestions = ["Karachi", "Lahore", "Islamabad", "Multan", "London", "Dubai", "Tokyo"]

  return (
    <div className="bg-red-500/80 backdrop-blur-lg rounded-2xl p-6 text-white text-center shadow-xl border border-red-400">
      <div className="text-4xl mb-2">⚠️</div>
      <p className="text-lg font-medium mb-2">{message}</p>
      
      {message.includes('not found') && (
        <div className="mt-3">
          <p className="text-sm mb-2">💡 Tips:</p>
          <ul className="text-sm space-y-1 text-white/90">
            <li>• Check spelling (e.g., "Multan" not "Multn")</li>
            <li>• Start typing to see suggestions</li>
            <li>• Popular: {popularSuggestions.slice(0, 4).join(', ')}</li>
          </ul>
        </div>
      )}

      {message.includes('API key') && (
        <div className="mt-3">
          <p className="text-sm mb-2">🔑 Get free API key:</p>
          <ol className="text-sm space-y-1 text-white/90">
            <li>1. Go to openweathermap.org/api</li>
            <li>2. Sign up (free - 1000 calls/day)</li>
            <li>3. Copy API key from dashboard</li>
            <li>4. Paste in .env file: VITE_WEATHER_API_KEY=your_key</li>
          </ol>
        </div>
      )}

      {message.includes('Network') && (
        <p className="text-sm mt-2 text-white/80">
          Check your internet connection and try again.
        </p>
      )}
    </div>
  )
}
