import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
} from 'recharts';

// 🔹 MOCK DATA: Candidates at each stage
const stageData = [
  { stage: 'Applied', candidates: 40 },
  { stage: 'Phone Screen', candidates: 30 },
  { stage: 'Interviewed', candidates: 20 },
  { stage: 'Offered', candidates: 10 },
  { stage: 'Hired', candidates: 5 },
];

// 🔹 MOCK DATA: Time-to-hire (days taken per month)
const timeToHireData = [
  { month: 'Jan', avgDays: 18 },
  { month: 'Feb', avgDays: 22 },
  { month: 'Mar', avgDays: 19 },
  { month: 'Apr', avgDays: 16 },
];

const AnalyticsChart: React.FC = () => {
  return (
    <div style={{ margin: '30px' }}>
      <h2>📈 Candidates Per Stage</h2>

      {/* ResponsiveContainer makes the chart scale on mobile too */}
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={stageData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="stage" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="candidates" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>

      <h2>📉 Time to Hire Trend</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={timeToHireData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis label={{ value: 'Avg Days', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="avgDays" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AnalyticsChart;
