export default function Forecast({ forecast }) {
  return (
    <div>
      <h3 className="text-lg font-bold text-white mb-4 text-center">5-Day Forecast</h3>
      <div className="grid grid-cols-3 md:grid-cols-5 gap-2 md:gap-3">
        {forecast.map((day, index) => (
          <div
            key={index}
            className="bg-white/10 rounded-xl p-3 text-center hover:bg-white/20 transition-all duration-300"
          >
            <p className="text-white font-semibold text-sm mb-2">{day.day}</p>
            <div className="text-2xl md:text-3xl mb-2">{day.icon}</div>
            <p className="text-white text-lg font-bold">{day.high}°</p>
            <p className="text-white/60 text-sm">{day.low}°</p>
          </div>
        ))}
      </div>
    </div>
  )
}
