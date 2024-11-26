import {
  GaugeContainer,
  GaugeValueArc,
  GaugeReferenceArc,
  useGaugeState,
} from "@mui/x-charts/Gauge";
import { useFetch } from "../hooks/useFetch";

function PersonalHumanData() {
  function GaugePointer() {
    const { valueAngle, outerRadius, cx, cy } = useGaugeState();
    if (
      valueAngle === null ||
      outerRadius === null ||
      cx === null ||
      cy === null
    ) {
      return null;
    }

    const target = {
      x: cx + outerRadius * Math.sin(valueAngle),
      y: cy - outerRadius * Math.cos(valueAngle),
    };

    return (
      <g>
        <circle cx={cx} cy={cy} r={6} fill="gray" />
        <path
          d={`M ${cx} ${cy} L ${target.x} ${target.y}`}
          stroke="gray"
          strokeWidth={3}
        />
      </g>
    );
  }

  let { data, isPending, error } = useFetch(
    "https://trello.vimlc.uz/get-personal-info"
  );

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>No data available</div>;
  }

  return (
    <div className="human-container">
      <div className="human-data-left">
        <div className="face">
          <img src={data.imageUrl} alt="Bu sani yuzing" />
        </div>
        <div className="human-data">
          <h1 className="fullName">
            <span className="first-name">{data.firstName}</span>
            <span className="lastName">{data.lastName}</span>
          </h1>
          <div className="birthData">
            <p>
              Тугилган сана: <span>{data.birthDate}</span>
            </p>
            <p>
              Тугилган жой: <span>{data.address}</span>
            </p>
          </div>
          <div className="personalData">
            <p>
              Буйи: <span>{data.height}</span>
            </p>
            <p>
              Вазни: <span>{data.weight}</span>
            </p>
            <p>
              Индекс: <span>{data.index}</span>
            </p>
            <div className="chart-norm">
              <GaugeContainer
                width={70}
                height={70}
                startAngle={-110}
                endAngle={110}
                value={data.index || 0}>
                <GaugeReferenceArc />
                <GaugeValueArc />
                <GaugePointer />
              </GaugeContainer>
              <span>НОРМА</span>
            </div>
            <div className="norma-chart"></div>
          </div>
        </div>
      </div>
      <div className="human-data-right">
        <p>
          Лавозими: <span>{data.position}</span>
        </p>
        <p>
          Номзод: <span>{data.candidate}</span>
        </p>
      </div>
    </div>
  );
}

export default PersonalHumanData;
