import { 
  Cell, 
  Pie, 
  PieChart, 
  ResponsiveContainer, 
  Tooltip, 
  Legend 
} from 'recharts';
import { Spinner } from '@heroui/spinner';
import { useAppSelector } from '../../../hooks';
import { dataState } from '../../../store/slices/getDataSlice';
import { agesGroup } from '../../../utils/agesGroup';
import "./dataPieChart.css"

interface TooltipPayload { ReadonlyArray: any };

interface Coordinate {
  x: number;
  y: number;
};

interface PieSectorData {
  percent?: number;
  name?: string | number;
  midAngle?: number;
  middleRadius?: number;
  tooltipPosition?: Coordinate;
  value?: number;
  paddingAngle?: number;
  dataKey?: string;
  payload?: any;
  tooltipPayload?: ReadonlyArray<TooltipPayload>;
};

interface GeometrySector {
  cx: number;
  cy: number;
  innerRadius: number;
  outerRadius: number;
  startAngle: number;
  endAngle: number;
};

type PieLabelProps = PieSectorData & GeometrySector & {
    tooltipPayload?: any;
  };

const RADIAN = Math.PI / 180;
const COLORS = ['#93b5e2', '#a7d5ec', '#abd6e9', '#8ebeda', '#5a9ecc', '#357eb9', '#1c5ba6', '#0b3281', '#0f65b0'];

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: PieLabelProps) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.7;
  const x = cx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
  const y = cy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${((percent ?? 1) * 100).toFixed(0)}%`}
    </text>
  );
};

export const DataPieChart: React.FC = () => {

  const { loading, error, usersData } = useAppSelector(dataState);
  
  return (
    <div className="pie-chart_block">
      <h3 className="chart-title pie-chart_title">Age of users (in percents)</h3>
      {loading && <Spinner/>}
      {error && <h3>Data not loaded</h3>}
      {!loading &&
        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={400} height={400}>
            <Pie
              data={agesGroup(usersData)}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={150}
              fill="#8884d8"
              dataKey="quantity"
              nameKey="category"
            >
              {agesGroup(usersData).map((entry, index) => (
                <Cell key={`cell-${entry.category}`} fill={COLORS[index % COLORS.length]}/>
              ))}
              <Tooltip />
              <Legend iconSize={10} layout="vertical" verticalAlign="middle" align="right"/>
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      }
    </div>
        
  );
}