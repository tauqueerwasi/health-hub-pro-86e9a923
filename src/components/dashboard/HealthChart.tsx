import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { healthMetrics } from '@/lib/mock-data';

interface HealthChartProps {
  dataKey: 'bloodPressure' | 'sugarLevel' | 'bmi' | 'heartRate';
  title: string;
  color?: string;
}

export function HealthChart({ dataKey, title, color = 'hsl(210, 90%, 45%)' }: HealthChartProps) {
  const data = healthMetrics.map((item) => ({
    date: item.date,
    value: dataKey === 'bloodPressure' 
      ? item.bloodPressureSystolic 
      : dataKey === 'sugarLevel'
      ? item.sugarLevel
      : dataKey === 'bmi'
      ? item.bmi
      : item.heartRate,
    secondary: dataKey === 'bloodPressure' ? item.bloodPressureDiastolic : undefined,
  }));

  return (
    <div className="medical-card h-[300px]">
      <h3 className="font-heading font-semibold mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height="85%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 90%)" />
          <XAxis 
            dataKey="date" 
            tick={{ fontSize: 12 }} 
            stroke="hsl(215, 15%, 45%)"
          />
          <YAxis 
            tick={{ fontSize: 12 }} 
            stroke="hsl(215, 15%, 45%)"
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'hsl(0, 0%, 100%)', 
              border: '1px solid hsl(214, 20%, 90%)',
              borderRadius: '8px',
            }}
          />
          {dataKey === 'bloodPressure' && <Legend />}
          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            dot={{ fill: color, strokeWidth: 2 }}
            activeDot={{ r: 6 }}
            name={dataKey === 'bloodPressure' ? 'Systolic' : title}
          />
          {dataKey === 'bloodPressure' && (
            <Line
              type="monotone"
              dataKey="secondary"
              stroke="hsl(160, 60%, 45%)"
              strokeWidth={2}
              dot={{ fill: 'hsl(160, 60%, 45%)', strokeWidth: 2 }}
              activeDot={{ r: 6 }}
              name="Diastolic"
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
