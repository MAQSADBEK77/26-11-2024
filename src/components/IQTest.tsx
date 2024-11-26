import { useFetch } from "../hooks/useFetch";
import Chart from "./Chart";
import CenterChart from "./CenterChart";

function IQTest() {
  let { data } = useFetch(
    "https://trello.vimlc.uz/knowlodge"
  );

  if (data) {
    return (
      <div className="container chart-component">
        <div className="iq-test-right">
          <h2>Билим тести</h2>
          <div className="chart-carts">
            {data.semicharts.map((chartData: any) => {
              return (
                <div className="cart">
                  <Chart
                    color={chartData.color}
                    label={chartData.label}
                    percentage={chartData.percentage}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className="iq-test-center">
          <CenterChart />
        </div>
        <div className="iq-test-left"></div>
      </div>
    );
  }
}

export default IQTest;
