import { LineChart } from "@mui/x-charts";
import { useFetch } from "../hooks/useFetch";

function CenterChart() {
  let { data } = useFetch("https://trello.vimlc.uz/professional");
  console.log(data);
  if (data) {
    let parents = data.percents;
    return (
      <div className="chart-center">
        <LineChart
          key={data.percents}
          xAxis={[
            {
              data: [1, 2, 3, 4, 5, 6],
            },
          ]}
          series={[
            {
              data: [
                // shu joyi qishloqchasiga bo'lib qoldi uzr
                parents[0].percentage,
                parents[1].percentage,
                parents[2].percentage,
                parents[3].percentage,
                parents[4].percentage,
                parents[5].percentage,
              ],
            },
          ]}
          width={500}
          height={300}
        />
        <h3>{parents[0].percentage}%</h3>
        <div className="chart-natija">
          <span style={{ width: parents[0].percentage }}></span>
          <p>Умумий натижа</p>
        </div>
      </div>
    );
  }
}

export default CenterChart;
