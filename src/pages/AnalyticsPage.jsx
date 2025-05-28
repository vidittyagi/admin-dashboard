import { Box, Typography, Paper } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import { anayticsData, pieData } from "../constants/AnalyticsPage";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

const AnalyticsPage = () => (
  <Box sx={{overflow:"auto"}}>
    <Typography variant="h4" gutterBottom>
      Analytics Dashboard
    </Typography>

    <Paper sx={{ p: 2, mt: 6, height: 400, width: "100%" }}>
      <Typography variant="h6" gutterBottom>
        User Growth
      </Typography>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={anayticsData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="users" fill="#8884d8" />
          <Bar dataKey="posts" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </Paper>

    <Paper sx={{ p: 2, mt: 6, height: 400, width: "100%" }}>
      <Typography variant="h6" gutterBottom>
        Traffic Sources
      </Typography>
      <ResponsiveContainer width="100%" height="90%">
        <PieChart>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) =>
              `${name}: ${(percent * 100).toFixed(0)}%`
            }
          >
            {pieData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </Paper>

    <Paper sx={{ p: 2, mt: 6, height: 400, width: "100%" }}>
      <Typography variant="h6" gutterBottom>
        Revenue
      </Typography>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={anayticsData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="revenue" stroke="#ff7300" />
        </LineChart>
      </ResponsiveContainer>
    </Paper>
  </Box>
);

export default AnalyticsPage;
