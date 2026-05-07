export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center py-12">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 border-3 border-white/30 rounded-full"></div>
        <div className="absolute inset-0 border-3 border-white rounded-full border-t-transparent animate-spin"></div>
      </div>
    </div>
  )
}
