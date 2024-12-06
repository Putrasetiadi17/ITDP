import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";

interface PieChartComponent {
  className?: string;
}

export default function PieChartComponent(props: PieChartComponent) {
  const data = [
    { id: 0, value: 10, label: "Terbayar" },
    { id: 1, value: 10, label: "Belum Bayar" },
    { id: 2, value: 80, label: "Reminded" },
  ];

  // Hitung total nilai
  const totalValue = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <PieChart
      series={[
        {
          data,
          innerRadius: 24,
          arcLabel: ({ value }) =>
            `${((value / totalValue) * 100).toFixed()}%`, // Label dalam bentuk persentase
        },
      ]}
      width={290}
      height={150} // Tinggi ditingkatkan agar label tidak saling menumpuk
      margin={{ left: -24 }}
      slotProps={{
        legend: {
          labelStyle: {
            fontSize: 12,
            
          },
        },
      }}
    />
  );
}
