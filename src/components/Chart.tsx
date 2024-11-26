import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";

type ChartProps = {
  color: string; // Masalan: "#ff0000" yoki "red"
  label: string; // Label uchun oddiy matn
  percentage: number; // Faiz qiymatlari uchun raqam
};
function Chart({ color, label, percentage }: ChartProps) {

  return (
    <div>
      <Gauge
        className="chart-percentage"
        width={180}
        height={80}
        value={percentage}
        startAngle={-110}
        endAngle={110}
        sx={{
          [`& .${gaugeClasses.valueArc}`]: {
            // Miqdor egri chizig'i (arc) rangi
            fill: color, // Siz xohlagan rang
          },
          [`& .${gaugeClasses.valueText}`]: {
            fontSize: 22,
            transform: "translate(0px, -5px)",
            fill: "green", // Matn rangi
          },
        }}
        text={`${percentage}%`}
      />
      <p className="chart-p">{label}</p>
    </div>
  );
}

export default Chart;
