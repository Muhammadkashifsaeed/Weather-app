export default function CurrentWeather({ weather }) {
  const { name, main, weather: w } = weather
  const icon = w[0]?.icon
  const description = w[0]?.description

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-bold text-white capitalize mb-2">{name}</h2>
          <p className="text-base md:text-lg text-white/80 capitalize">{description}</p>
        </div>

        <div className="flex items-center gap-4">
          {icon && (
            <img
              src={`https://openweathermap.org/img/wn/${icon}@4x.png`}
              alt={description}
              className="w-20 h-20 md:w-28 md:h-28 drop-shadow-xl"
            />
          )}
          <div className="text-center">
            <div className="text-4xl md:text-6xl font-bold text-white">
              {Math.round(main.temp)}°
            </div>
            <div className="text-sm md:text-base text-white/80">Celsius</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white/20 rounded-xl px-4 py-3">
          <span className="text-white/70 text-sm block">Humidity</span>
          <p className="text-white font-bold text-lg">{main.humidity}%</p>
        </div>
        <div className="bg-white/20 rounded-xl px-4 py-3">
          <span className="text-white/70 text-sm block">Wind</span>
          <p className="text-white font-bold text-lg">{weather.wind?.speed || 0} m/s</p>
        </div>
      </div>
    </div>
  )
}
