import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  ResponsiveContainer 
} from 'recharts';
import { useAppSelector } from '../../../hooks';
import { dataState } from '../../../store/slices/getDataSlice';
import { Spinner } from '@heroui/spinner';
import { agesGroup } from '../../../utils/agesGroup';
import './dataBarChart.css'


export const DataBarChart: React.FC = () => {

  const { loading, error, usersData } = useAppSelector(dataState);

  return (
    <div className="bar_chart-block">
        <h3 className="chart-title">Age of users</h3>
        {loading && <Spinner/>}
        {error && <h3>Data not loaded</h3>}
        {!loading &&
          <ResponsiveContainer width="100%" height="100%">
            <BarChart width={800} height={400} data={agesGroup(usersData)}>
                <XAxis dataKey="category" stroke="#000" />
                <YAxis />
                <Tooltip />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <Bar dataKey="quantity" fill="#1c5ba6" barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        }
    </div>
  )
}
