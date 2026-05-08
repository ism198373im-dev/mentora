"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function BookingsChart({
  data,
}: {
  data: { name: string; bookings: number }[];
}) {
  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-800">

      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Bookings Overview 📊
      </h2>

      <div style={{ width: "100%", height: 300 }}>

        <ResponsiveContainer>

          <LineChart data={data}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="bookings"
              stroke="#2563eb"
              strokeWidth={3}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}