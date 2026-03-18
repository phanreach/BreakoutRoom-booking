import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { dummyDataMulti } from "./constant/data-dummy";

export default function RoomUsageChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Room Usage Trend</CardTitle>
      </CardHeader>
      <CardContent className="h-[360px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={dummyDataMulti}
            margin={{ top: 20, right: 20, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="RoomA" stroke="#003366" />
            <Line type="monotone" dataKey="RoomB" stroke="#FF5733" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
