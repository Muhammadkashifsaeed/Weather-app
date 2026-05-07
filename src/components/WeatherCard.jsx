export default function WeatherCard({ data }) {
  const { name, main, weather, wind } = data
  const icon = weather[0]?.icon
  const description = weather[0]?.description

  return (
    <div className="bg-white/30 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20 mb-8 animate-fade-in">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-2">{name}</h2>
          <p className="text-xl text-white/80 capitalize mb-4">{description}</p>
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <div className="bg-white/20 px-4 py-2 rounded-xl">
              <span className="text-white/70 text-sm">Humidity</span>
              <p className="text-white font-bold text-lg">{main.humidity}%</p>
            </div>
            <div className="bg-white/20 px-4 py-2 rounded-xl">
              <span className="text-white/70 text-sm">Wind</span>
              <p className="text-white font-bold text-lg">{wind.speed} m/s</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {icon && (
            <img
              src={`https://openweathermap.org/img/wn/${icon}@4x.png`}
              alt={description}
              className="w-32 h-32 md:w-40 md:h-40 drop-shadow-xl"
            />
          )}
          <div className="text-center">
            <div className="text-6xl md:text-8xl font-bold text-white">
              {Math.round(main.temp)}°
            </div>
            <div className="text-xl text-white/80 mt-2">Celsius</div>
          </div>
        </div>
      </div>
    </div>
  )
}
