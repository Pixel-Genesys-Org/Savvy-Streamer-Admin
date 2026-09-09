import { Chart } from "chart.js/auto"
import { useEffect, useRef } from "react"

const ChartCanvas = ({ type, data, options }) => {
  const canvasRef = useRef(null)
  const dataKey = JSON.stringify({
    labels: data?.labels,
    values: data?.datasets?.map((dataset) => dataset.data),
  })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const chart = new Chart(canvas, {
      type,
      data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        ...options,
      },
    })

    return () => chart.destroy()
    // Recreate when the plotted values change; options stay memoized by the parent.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, dataKey])

  return <canvas ref={canvasRef} />
}

export default ChartCanvas
